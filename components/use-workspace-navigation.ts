'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const views = ['ratings', 'compare', 'research', 'methodology'];
const tabs = ['overview', 'dependencies', 'routes', 'evidence'];
type Location = { position: string; view: string; tab: string };
type Destination = Partial<Location> & { target?: string; keyboardTab?: boolean };
type ScrollRecord = { x: number; y: number; focusId?: string };
type Move = { target?: string; tab?: string; restore?: ScrollRecord; keyboardTab?: boolean };

function normalize(location: Location): Location {
  return { ...location, view: views.includes(location.view) ? location.view : 'ratings', tab: tabs.includes(location.tab) ? location.tab : 'overview' };
}

/** New navigation reveals its destination; Back/Forward restores the visited viewport. */
export function useWorkspaceNavigation(initial: Location) {
  const [location, setLocation] = useState(() => normalize(initial));
  const [revision, setRevision] = useState(0);
  const pending = useRef<Move | null>(null);
  const moving = useRef(false);

  const saveScroll = () => {
    if (moving.current) return;
    const active = document.activeElement;
    const record: ScrollRecord = { x: window.scrollX, y: window.scrollY, ...(active?.id ? { focusId: active.id } : {}) };
    window.history.replaceState({ ...window.history.state, kurtosisScroll: record }, '');
  };

  useEffect(() => {
    const previous = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    let scrollFrame = 0;
    const onScroll = () => {
      cancelAnimationFrame(scrollFrame);
      scrollFrame = requestAnimationFrame(saveScroll);
    };
    const onPop = (event: PopStateEvent) => {
      moving.current = true;
      const params = new URLSearchParams(window.location.search);
      pending.current = event.state?.kurtosisScroll
        ? { restore: event.state.kurtosisScroll }
        : { target: window.location.hash.slice(1) || 'main' };
      setLocation(normalize({ position: params.get('position') ?? 'pt-sronyc', view: params.get('view') ?? 'ratings', tab: params.get('tab') ?? 'overview' }));
      setRevision(value => value + 1);
    };
    window.addEventListener('popstate', onPop);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(scrollFrame);
      window.history.scrollRestoration = previous;
      window.removeEventListener('popstate', onPop);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useLayoutEffect(() => {
    const move = pending.current ?? (revision === 0 && window.location.hash ? { target: window.location.hash.slice(1) } : null);
    if (!move) return;
    pending.current = null;
    moving.current = true;
    let frame = requestAnimationFrame(() => {
      if (move.restore) {
        document.getElementById(move.restore.focusId ?? '')?.focus({ preventScroll: true });
        window.scrollTo({ left: move.restore.x, top: move.restore.y, behavior: 'instant' });
      } else {
        const destination = document.getElementById(move.target ?? '') ?? (move.tab ? document.getElementById('assessment-panel') : document.getElementById('main'));
        const focus = move.keyboardTab
          ? document.getElementById(`tab-${move.tab}`)
          : destination?.querySelector<HTMLElement>('h1, h2, h3') ?? destination;
        if (focus) { focus.tabIndex = -1; focus.focus({ preventScroll: true }); }
        if (move.keyboardTab && focus) focus.tabIndex = 0;
        const scrollTarget = move.tab && !move.target ? document.querySelector('.tabs') : destination;
        scrollTarget?.scrollIntoView({ block: 'start', behavior: 'instant' });
      }
      frame = requestAnimationFrame(() => { moving.current = false; saveScroll(); });
    });
    return () => { cancelAnimationFrame(frame); moving.current = false; };
  }, [revision]);

  const navigate = (next: Destination) => {
    saveScroll();
    const updated = normalize({ position: next.position ?? location.position, view: next.view ?? location.view, tab: next.tab ?? location.tab });
    const samePosition = updated.position === location.position && updated.view === location.view && updated.view === 'ratings';
    pending.current = { ...(next.target ? { target: next.target } : samePosition ? { tab: updated.tab } : { target: 'main' }), keyboardTab: next.keyboardTab };
    const url = new URL(window.location.href);
    url.search = new URLSearchParams(updated).toString();
    url.hash = next.target ?? '';
    window.history.pushState({}, '', url);
    setLocation(updated);
    setRevision(value => value + 1);
  };

  return { positionId: location.position, view: location.view, tab: location.tab, navigate };
}
