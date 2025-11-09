const browser = process.env.BROWSER || "chrome";
const isHeadless = process.env.HEADLESS === "true";

export const config = {
  runner: "local",
  baseUrl: "https://telnyx.com",
  specs: ["./test/specs/**/*.js"],
  suites: {
    mainPage: ["./test/specs/mainPage.e2e.js"],
    whyTelnyx: ["./test/specs/Why Telnyx/ourNetworkPage.e2e.js"],
    solutions: ["./test/specs/Solutions/healthcarePage.e2e.js"],
    products: ["./test/specs/Products/voiceAi.e2e.js"],
  },
  maxInstances: 1,

  capabilities: [
    {
      maxInstances: 1,
      browserName: browser,
      "goog:chromeOptions":
        browser === "chrome"
          ? {
              args: isHeadless
                ? [
                    "--headless=new",
                    "--disable-gpu",
                  ]
                : [],
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
