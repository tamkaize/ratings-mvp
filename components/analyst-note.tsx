'use client';

import { useEffect, useState } from 'react';
import { Check, FileText } from 'lucide-react';
import { assessments, type Assessment } from '@/lib/assessments';
import { SectionHeading } from './assessment-ui';

type Note = { value: string; savedValue: string; error: string; loaded: boolean; saved: boolean };
const empty: Note = { value: '', savedValue: '', error: '', loaded: false, saved: false };

/** Drafts belong to the workspace, not to a tab that unmounts during navigation. */
export function useResearchNotes() {
  const [notes, setNotes] = useState<Record<string, Note>>({});
  useEffect(() => {
    const loaded: Record<string, Note> = {};
    for (const position of assessments) {
      let savedValue = '', value = '', error = '', hasSavedNote = false;
      try {
        const stored = localStorage.getItem(`kurtosis-note-${position.id}`);
        savedValue = stored?.slice(0, 5000) ?? '';
        hasSavedNote = stored !== null;
      }
      catch { error = 'Browser storage is unavailable. Keep a copy of your note.'; }
      try { value = sessionStorage.getItem(`kurtosis-draft-${position.id}`)?.slice(0, 5000) ?? savedValue; }
      catch { value = savedValue; }
      loaded[position.id] = { value, savedValue, error, loaded: true, saved: hasSavedNote && value === savedValue };
    }
    setNotes(loaded);
  }, []);

  const edit = (id: string, value: string) => {
    let error = '';
    try { sessionStorage.setItem(`kurtosis-draft-${id}`, value); }
    catch { error = 'Draft kept while this page stays open. Save or copy it before closing.'; }
    setNotes(current => ({ ...current, [id]: { ...(current[id] ?? empty), value, error, saved: false } }));
  };
  const save = (id: string) => {
    const note = notes[id];
    if (!note?.loaded) return;
    try {
      localStorage.setItem(`kurtosis-note-${id}`, note.value);
      setNotes(current => ({ ...current, [id]: { ...note, savedValue: note.value, saved: true, error: '' } }));
      try { sessionStorage.removeItem(`kurtosis-draft-${id}`); } catch { /* The retained draft matches the saved value. */ }
    } catch {
      setNotes(current => ({ ...current, [id]: { ...note, error: 'Browser storage is unavailable. Copy your note to retain it.' } }));
    }
  };
  return { get: (id: string) => notes[id] ?? empty, edit, save };
}

export function AnalystNote({ position, note, onEdit, onSave }: { position: Assessment; note: Note; onEdit: (value: string) => void; onSave: () => void }) {
  const dirty = note.value !== note.savedValue;
  return <section className="analyst-note">
    <SectionHeading title="Your research note" />
    <p className="caption">Saved only in this browser. Unsaved drafts stay with this browser tab, including across navigation and reload. Notes do not change the assessment or approval.</p>
    <label htmlFor="analyst-note">Follow-up for {position.symbol}</label>
    <textarea id="analyst-note" rows={4} maxLength={5000} disabled={!note.loaded} value={note.value} onChange={event => onEdit(event.target.value)} placeholder="Record a question to resolve before allocation…" />
    <div className="note-actions"><span role="status">{note.error || (!note.loaded ? 'Loading note…' : dirty ? 'Unsaved draft · retained in this tab' : note.saved ? 'Saved in this browser' : `${note.value.length} / 5,000 characters`)}</span><button className="button secondary" disabled={!note.loaded} onClick={onSave}>{note.saved && !dirty ? <Check size={15} /> : <FileText size={15} />}{note.saved && !dirty ? 'Saved' : 'Save note'}</button></div>
  </section>;
}
