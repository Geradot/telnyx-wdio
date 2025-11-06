import { step } from "../helpers/utils";
import { expect } from "@wdio/globals";
import healthcareCases from "../data/healthcare-cases.json";
import navigation from "../data/navigation.json";

class Page {
  // Common matches
  matchToDataStateActive = ["data-state", "active"];
  matchToDataStateOpen = ["data-state", "open"];
  matchToDataStateClosed = ["data-state", "closed"];
  matchToAriaSelected = ["aria-selected", "true"];

  // "Products" menu
  products = navigation.products.title;
  voiceAi = navigation.products.submenu.voice["voice ai"].title;

  // "Solutions" menu
  solutions = navigation.solutions.title;
  healthcare = navigation.solutions.submenu.healthcare.title;

  

  get getNavItems() {
    return $("div#main-menu-content");
  }

  get getMenuButton() {
    return $("button[aria-controls='main-menu-content']");
  }

  get getPageName() {
    return $("h1");
  }

  async checkPageHeadingDisplayed(name) {
    await step(`"${name}" page heading is displayed`, async () => {
      const element = await $(`h1*=${name}`);
      await expect(element).toBeDisplayed();
    });
  }

  async getSectionByName(title) {
    return await $(`*=${title}`);
  }

  async scrollToSection(sectionName = "FOR DEVELOPERS") {
    await step(`Scroll to the "${sectionName}" section`, async () => {
      const section = await this.getSectionByName(sectionName);
      await section.scrollIntoView();
      await expect(section).toBeDisplayed();
    });
  }

  async openTheMenuItem(title) {
    await step(`Open "${title}" menu item`, async () => {
      const nav = await this.getNavItems;
      await expect(nav).toBeDisplayed();

      const item = await nav.$(`*=${title}`);
      await expect(item).toBeDisplayed();
      await item.click();
    });
  }

  async checkUrl(expected) {
    await step(`Check that URL contains "${expected}"`, async () => {
      await expect(browser).toHaveUrl(expect.stringContaining(expected));
    });
  }

  async checkAmountOfItems(length, expectedLength) {
    await expect(length).toEqual(expectedLength);
  }

  async open(url) {
    await step(`Open "${url}"`, async () => {
      await browser.url(url);
    });
  }
}

export default Page;
