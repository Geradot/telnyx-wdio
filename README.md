# Telnyx WDIO Tests

Automated end‑to‑end UI tests for https://telnyx.com using WebdriverIO (v9) + Allure reporting.

## ✅ Prerequisites

- Node.js 18+ (check with: `node -v`)
- npm 9+ (`npm -v`)
- (Optional) Java installed if you use a locally installed Allure binary. If you rely on the `allure` CLI via npm package you still need Java.

## 📦 Installation

Clone the repo (or download) then install dependencies:

```powershell
npm install
```

No extra build step is required; tests run directly with WDIO.

## 🧪 Running Tests

All commands below assume PowerShell on Windows.

### Run entire suite (default browser = chrome)

```powershell
npm test
```

### Specify browser

Chrome:

```powershell
npm run test:chrome
```

Firefox:

```powershell
npm run test:firefox
```

### Headless (all specs)

```powershell
npm run test:headless
```

### Headless per suite

```powershell
npm run test:headless:main
npm run test:headless:whyTelnyx
npm run test:headless:solutions
npm run test:headless:products
```

### Single spec file example

```powershell
npx wdio .\wdio.conf.js --spec test\specs\mainPage.e2e.js
```

### Environment variables

- `BROWSER=chrome|firefox` selects browser.
- `HEADLESS=true` enables headless mode with fixed viewport size flags.

You can combine:

```powershell
cross-env BROWSER=firefox HEADLESS=true npx wdio .\wdio.conf.js --suite solutions
```

## 📊 Allure Report

Tests automatically write results to `allure-results/` via the Allure reporter.

### Generate & open

```powershell
npm run report
```

This cleans previous generated report, builds a new one into `allure-report/` and opens it.

### Manual (optional)

```powershell
allure generate allure-results --clean
allure open
```

## 🔍 Common Patterns

- Page Objects live in `test/pageobjects/`.
- Data (navigation, pages, capabilities, roles) in `test/data/` JSON files.
- Assertions use `@wdio/globals` `expect`.
- Steps are wrapped with the custom `step()` helper (from Allure reporter) for better report readability.

## 🧩 Extending

1. Add new page object in `test/pageobjects/YourPage.js` extending `Page`.
2. Add corresponding data in `test/data/*.json` if needed.
3. Create a spec in `test/specs/yourPage.e2e.js` and (optionally) a suite entry in `wdio.conf.js`.

