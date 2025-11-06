import { step } from "../helpers/utils";
import { expect } from "@wdio/globals";
import navigation from "../data/navigation.json";

class Page {
  // Common matches
  matchToDataStateActive = ["data-state", "active"];
  matchToDataStateOpen = ["data-state", "open"];
  matchToDataStateClosed = ["data-state", "closed"];
  matchToAriaSelected = ["aria-selected", "true"];

  // "Products" menu
  products = navigation.products;
  voiceAi = this.products.submenu.voice["voice ai"];

  // "Why Telnyx" menu
  whyTelnyx = navigation["why telnyx"];
  ourNetwork = this.whyTelnyx.submenu["our network"];

  // "Solutions" menu
  solutions = navigation.solutions;
  healthcare = this.solutions.submenu.healthcare;

  get getNavItems() {
    return $("div#main-menu-content");
  }

  get getMenuButton() {
    return $("button[aria-controls='main-menu-content']");
  }

  get getPageName() {
    return $("h1");
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

  /**
   * Open a menu item
   * @param {string} menu Navigation menu item
   * @param {null | string} submenu Set if the menu has a submenu
   */
  async openTheMenuItem(menu, submenu = null) {
    const label = submenu ? `"${menu}" → "${submenu}"` : `"${menu}"`;
    await step(`Open ${label} menu item`, async () => {
      const nav = await this.getNavItems;
      await expect(nav).toBeDisplayed();

      const item = await nav.$(`*=${menu}`);
      await expect(item).toBeDisplayed();
      await item.click();

      if (submenu) {
        const subItem = await nav.$(`*=${submenu}`);
        await expect(subItem).toBeDisplayed();
        await subItem.click();
      }
    });
  }

  async checkUrl(expected) {
    await step(`Check that URL contains "${expected}"`, async () => {
      await expect(browser).toHaveUrl(expect.stringContaining(expected));
    });
  }

  async checkPageHeadingDisplayed(name) {
    await step(`"${name}" page heading is displayed`, async () => {
      const element = await $(`h1*=${name}`);
      await expect(element).toBeDisplayed();
    });
  }

  /**
   * Check that the specified page is opened
   * @param {object} page Page object with "url", "title" and "page heading" properties
   */
  async checkThePage(page) {
    await step(`Check that the "${page.title}" page is opened`, async () => {
      await this.checkUrl(page.url);
      await this.checkPageHeadingDisplayed(page["page heading"]);
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
