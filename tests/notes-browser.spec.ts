import { expect, test } from '@playwright/test';

test('unsaved edits survive tabs, different positions, product views and reload without overwriting the saved note', async ({ page }) => {
  await page.goto('/?position=pt-sronyc&view=ratings&tab=evidence');
  const note = page.getByRole('textbox', { name: 'Follow-up for PT-srONyc', exact: true });
  await note.fill('Previously saved research.');
  await page.getByRole('button', { name: 'Save note', exact: true }).click();
  await note.fill('Unsaved follow-up about recovery and cash execution.');
  await expect(page.getByText('Unsaved draft · retained in this tab', { exact: true })).toBeVisible();
  await page.getByRole('tab', { name: 'Overview', exact: true }).click();
  await page.getByRole('tab', { name: /^Evidence/ }).click();
  await expect(note).toHaveValue('Unsaved follow-up about recovery and cash execution.');

  const directory = page.getByRole('complementary', { name: 'Position directory' });
  await directory.getByRole('button').filter({ has: page.getByText('ONyc', { exact: true }) }).click();
  await page.getByRole('tab', { name: /^Evidence/ }).click();
  const spotNote = page.getByRole('textbox', { name: 'Follow-up for ONyc', exact: true });
  await expect(spotNote).toHaveValue('');
  await spotNote.fill('Separate underlying draft.');
  await directory.getByRole('button').filter({ has: page.getByText('PT-srONyc', { exact: true }) }).click();
  await page.getByRole('tab', { name: /^Evidence/ }).click();
  await expect(note).toHaveValue('Unsaved follow-up about recovery and cash execution.');

  await page.getByRole('navigation', { name: 'Product navigation' }).getByRole('button', { name: 'Compare', exact: true }).click();
  await page.goBack();
  await expect(note).toHaveValue('Unsaved follow-up about recovery and cash execution.');
  await page.reload();
  await expect(note).toHaveValue('Unsaved follow-up about recovery and cash execution.');
  expect(await page.evaluate(() => localStorage.getItem('kurtosis-note-pt-sronyc'))).toBe('Previously saved research.');
  await page.getByRole('button', { name: 'Save note', exact: true }).click();
  await expect(page.getByText('Saved in this browser', { exact: true })).toBeVisible();
  expect(await page.evaluate(() => localStorage.getItem('kurtosis-note-pt-sronyc'))).toBe('Unsaved follow-up about recovery and cash execution.');
});

test('an intentionally empty draft survives reload while the saved note stays intact', async ({ page }) => {
  await page.goto('/?position=onyc&view=ratings&tab=evidence');
  const note = page.getByRole('textbox', { name: 'Follow-up for ONyc', exact: true });
  await note.fill('A saved note to clear.');
  await page.getByRole('button', { name: 'Save note', exact: true }).click();
  await note.clear();
  await page.reload();
  await expect(note).toHaveValue('');
  await expect(page.getByText('Unsaved draft · retained in this tab', { exact: true })).toBeVisible();
});

test('storage failure keeps the draft across tabs and gives an honest save error', async ({ page }) => {
  await page.addInitScript(() => { Storage.prototype.setItem = () => { throw new DOMException('Storage unavailable', 'QuotaExceededError'); }; });
  await page.goto('/?position=onyc&view=ratings&tab=evidence');
  const note = page.getByRole('textbox', { name: 'Follow-up for ONyc', exact: true });
  await note.fill('Retain this in memory even if storage fails.');
  await page.getByRole('tab', { name: 'Overview', exact: true }).click();
  await page.getByRole('tab', { name: /^Evidence/ }).click();
  await expect(note).toHaveValue('Retain this in memory even if storage fails.');
  await page.getByRole('button', { name: 'Save note', exact: true }).click();
  await expect(page.getByText('Browser storage is unavailable. Copy your note to retain it.', { exact: true })).toBeVisible();
});
