import { existsSync } from "node:fs";
import { defineConfig } from "@playwright/test";

const availableChromium = "/home/tamkaize/.cache/ms-playwright/chromium-1228/chrome-linux64/chrome";
const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
  || (existsSync(availableChromium) ? availableChromium : undefined);

export default defineConfig({
  testDir: "./tests",
  testMatch: "**/*.spec.ts",
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 45_000,
  expect: { timeout: 10_000 },
  reporter: "list",
  outputDir: "test-results/browser",
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || "http://localhost:3000",
    browserName: "chromium",
    headless: true,
    viewport: { width: 1440, height: 1050 },
    colorScheme: "light",
    reducedMotion: "reduce",
    acceptDownloads: true,
    launchOptions: {
      ...(executablePath ? { executablePath } : {}),
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
});
