import { readFile } from "node:fs/promises";
import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const positions = [
  { id: "onyc", symbol: "ONyc", mint: "5Y8NV33Vv7WbnLfq3zBcKSdYPrk7g2KoiQoe7M2tcxp5" },
  { id: "pt-onyc", symbol: "PT-ONyc", mint: "2W5zZccVq8AMdrg7P4b3NvBKJyzbdnytRy2CKEDHvhiJ" },
  { id: "pt-sronyc", symbol: "PT-srONyc", mint: "BKP9Rt3pwh96cCoCp3bkh1zxXZpZez17xA6w64LuMJQy" },
] as const;

function positionButton(page: Page, symbol: string) {
  return page.getByRole("complementary", { name: "Position directory" })
    .getByRole("button")
    .filter({ has: page.getByText(symbol, { exact: true }) });
}

async function openPosition(page: Page, symbol: string) {
  await positionButton(page, symbol).click();
  await expect(page.getByRole("heading", { name: symbol, exact: true, level: 1 })).toBeVisible();
}

async function expectQuery(page: Page, key: string, value: string) {
  await expect.poll(() => new URL(page.url()).searchParams.get(key)).toBe(value);
}

async function openTab(page: Page, name: string) {
  const tab = page.getByRole("tab", { name: name === "Evidence" ? /^Evidence/ : name, exact: name !== "Evidence" });
  await tab.click();
  await expect(tab).toHaveAttribute("aria-selected", "true");
}

async function expectNoPageOverflow(page: Page) {
  const dimensions = await page.evaluate(() => ({
    viewport: document.documentElement.clientWidth,
    document: document.documentElement.scrollWidth,
    body: document.body.scrollWidth,
  }));
  expect(dimensions.document, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport + 1);
  expect(dimensions.body, JSON.stringify(dimensions)).toBeLessThanOrEqual(dimensions.viewport + 1);
}

async function expectAccessible(page: Page, context: string) {
  const results = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(results.violations, `${context}: ${JSON.stringify(results.violations.map((violation) => ({
    id: violation.id,
    impact: violation.impact,
    description: violation.description,
    nodes: violation.nodes.map((node) => ({ target: node.target, failureSummary: node.failureSummary })),
  })), null, 2)}`).toEqual([]);
}

test("search finds each distinct position and recovers from an empty result", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "PT-srONyc", exact: true, level: 1 })).toBeVisible();
  const search = page.getByRole("textbox", { name: "Search positions" });

  for (const position of positions) {
    await search.fill(position.symbol);
    await openPosition(page, position.symbol);
    await expectQuery(page, "position", position.id);
    await expect(positionButton(page, position.symbol)).toHaveAttribute("aria-pressed", "true");
    await openTab(page, "Evidence");
    await expect(page.locator("code").filter({ hasText: position.mint })).toHaveText(position.mint);
    await search.clear();
  }

  await search.fill("no-matching-coverage-position");
  await expect(page.getByText("No matching position.", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Clear search", exact: true }).first().click();
  await expect(search).toHaveValue("");
  for (const position of positions) await expect(positionButton(page, position.symbol)).toBeVisible();
});

test("position, view and tab state survive URLs, browser history and reload", async ({ page }) => {
  await page.goto("/?position=onyc&view=ratings&tab=evidence");
  await expect(page.getByRole("heading", { name: "ONyc", exact: true, level: 1 })).toBeVisible();
  await expect(page.getByRole("tab", { name: /^Evidence/ })).toHaveAttribute("aria-selected", "true");

  await openPosition(page, "PT-ONyc");
  await openTab(page, "Exit routes");
  await expectQuery(page, "tab", "routes");
  await page.reload();
  await expect(page.getByRole("heading", { name: "PT-ONyc", exact: true, level: 1 })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The route back to cash", exact: true })).toBeVisible();

  await page.getByRole("navigation", { name: "Product navigation" }).getByRole("button", { name: "Compare", exact: true }).click();
  await expectQuery(page, "view", "compare");
  await expect(page.getByRole("table", { name: /Research comparison/ })).toBeVisible();
  await page.goBack();
  await expectQuery(page, "view", "ratings");
  await expect(page.getByRole("heading", { name: "The route back to cash", exact: true })).toBeVisible();
  await page.goForward();
  await expectQuery(page, "view", "compare");
  await page.reload();
  await expect(page.getByRole("table", { name: /Research comparison/ })).toBeVisible();
});

test("assessment tabs support pointer and keyboard selection", async ({ page }) => {
  await page.goto("/?position=pt-sronyc&view=ratings&tab=overview");
  const names = ["Overview", "Dependencies", "Exit routes", "Evidence"];
  for (const name of names) {
    await openTab(page, name);
    await expect(page.getByRole("tabpanel")).toBeVisible();
  }

  const overview = page.getByRole("tab", { name: "Overview", exact: true });
  await overview.focus();
  await overview.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Dependencies", exact: true })).toBeFocused();
  await expectQuery(page, "tab", "dependencies");
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: /^Evidence/ })).toBeFocused();
  await expectQuery(page, "tab", "evidence");
  await page.keyboard.press("ArrowRight");
  await expect(overview).toBeFocused();
  await page.keyboard.press("ArrowLeft");
  await expect(page.getByRole("tab", { name: /^Evidence/ })).toBeFocused();
  await page.keyboard.press("Home");
  await expect(overview).toBeFocused();
  await expect(overview).toHaveAttribute("aria-selected", "true");
});

test("dependency selection exposes protection evidence and source dialog restores focus", async ({ page }) => {
  await page.goto("/?position=pt-sronyc&view=ratings&tab=overview");
  const expand = page.getByRole("button", { name: "Show account branches" });
  await expand.click();
  await expect(page.getByRole("button", { name: /Reinsurance exposures/ })).toBeVisible();
  const junior = page.getByRole("button", { name: /jrONyc first-loss capital/ });
  await junior.click();
  await expect(junior).toHaveAttribute("aria-expanded", "true");
  const inspector = page.getByRole("complementary", { name: "Layer inspection" });
  await expect(inspector.getByRole("heading", { name: "jrONyc first-loss capital", exact: true })).toBeVisible();
  await expect(inspector).toContainText("not extra collateral owned");
  const source = inspector.getByRole("button", { name: "Tranching Markets", exact: true });
  await source.click();
  const dialog = page.getByRole("dialog", { name: "Tranching Markets" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Open original source" })).toHaveAttribute("href", "https://docs.exponent.finance/user-documentation/tranching-markets");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(source).toBeFocused();
});

test("all four realization scenarios show ordered inputs, outputs and failure conditions", async ({ page }) => {
  await page.goto("/?position=pt-sronyc&view=ratings&tab=routes");
  for (const label of ["Acquire", "At maturity", "Before maturity", "Stress exit"]) {
    const button = page.getByRole("button", { name: label, exact: true });
    await button.click();
    await expect(button).toHaveAttribute("aria-pressed", "true");
    const steps = page.locator(".route-steps > li");
    expect(await steps.count()).toBeGreaterThan(0);
    for (const step of await steps.all()) {
      await expect(step.getByText("Required condition", { exact: true })).toBeVisible();
      await expect(step.getByText("Failure point", { exact: true })).toBeVisible();
      expect(await step.locator(".asset-conversion > span").count()).toBe(2);
    }
  }
  await expect(page.getByRole("heading", { name: "Resolve any senior withdrawal pause", exact: true })).toBeVisible();
  await expect(page.locator(".route-summary")).toContainText("09:58:00 UTC");
  await expect(page.locator(".route-section")).toContainText("No transaction has been simulated or submitted");
});

test("evidence filters expose missing information and recover from a genuinely empty state", async ({ page }) => {
  await page.goto("/?position=pt-sronyc&view=ratings&tab=evidence");
  const filter = page.getByRole("combobox", { name: "Filter evidence quality" });
  const allCount = await page.locator(".evidence-items article").count();
  expect(allCount).toBeGreaterThan(1);
  await filter.selectOption("missing");
  await expect(page.getByRole("heading", { name: "Executable PT exit", exact: true })).toBeVisible();
  for (const item of await page.locator(".evidence-items article").all()) {
    await expect(item.getByText("Missing", { exact: true })).toBeVisible();
  }
  await filter.selectOption("complete");
  await expect(page.getByText("No evidence items have this state.", { exact: true })).toBeVisible();
  await expect(page.locator(".evidence-items article")).toHaveCount(0);
  await page.getByRole("button", { name: "Show all evidence", exact: true }).click();
  await expect(filter).toHaveValue("all");
  await expect(page.locator(".evidence-items article")).toHaveCount(allCount);
});

test("personal research notes persist in this browser and remain isolated by position", async ({ page }) => {
  await page.goto("/?position=pt-sronyc&view=ratings&tab=evidence");
  const seniorNote = "Confirm senior withdrawal behavior during a recovery pause.";
  await page.getByRole("textbox", { name: "Follow-up for PT-srONyc", exact: true }).fill(seniorNote);
  await page.getByRole("button", { name: "Save note", exact: true }).click();
  await expect(page.getByText("Saved in this browser", { exact: true })).toBeVisible();
  await page.reload();
  await expect(page.getByRole("textbox", { name: "Follow-up for PT-srONyc", exact: true })).toHaveValue(seniorNote);

  await openPosition(page, "ONyc");
  await openTab(page, "Evidence");
  const spotNote = page.getByRole("textbox", { name: "Follow-up for ONyc", exact: true });
  await expect(spotNote).toHaveValue("");
  await spotNote.fill("Verify issuer payout eligibility.");
  await page.getByRole("button", { name: "Save note", exact: true }).click();
  await openPosition(page, "PT-srONyc");
  await openTab(page, "Evidence");
  await expect(page.getByRole("textbox", { name: "Follow-up for PT-srONyc", exact: true })).toHaveValue(seniorNote);
  await expect(page.getByRole("region", { name: "Rating summary" })).toContainText("NO_RATE");
});

test("comparison tables retain complete maturity times and open the intended position", async ({ page }) => {
  await page.goto("/?view=compare&position=pt-sronyc");
  const comparison = page.getByRole("table", { name: /Research comparison/ });
  await expect(comparison).toBeVisible();
  for (const position of positions) {
    await expect(comparison.getByRole("columnheader").filter({ hasText: new RegExp(`^${position.symbol}`) })).toHaveCount(1);
  }
  const maturityRow = comparison.getByRole("row").filter({ has: page.getByRole("rowheader", { name: "Contractual maturity", exact: true }) });
  await expect(maturityRow).toContainText("09:58:19 UTC");
  await expect(maturityRow).toContainText("09:58:00 UTC");
  await expect(maturityRow).toContainText("No PT maturity");
  await expect(page.getByRole("table", { name: /^Shared and position-specific evidence states/ })).toBeVisible();
  await page.getByRole("button", { name: "Open PT-ONyc", exact: true }).last().click();
  await expect(page.getByRole("heading", { name: "PT-ONyc", exact: true, level: 1 })).toBeVisible();
  await expectQuery(page, "position", "pt-onyc");
});

test("research and methodology views expose original evidence and unapproved methodology", async ({ page }) => {
  await page.goto("/?view=research");
  await expect(page.getByRole("heading", { name: /The evidence.*behind the interface/ })).toBeVisible();
  await expect(page.getByRole("link", { name: "Download research packet" })).toHaveAttribute("href", "/api/research?download=1");
  await expect(page.locator('a[href="/api/documents?name=exponent"]')).toBeVisible();
  await expect(page.getByText("Not supplied", { exact: true })).toBeVisible();
  await page.getByRole("navigation", { name: "Product navigation" }).getByRole("button", { name: "Methodology", exact: true }).click();
  await expectQuery(page, "view", "methodology");
  await expect(page.getByRole("table", { name: /no grade assigned to the MVP positions/ })).toBeVisible();
  await expect(page.getByText(/This methodology is an unapproved alpha/)).toBeVisible();
  await expect(page.getByRole("link", { name: "Read the full methodology" })).toHaveAttribute("href", "/api/documents?name=methodology");
});

test("unsupported position URLs show an explicit recovery path", async ({ page }) => {
  await page.goto("/?position=not-covered&view=ratings&tab=overview");
  await expect(page.getByRole("heading", { name: "Position not covered", exact: true, level: 1 })).toBeVisible();
  await page.getByRole("button", { name: "Open ONyc assessment", exact: true }).click();
  await expect(page.getByRole("heading", { name: "ONyc", exact: true, level: 1 })).toBeVisible();
  await expectQuery(page, "position", "onyc");
});

test("assessment API and browser export preserve null ratings and source integrity", async ({ page, request }) => {
  const response = await request.get("/api/assessments");
  expect(response.status()).toBe(200);
  expect(response.headers()["cache-control"]).toBe("no-store");
  const payload = await response.json();
  expect(payload.dataKind).toBe("assessment_read_model");
  expect(payload.metadata.live).toBe(false);
  expect(payload.assessments).toHaveLength(3);
  for (const position of positions) {
    const selected = await request.get(`/api/assessments?id=${position.id}`);
    expect(selected.status()).toBe(200);
    const selectedPayload = await selected.json();
    expect(selectedPayload.assessment.id).toBe(position.id);
    expect(selectedPayload.assessment.mint).toBe(position.mint);
    expect(selectedPayload.assessment.disposition).toBe("NO_RATE");
    expect(selectedPayload.assessment.approvedScore).toBeNull();
    expect(selectedPayload.assessment.approvedGrade).toBeNull();
    expect(selectedPayload.assessment.approvedConfidence).toBeNull();
    const exportedSources = new Set(selectedPayload.sources.map((source: { id: string }) => source.id));
    for (const id of selectedPayload.assessment.sourceIds) expect(exportedSources.has(id)).toBe(true);
  }
  for (const id of ["not-covered", ""]) {
    const missing = await request.get(`/api/assessments?id=${encodeURIComponent(id)}`);
    expect(missing.status()).toBe(404);
    expect((await missing.json()).error).toBeTruthy();
  }

  await page.goto("/?position=pt-sronyc&view=ratings&tab=overview");
  const downloading = page.waitForEvent("download");
  await page.getByRole("link", { name: "Export assessment", exact: true }).click();
  const download = await downloading;
  expect(download.suggestedFilename()).toBe("kurtosis-pt-sronyc-assessment-research.json");
  const downloadPath = await download.path();
  expect(downloadPath).not.toBeNull();
  const exported = JSON.parse(await readFile(downloadPath!, "utf8"));
  expect(exported.assessment.id).toBe("pt-sronyc");
  expect(exported.metadata.live).toBe(false);
});

test("research exports and allowlisted document endpoints serve only known resources", async ({ request }) => {
  const response = await request.get("/api/research?download=1");
  expect(response.status()).toBe(200);
  expect(response.headers()["content-disposition"]).toContain("attachment");
  const payload = await response.json();
  expect(payload.dataKind).toBe("research_evidence_bundle");
  expect(payload.metadata.live).toBe(false);
  expect(payload.packets.exponent.candidate_markets).toHaveLength(4);
  expect(payload.packets.onyc.identity.mint).toBe(positions[0].mint);

  for (const name of ["methodology", "research", "onyc", "exponent", "visualization", "plan"]) {
    const document = await request.get(`/api/documents?name=${name}`);
    expect(document.status(), name).toBe(200);
    expect(document.headers()["content-type"]).toContain("text/markdown");
    expect((await document.text()).length).toBeGreaterThan(100);
  }
  expect((await request.get("/api/documents")).status()).toBe(400);
  for (const name of ["not-a-document", "../package.json", "../../package.json", "__proto__", "constructor"]) {
    const missing = await request.get(`/api/documents?${new URLSearchParams({ name })}`);
    expect(missing.status(), name).toBe(404);
    expect(missing.headers()["content-type"]).toContain("application/json");
    expect((await missing.json()).error).toBeTruthy();
  }
});

for (const width of [1440, 900, 390]) {
  test(`responsive layout stays within ${width}px and preserves readable analytical views`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1050 });
    await page.goto("/?position=pt-sronyc&view=ratings&tab=overview");
    await expect(page.getByRole("heading", { name: "PT-srONyc", exact: true, level: 1 })).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    await expectNoPageOverflow(page);
    await page.screenshot({ path: `/tmp/kurtosis-ratings-${width}.png`, fullPage: true });
    await openTab(page, "Evidence");
    await expect(page.getByRole("heading", { name: "Position scope", exact: true })).toBeVisible();
    await expectNoPageOverflow(page);
    await page.getByRole("navigation", { name: "Product navigation" }).getByRole("button", { name: "Compare", exact: true }).click();
    const comparison = page.locator('[aria-label="Position comparison"]:visible');
    await expect(comparison).toBeVisible();
    await expectNoPageOverflow(page);
    const bounds = await comparison.evaluate((element) => ({ client: element.clientWidth, scroll: element.scrollWidth }));
    expect(bounds.client).toBeGreaterThan(0);
    expect(bounds.scroll).toBeLessThanOrEqual(bounds.client + 1);
    for (const position of positions) {
      const identity = width >= 1100 ? comparison.getByRole("columnheader").filter({ hasText: new RegExp(`^${position.symbol}`) }) : comparison.getByText(position.symbol, { exact: true }).first();
      await expect(identity).toBeVisible();
    }
  });
}

test("primary, evidence and comparison views pass WCAG accessibility checks", async ({ page }) => {
  test.setTimeout(90_000);
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 1000 });
    await page.goto("/?position=pt-sronyc&view=ratings&tab=overview");
    await expect(page.getByRole("heading", { name: "PT-srONyc", exact: true, level: 1 })).toBeVisible();
    await expectAccessible(page, `Primary assessment at ${width}px`);
    await openTab(page, "Dependencies");
    await page.getByRole("button", { name: /jrONyc first-loss capital/ }).click();
    await expectAccessible(page, `Selected dependency at ${width}px`);
    await openTab(page, "Evidence");
    await expectAccessible(page, `Evidence and scope at ${width}px`);
    await page.getByRole("navigation", { name: "Product navigation" }).getByRole("button", { name: "Compare", exact: true }).click();
    await expectAccessible(page, `Comparison at ${width}px`);
  }
});
