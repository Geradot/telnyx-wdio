const browser = process.env.BROWSER || "chrome";
const isHeadless = process.env.HEADLESS === "true";

export const config = {
  runner: "local",
  baseUrl: "https://telnyx.com",
  specs: ["./test/specs/**/*.js"],
  maxInstances: 1,

  capabilities: [
    {
      maxInstances: 1,
      browserName: browser,
      "goog:chromeOptions":
        browser === "chrome"
          ? {
              args: isHeadless ? ["--headless", "--disable-gpu"] : [],
            }
          : {},
      "moz:firefoxOptions":
        browser === "firefox"
          ? {
              args: isHeadless ? ["-headless"] : [],
            }
          : {},
    },
  ],

  logLevel: "info",
  waitforTimeout: 10000,
  framework: "mocha",
  reporters: [
    "spec",
    [
      "allure",
      {
        outputDir: "allure-results",
        disableWebdriverStepsReporting: true,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  mochaOpts: {
    ui: "bdd",
    timeout: 60000,
  },
};
