import { expect, test, type Page } from '@playwright/test';

function layerButton(page: Page, title: string) {
  return page.locator('.dependency-section .layer-node').filter({ has: page.getByText(title, { exact: true }) });
}

async function expectDetailInView(page: Page, title: string) {
  const button = layerButton(page, title);
  const heading = page.locator('.dependency-section').getByRole('heading', { name: title, exact: true });
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await expect(heading).toBeVisible();
  await expect.poll(async () => {
    const [control, detail] = await Promise.all([button.boundingBox(), heading.boundingBox()]);
    return Boolean(control && detail && control.y >= 0 && control.y < 80
      && detail.y >= control.y + control.height && detail.y + detail.height < page.viewportSize()!.height);
  }, { message: 'The selected layer and its explanation should both be onscreen after disclosure' }).toBe(true);
  await expect(button).toBeFocused();
}

for (const width of [390, 900]) {
  test(`dependency details stay beside the selection at ${width}px through switches, collapse and reopen`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 });
    await page.goto('/?position=pt-sronyc&view=ratings&tab=dependencies');

    // Changing layers removes the former disclosure and can change the new button's
    // document position substantially. Verify the actual resulting viewport.
    for (const title of ['PT-srONyc', 'srONyc', 'jrONyc first-loss capital', 'OnRe segregated account', 'PT-srONyc']) {
      await layerButton(page, title).click();
      await expectDetailInView(page, title);
      await expect(page.locator('.dependency-section .layer-node[aria-expanded="true"]')).toHaveCount(1);
    }

    const held = layerButton(page, 'PT-srONyc');
    await held.click();
    await expect(held).toHaveAttribute('aria-expanded', 'false');
    await expect(page.locator('.dependency-section').getByRole('heading', { name: 'PT-srONyc', exact: true })).not.toBeVisible();
    await held.click();
    await expectDetailInView(page, 'PT-srONyc');

    await layerButton(page, 'jrONyc first-loss capital').click();
    await expectDetailInView(page, 'jrONyc first-loss capital');
    const heading = page.locator('.dependency-section').getByRole('heading', { name: 'jrONyc first-loss capital', exact: true });
    const source = heading.locator('..').getByRole('button', { name: 'Tranching Markets', exact: true });
    await source.click();
    const dialog = page.getByRole('dialog', { name: 'Tranching Markets', exact: true });
    await expect(dialog).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible();
    await expect(source).toBeFocused();
    await expect(source).toBeInViewport();

    const dimensions = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
    expect(dimensions.document).toBeLessThanOrEqual(dimensions.viewport);
  });
}

test('desktop layer selection updates an adjacent inspector and returns focus from its source', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/?position=pt-sronyc&view=ratings&tab=dependencies');
  const junior = layerButton(page, 'jrONyc first-loss capital');
  await junior.click();
  const inspector = page.getByRole('complementary', { name: 'Layer inspection', exact: true });
  await expect(inspector.getByRole('heading', { name: 'jrONyc first-loss capital', exact: true })).toBeVisible();
  const [nodeBox, inspectorBox] = await Promise.all([junior.boundingBox(), inspector.boundingBox()]);
  expect(inspectorBox!.x).toBeGreaterThan(nodeBox!.x + nodeBox!.width);
  await expect(inspector).toBeInViewport();
  const source = inspector.getByRole('button', { name: 'Tranching Markets', exact: true });
  await source.click();
  await expect(page.getByRole('dialog', { name: 'Tranching Markets', exact: true })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(source).toBeFocused();
});

test('the diagram attaches junior protection to srONyc and labels account branches and dependency roles', async ({ page }) => {
  await page.goto('/?position=pt-sronyc&view=ratings&tab=dependencies');
  const section = page.locator('.dependency-section');
  const senior = layerButton(page, 'srONyc');
  const junior = layerButton(page, 'jrONyc first-loss capital');
  const underlying = layerButton(page, 'ONyc');
  await expect(senior).toBeVisible();
  await expect(junior).toBeVisible();
  await expect(underlying).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  const [seniorBox, juniorBox, underlyingBox] = await Promise.all([senior.boundingBox(), junior.boundingBox(), underlying.boundingBox()]);
  expect(juniorBox!.y).toBeGreaterThan(seniorBox!.y + seniorBox!.height);
  expect(juniorBox!.y + juniorBox!.height).toBeLessThan(underlyingBox!.y);
  expect(juniorBox!.x).toBeGreaterThan(seniorBox!.x);
  await expect(section.getByText('Supports srONyc: absorbs losses first', { exact: true })).toBeVisible();
  await expect(junior).toContainText('Protection dependency');
  await expect(layerButton(page, 'PT-srONyc')).toContainText('Position held');
  await expect(underlying).toContainText('Economic dependency');
  await expect(layerButton(page, 'Exponent programs and administration')).toContainText('Shared control dependency');
  await expect(layerButton(page, 'PT secondary market')).toContainText('Exit route dependency');
  await expect(section.getByText('Account exposure: underwriting', { exact: true })).toBeVisible();
  await expect(section.getByText('Account assets: collateral and liquidity', { exact: true })).toBeVisible();
  await expect(section).not.toContainText('Depends through');
  await expect(section).not.toContainText('Sibling branch');

  await layerButton(page, 'Reinsurance exposures').click();
  await section.getByRole('button', { name: 'Collapse account branches', exact: true }).click();
  await expect(layerButton(page, 'Reinsurance exposures')).toHaveCount(0);
  await expect(section.getByRole('heading', { name: 'Reinsurance exposures', exact: true })).toHaveCount(0);
  await section.getByRole('button', { name: 'Show account branches', exact: true }).click();
  await expect(layerButton(page, 'Reinsurance exposures')).toBeVisible();
});
