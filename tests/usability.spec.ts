import { expect, test, type Locator, type Page } from '@playwright/test';

async function settleViewport(page: Page) {
  await page.evaluate(() => new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve()))));
}

async function expectFullyInViewport(locator: Locator, page: Page) {
  await expect(locator).toBeVisible();
  await expect.poll(async () => {
    const bounds = await locator.boundingBox();
    const viewport = page.viewportSize()!;
    return !!bounds && bounds.x >= -1 && bounds.y >= -1 && bounds.x + bounds.width <= viewport.width + 1 && bounds.y + bounds.height <= viewport.height + 1;
  }, { message: `Expected ${locator} to be fully visible without additional scrolling` }).toBe(true);
}

async function expectNoHorizontalOverflow(page: Page) {
  const widths = await page.evaluate(() => ({ viewport: innerWidth, root: document.documentElement.scrollWidth, body: document.body.scrollWidth }));
  expect(widths.root, JSON.stringify(widths)).toBeLessThanOrEqual(widths.viewport + 1);
  expect(widths.body, JSON.stringify(widths)).toBeLessThanOrEqual(widths.viewport + 1);
}

test('comparison distinguishes PT exit gaps from underlying exit evidence and opens the selected record', async ({ page }) => {
  await page.goto('/?view=compare&position=pt-sronyc');
  const matrix = page.getByRole('table', { name: /^Shared and position-specific evidence states/ });
  const ptExit = matrix.getByRole('row').filter({ has: page.getByRole('rowheader', { name: 'Executable PT early exit', exact: true }) });
  const underlyingExit = matrix.getByRole('row').filter({ has: page.getByRole('rowheader', { name: 'Underlying ONyc redemption and sale', exact: true }) });
  await expect(ptExit.getByRole('cell').nth(0)).toContainText('N/A');
  await expect(ptExit.getByRole('cell').nth(0).getByRole('button')).toHaveCount(0);
  await expect(ptExit.getByRole('cell').nth(1)).toHaveText('Missing');
  await expect(ptExit.getByRole('cell').nth(2)).toHaveText('Missing');
  for (const cell of await underlyingExit.getByRole('cell').all()) await expect(cell).toHaveText('Partial');
  const senior = matrix.getByRole('row').filter({ has: page.getByRole('rowheader', { name: 'Senior loss waterfall and recovery', exact: true }) });
  await expect(senior.getByRole('cell').nth(0)).toContainText('N/A');
  await expect(senior.getByRole('cell').nth(1)).toContainText('N/A');
  await expect(senior.getByRole('cell').nth(2)).toHaveText('Partial');

  for (const selected of [
    { action: 'PT-ONyc: Executable PT early exit, missing. Inspect evidence', position: 'pt-onyc', heading: 'Executable PT exit', state: 'Missing' },
    { action: 'PT-srONyc: Senior loss waterfall and recovery, partial. Inspect evidence', position: 'pt-sronyc', heading: 'Senior loss waterfall and recovery', state: 'Partial' },
    { action: 'ONyc: NAV and loss transmission, contradictory. Inspect evidence', position: 'onyc', heading: 'NAV and loss transmission', state: 'Contradictory' },
  ]) {
    await matrix.getByRole('button', { name: selected.action, exact: true }).click();
    await expect.poll(() => new URL(page.url()).searchParams.get('position')).toBe(selected.position);
    await expect(page.getByRole('tab', { name: /^Evidence/ })).toHaveAttribute('aria-selected', 'true');
    const heading = page.getByRole('heading', { name: selected.heading, exact: true });
    const record = page.getByRole('article').filter({ has: heading });
    await expect(heading).toBeFocused();
    await expectFullyInViewport(heading, page);
    await expect(record.getByText(selected.state, { exact: true })).toBeVisible();
    await expect(record.getByText('To resolve', { exact: true })).toBeVisible();
    await page.goBack();
    await expect(matrix).toBeVisible();
  }
});

test('mobile comparison keeps each field, position label and evidence state together', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/?view=compare&position=pt-sronyc');
  await page.evaluate(() => document.fonts.ready);
  await expectNoHorizontalOverflow(page);
  for (const title of ['Executable PT early exit', 'Underlying ONyc redemption and sale', 'NAV and loss transmission']) {
    const heading = page.getByRole('heading', { name: title, exact: true });
    const field = heading.locator('..');
    await field.scrollIntoViewIfNeeded();
    await expectFullyInViewport(heading, page);
    for (const symbol of ['ONyc', 'PT-ONyc', 'PT-srONyc']) {
      await expectFullyInViewport(field.getByText(symbol, { exact: true }), page);
    }
    for (const action of await field.getByRole('button').all()) await expectFullyInViewport(action, page);
    const regionWidths = await field.evaluate(element => ({ visible: element.clientWidth, content: element.scrollWidth }));
    expect(regionWidths.content).toBeLessThanOrEqual(regionWidths.visible + 1);
  }
  await page.screenshot({ path: '/tmp/kurtosis-usability-fixed-mobile-comparison.png' });
  await page.getByRole('button', { name: 'PT-srONyc: Executable PT early exit, missing. Inspect evidence', exact: true }).click();
  const exitHeading = page.getByRole('heading', { name: 'Executable PT exit', exact: true });
  await expect(exitHeading).toBeFocused();
  await expectFullyInViewport(exitHeading, page);
  await expectNoHorizontalOverflow(page);
});

for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
  test(`exit-route navigation reveals the route start at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/?position=pt-sronyc&view=ratings&tab=overview');
    await page.evaluate(() => document.fonts.ready);
    const action = page.getByRole('button', { name: 'Inspect exit routes', exact: true });
    await action.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => scrollY)).toBeGreaterThan(900);
    await action.click();
    const heading = page.getByRole('heading', { name: 'The route back to cash', exact: true });
    await expect(heading).toBeFocused();
    await expectFullyInViewport(heading, page);
    const scenario = page.getByRole('button', { name: 'At maturity', exact: true });
    await expect(scenario).toHaveAttribute('aria-pressed', 'true');
    await expectFullyInViewport(scenario, page);
    await expectFullyInViewport(page.getByRole('heading', { name: 'Redeem the matured principal token', exact: true }), page);
    await page.screenshot({ path: `/tmp/kurtosis-usability-fixed-route-${viewport.width}.png` });
  });

  test(`opening a position from the bottom of comparison reveals its identity at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/?view=compare&position=pt-sronyc');
    const open = page.getByRole('button', { name: 'Open ONyc', exact: true }).last();
    await open.scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => scrollY)).toBeGreaterThan(900);
    await open.click();
    const heading = page.getByRole('heading', { name: 'ONyc', level: 1, exact: true });
    await expect(heading).toBeFocused();
    await expectFullyInViewport(heading, page);
    await expectFullyInViewport(page.getByRole('region', { name: 'Rating summary' }).getByText('NO_RATE', { exact: true }), page);
  });

  test(`overview leads with applicable scope and three risks before dependency exploration at ${viewport.width}px`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('/?position=pt-sronyc&view=ratings&tab=overview');
    await page.evaluate(() => document.fonts.ready);
    const summary = page.getByRole('region', { name: 'Rating summary' });
    const scope = page.locator('[aria-label="Research scope"]');
    await expect(scope).toContainText('10 Sep 2026 PT series · MVP assumption');
    await expect(scope).toContainText('Position size, wallet custody and investor eligibility are unspecified.');
    await summary.evaluate(element => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
    await expectFullyInViewport(scope, page);
    const riskHeading = page.getByRole('heading', { name: /What needs resolution$/ });
    const risks = page.locator('section').filter({ has: riskHeading });
    const dependencies = page.getByRole('heading', { name: /What you actually own$/ });
    await expect(risks.getByRole('article')).toHaveCount(3);
    await expect(risks.getByRole('heading', { name: 'Economic NAV and offer pricing need reconciliation', exact: true })).toBeVisible();
    const riskBounds = await risks.boundingBox();
    const dependencyBounds = await dependencies.boundingBox();
    expect(riskBounds!.y + riskBounds!.height).toBeLessThan(dependencyBounds!.y);
    await page.getByRole('button', { name: 'Show all 8 risk factors', exact: true }).click();
    await expect(risks.getByRole('article')).toHaveCount(8);
    await expect(risks.getByRole('heading', { name: 'Holder rights remain unverified', exact: true })).toBeVisible();
    await page.getByRole('button', { name: 'Inspect scope & sources', exact: true }).click();
    const scopeHeading = page.getByRole('heading', { name: 'Position scope', exact: true });
    await expect(scopeHeading).toBeFocused();
    await expectFullyInViewport(scopeHeading, page);
    await expect(page.getByRole('tab', { name: /^Evidence/ })).toHaveAttribute('aria-selected', 'true');
  });
}

test('Back and Forward restore the viewport the analyst deliberately left', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/?view=compare&position=pt-sronyc');
  await page.evaluate(() => document.fonts.ready);
  const open = page.getByRole('button', { name: 'Open ONyc', exact: true }).last();
  await open.scrollIntoViewIfNeeded();
  await settleViewport(page);
  const comparisonScroll = await page.evaluate(() => scrollY);
  expect(comparisonScroll).toBeGreaterThan(900);
  await open.click();
  await expect(page.getByRole('heading', { name: 'ONyc', exact: true, level: 1 })).toBeFocused();
  await settleViewport(page);
  await page.evaluate(() => scrollTo({ top: 620, behavior: 'instant' }));
  await settleViewport(page);
  const assessmentScroll = await page.evaluate(() => scrollY);
  await page.goBack();
  await expect.poll(() => new URL(page.url()).searchParams.get('view')).toBe('compare');
  await expect.poll(async () => Math.abs(await page.evaluate(() => scrollY) - comparisonScroll)).toBeLessThan(3);
  await expectFullyInViewport(open, page);
  await page.goForward();
  await expect.poll(() => new URL(page.url()).searchParams.get('position')).toBe('onyc');
  await expect.poll(async () => Math.abs(await page.evaluate(() => scrollY) - assessmentScroll)).toBeLessThan(3);
});

test('bookmarked scope and evidence destinations survive a fresh load and reload', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const destination of [
    { hash: 'position-scope', title: 'Position scope' },
    { hash: 'evidence-pt-liquidity', title: 'Executable PT exit' },
  ]) {
    await page.goto(`/?position=pt-sronyc&view=ratings&tab=evidence#${destination.hash}`);
    const heading = page.getByRole('heading', { name: destination.title, exact: true });
    await expect(heading).toBeFocused();
    await expectFullyInViewport(heading, page);
    await page.reload();
    await expect(heading).toBeFocused();
    await expectFullyInViewport(heading, page);
  }
});
