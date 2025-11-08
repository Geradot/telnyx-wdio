import { step } from "@wdio/allure-reporter";
import Page from "../Page";
import healthcareCases from "../../data/healthcare-cases.json";
import navigation from "../../data/navigation.json";
import { truncateByWords } from "../../helpers/utils";

class HealthcarePage extends Page {
  healthCareCases = Object.keys(healthcareCases);
  healthCareLinks = Object.values(healthcareCases);

  constructor() {
    super();
    this.healthcarePage = navigation.solutions.submenu["healthcare"];
  }

  get casesSection() {
    return $("//div[@aria-label='USE CASES']");
  }

  get cases() {
    return this.casesSection.$$(".//button[@role='tab']");
  }

  async checkAmountOfItems() {
    await step(
      `There are ${this.healthCareCases.length} healthcare cases`,
      async () => {
        await super.checkAmountOfItems(
          (
            await this.cases
          ).length,
          this.healthCareCases.length
        );
      }
    );
  }

  async scrollToCases() {
    await step('Scroll to the "USE CASES" section', async () => {
      await this.cases[0].scrollIntoView();
      await expect(this.cases[0]).toBeDisplayed();
    });
  }

  async checkYouTubeLinks() {
    await step("Check YouTube links for all healthcare cases", async () => {
      let caseName, expectedLink;
      for (let i = 0; i < this.healthCareCases.length; i++) {
        caseName = this.healthCareCases[i];
        expectedLink = this.healthCareLinks[i];

        await step(
          `Check that the "${truncateByWords(
            caseName
          )}" case has a relevant YouTube link`,
          async () => {
            const caseTab = await $(
              `//button[@role='tab' and contains(., "${caseName}")]`
            );
            await caseTab.scrollIntoView();

            try {
              await caseTab.waitForClickable({ timeout: 3000 });
              await caseTab.click();
            } catch (e) {
              // Fallback to JavaScript click for headless mode
              await browser.execute((el) => el.click(), caseTab);
            }

            const youtubeLinkElement = await $(
              `//div[@aria-label='USE CASES']//a`
            );
            await youtubeLinkElement.waitForExist({ timeout: 5000 });
            await expect(youtubeLinkElement).toHaveAttribute(
              "href",
              expect.stringContaining(expectedLink)
            );
            await expect(youtubeLinkElement).toHaveAttribute(
              "target",
              "_blank"
            );
          }
        );
      }
    });
  }

  async open() {
    await super.open(this.healthcarePage);
  }
}
export default new HealthcarePage();
