# 🎭 Playwright

[Playwright](https://playwright.dev/docs/intro) is a framework for Web Testing and Automation. It allows testing Chromium, Firefox and WebKit with a single API. Playwright is built to enable cross-browser web automation that is ever-green, capable, reliable and fast.

## Installation

- Install node modules: `yarn install`
- Install playwright browsers and dependencies: `yarn playwright install --with-deps`

## Running Tests

### Execution commands

-Running all tests

```javascript
yarn test:run
```

- Running a single test file

```javascript
yarn test:run-debug:one-test
```

- Running tests in headed mode

```javascript
yarn test:run --headed
```

## Generate report

```javascript
yarn run test:html-report
```
