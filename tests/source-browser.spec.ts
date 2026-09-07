import { test, expect } from '@playwright/test';

for (const position of [
  { id: 'pt-onyc', series: 'ONyc-10SEPT26', mint: '2W5zZccVq8AMdrg7P4b3NvBKJyzbdnytRy2CKEDHvhiJ', maturity: '1789034299' },
  { id: 'pt-sronyc', series: 'srONyc-10SEPT26', mint: 'BKP9Rt3pwh96cCoCp3bkh1zxXZpZez17xA6w64LuMJQy', maturity: '1789034280' },
]) {
  test(`assessment source opens the exact assessed series first for ${position.id}`, async ({ page }) => {
    await page.goto(`/?position=${position.id}&view=ratings&tab=evidence`);
    await page.getByRole('button', { name: 'Exponent app public markets endpoint', exact: true }).first().click();
    const support = page.getByRole('dialog').getByRole('region', { name: 'Preserved source support' });
    const firstGroup = support.locator('details').first();
    await expect(firstGroup).toHaveAttribute('open', '');
    await expect(firstGroup.locator('summary')).toContainText(`${position.series} · Assessed position`);
    await expect(firstGroup.getByText(JSON.stringify(position.mint), { exact: true })).toBeVisible();
    await expect(firstGroup.getByText(position.maturity, { exact: true })).toBeVisible();
    expect(await support.locator('details[open]').count()).toBe(1);
  });
}

for (const width of [1440, 390]) {
  test(`source inspection exposes preserved support and keeps keyboard context at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/?position=pt-sronyc&view=research&tab=overview');
    const sourceButton = page.getByRole('button', { name: /EXP-API-MARKETS Exponent app public markets endpoint/ });
    await sourceButton.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: 'Captured source observations' })).toBeVisible();
    await expect(dialog.getByText('/3/ptMint', { exact: true })).toBeVisible();
    await expect(dialog.getByText('"2W5zZccVq8AMdrg7P4b3NvBKJyzbdnytRy2CKEDHvhiJ"', { exact: true })).toBeVisible();
    await expect(dialog.getByText('1789034299', { exact: true })).toBeVisible();
    const redemptionField = dialog.locator('dl > div').filter({ has: page.getByText('/3/ptRedemptionRate', { exact: true }) });
    await expect(redemptionField.locator('dd')).toHaveText('null');
    await dialog.getByText('PT-srONyc · srONyc-10SEPT26', { exact: true }).click();
    await expect(dialog.getByText('"BKP9Rt3pwh96cCoCp3bkh1zxXZpZez17xA6w64LuMJQy"', { exact: true })).toBeVisible();
    const dimensions = await dialog.evaluate(element => ({ width: element.clientWidth, scrollWidth: element.scrollWidth }));
    expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.width + 1);

    const preservedLink = dialog.getByRole('link', { name: 'Open preserved source record (JSON)' });
    const popupPromise = page.waitForEvent('popup');
    await preservedLink.click();
    const popup = await popupPromise;
    await popup.waitForLoadState('domcontentloaded');
    expect(new URL(popup.url()).searchParams.get('id')).toBe('EXP-API-MARKETS');
    const packet = JSON.parse(await popup.locator('body').innerText());
    expect(packet.source.id).toBe('EXP-API-MARKETS');
    expect(packet.capture.groups).toHaveLength(4);
    expect(packet.packetRecords.some((entry: { pointer: string }) => entry.pointer.startsWith('/candidate_markets/'))).toBe(true);
    await popup.close();

    await dialog.getByText('Kurtosis assessment synthesis', { exact: true }).click();
    await expect(dialog.getByText('These analyst findings combine the sources listed in each assessment evidence record.')).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(sourceButton).toBeFocused();
    await sourceButton.click();
    await dialog.getByRole('button', { name: 'Close source' }).click();
    await expect(sourceButton).toBeFocused();
  });
}

test('source records disclose when exact source content is unavailable', async ({ page, request }) => {
  await page.goto('/?position=pt-sronyc&view=research&tab=overview');
  await page.getByRole('button', { name: /ON-S16 June 2026 Apex report link/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByText(/No exact source passage or API extract is retained here/)).toBeVisible();
  await expect(dialog.getByText(/No report contents were read/)).toBeVisible();
  await expect(dialog.locator('blockquote')).toHaveCount(0);
  const link = dialog.getByRole('link', { name: 'Open preserved source record (JSON)' });
  const response = await request.get((await link.getAttribute('href'))!);
  expect(response.ok()).toBe(true);
  const packet = await response.json();
  expect(packet.capture).toBeNull();
  expect(packet.source.inspection_status).toBe('linked_but_content_unavailable');
});

test('document excerpts show an exact passage and its captured location', async ({ page }) => {
  await page.goto('/?position=onyc&view=research&tab=overview');
  await page.getByRole('button', { name: /ON-S08 Insurer reporting and NAV methodology/ }).click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.getByRole('heading', { name: 'Captured source passage' })).toBeVisible();
  await expect(dialog.locator('blockquote')).toHaveText('Net Asset Value (NAV) is calculated internally by our insurance committee and published onchain each day through independent oracle providers.');
  await expect(dialog.getByText(/Captured Markdown · line 11/)).toBeVisible();
  await expect(dialog.getByText(/verification remains subject to the limitations above/)).toBeVisible();
});
