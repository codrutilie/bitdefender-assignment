# bitdefender-assignment

## Repository structure

```text
deliverables/       Assignment documents
pom/                Page Object Model classes used by the tests
tests/              Playwright test specifications
utils/              Shared test fixtures and utilities
playwright.config.ts
					Playwright test configuration
package.json        Project scripts and dependencies
```

## Deliverables

- [AI Usage Statement](deliverables/AI%20Usage%20Statement.docx)
- [Test Cases](deliverables/Test%20Cases.docx)
- [Test Plan](deliverables/Test%20Plan.docx)
- [Test Strategy for an AI-Powered Feature](deliverables/Test%20Strategy%20for%20an%20AI-Powered%20Feature.docx)

## Prerequisites

- Node.js 18 or newer
- Microsoft Edge installed (one configured test project uses the Edge channel)

### Install Node.js 18 on Windows

1. Download the Node.js 18 LTS installer from the [official Node.js downloads page](https://nodejs.org/en/download).
2. Run the `.msi` installer and keep the default options, including **Add to PATH**.
3. Restart VS Code or your terminal.
4. Verify the installation:

```powershell
node --version
```

The Node.js version should start with `v18`.

## Install dependencies

From the project root, run:

```bash
npm install
npx playwright install chromium firefox webkit
```

## Run the tests

Run the complete Playwright test suite with:

```bash
npm test
```

The tests run in Chromium, Firefox, WebKit, and Microsoft Edge. The HTML report is generated after the run and can be opened with:

```bash
npx playwright show-report
```
