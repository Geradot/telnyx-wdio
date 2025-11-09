import { step } from "@wdio/allure-reporter";
import { expect } from "@wdio/globals";
import navigation from "../data/navigation.json";

class Page {
  // Common matches
  matchToDataStateActive = ["data-state", "active"];
  matchToDataStateOpen = ["data-state", "open"];
  matchToDataStateClosed = ["data-state", "closed"];
  matchToAriaSelected = ["aria-selected", "true"];

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
    return await $(`//*[contains(normalize-space(text()), "${title}")]`);
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
    await step(`URL contains "${expected}"`, async () => {
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
    await step(`Check the "${page.title}" page"`, async () => {
      await this.checkUrl(page.url);
      await this.checkPageHeadingDisplayed(page["page heading"]);
    });
  }

  /**
   * Check the amount of items in the particular section
   * @param {number} itemsAmount
   * @param {number} expectedAmount
   */
  async checkAmountOfItems(itemsAmount, expectedAmount) {
    await expect(itemsAmount).toEqual(expectedAmount);
  }

  async closeCookiesBanner() {
    await step("Close the cookies banner", async () => {
      const banner = await $("#onetrust-close-btn-container");
      await banner.waitForDisplayed();
      await banner.click();
    });
  }

  async open(page) {
    await step(`Open the "${page.title}" page`, async () => {
      await browser.url(page.url);
      await this.checkThePage(page);
      await this.closeCookiesBanner();
      await browser.pause(1000);
    });
  }
}

export default Page;
