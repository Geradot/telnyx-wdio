// test/pageobjects/MainPage.js
import Page from "./Page.js";
import pages from "../data/pages.json" assert { type: "json" };
import capabilities from "../data/capabilities.json";
import {
  step,
  truncateByWords,
  formatOrdinalSuffix,
} from "../helpers/utils.js";

class MainPage extends Page {
  // "Interaction with AI" block
  hdVoiceAiTabName = pages.main["ai tabs"]["hd voice ai"]["tab name"];
  textToSpeechTabName = pages.main["ai tabs"]["text to speech"]["tab name"];

  // Roles in "Text to speech" tab
  role1 = pages.main["ai tabs"]["text to speech"].roles[0];
  role2 = pages.main["ai tabs"]["text to speech"].roles[1];

  // "Contact us" link
  contactUs = pages["contact us"];

  constructor() {
    super();
    const [firstKey] = Object.keys(capabilities).at(0);
    const [lastKey, lastValue] = Object.entries(capabilities).at(-1);
    this.firstKey = firstKey;
    this.lastKey = lastKey;
    this.lastValue = lastValue;
  }

  get callAgentBtn() {
    return $("span[data-content='CALL YOUR AGENT']");
  }

  get aiTabs() {
    return $$("button[role='tab']");
  }

  aiTab(tabName) {
    return $(`button[role='tab'][aria-label="${tabName}"]`);
  }

  get playAudioBtn() {
    return $("button[aria-label='Play audio']");
  }

  get roleSelect() {
    return $(
      "//label[normalize-space()='Role']/following-sibling::button[@role='combobox']"
    );
  }

  get textarea() {
    return $("#text-to-speech-textarea");
  }

  get contactUsLink() {
    return $$(`header a[href$='${pages["contact us"].url}']`)[1];
  }

  get accordionTabs() {
    return $$("div[aria-label='HOW IT WORKS'] button[role='tab']");
  }

  get firstExampleCode() {
    return $("//div[@role='tabpanel'][contains(., '\"phone_numbers\": [')]");
  }

  get secondExampleCode() {
    return $(
      "//div[contains(@role, 'tabpanel')]//*[contains(text(), '\"messages\": [')]"
    );
  }

  get rightArrow() {
    return $(
      "//div[@role='tabpanel'][contains(., '\"phone_numbers\": [')]//ancestor::div[3]//button[@aria-label='Go to next item' and not(contains(@class, 'hidden'))]"
    );
  }

  async accordionTab(title) {
    return await $(
      `//div[@aria-label='HOW IT WORKS']//button[@role='tab' and contains(., '${title}')]`
    );
  }

  async clickRightArrow() {
    await step(
      "Click the right arrow to see the next code example",
      async () => {
        await browser.execute((el) => el.click(), await this.rightArrow);
      }
    );
  }

  async clickContactUsLink() {
    await step('Click the "Contact us" link in the header', async () => {
      await expect(this.contactUsLink).toBeExisting();
      await this.contactUsLink.click();
    });
  }

  async clickTabInAccordion(title) {
    await step(`Click the "${title}" tab`, async () => {
      const tab = await this.accordionTab(title);
      await expect(tab).toBeDisplayed();
      await tab.click();
    });
  }

  async clickCallAgentBtn() {
    await step(
      "Click the 'CALL YOUR AGENT' button at the bottom of viewport",
      async () => {
        await expect(this.callAgentBtn).toBeExisting();
        await this.callAgentBtn.click();
        await this.checkAiTabsVisible();
      }
    );
  }

  async clickAiTab(tabName) {
    await step(`Click the "${tabName}" tab`, async () => {
      const tab = await this.aiTab(tabName);
      await expect(tab).toBeDisplayed();
      await tab.click();
      await this.checkAiTabActive(tabName);
    });
  }

  async clickRoleSelect() {
    await step("Open the 'Role' select", async () => {
      await this.roleSelect.click();
    });
  }

  async selectRole(role) {
    await step(`Select "${role}" role`, async () => {});
    const roleOption = await $(`//*[normalize-space()="${role}"]`);
    await expect(roleOption).toBeExisting();
    await roleOption.click();
  }

  async checkCountRoles(countRoles) {
    await step(`The list of Roles has ${countRoles} items`, async () => {
      const roles = pages.main["ai tabs"]["text to speech"].roles;
      await expect(countRoles).toEqual(roles.length);
    });
  }

  async checkContactUsLinkExist() {
    await expect(await this.contactUsLink).toBeExisting();
  }

  async checkFirstExampleCodeVisible() {
    await step("The first code example is visible", async () => {
      await expect(await this.firstExampleCode).toBeDisplayed();
    });
  }

  async checkSecondExampleCodeVisible() {
    await step("The second code example is visible", async () => {
      await expect(await this.secondExampleCode).toBeDisplayed();
    });
  }

  async checkCountItemsInAccordion(count) {
    await step(`The accordion has ${count} items`, async () => {
      await expect(await this.accordionTabs).toHaveLength(count);
    });
  }

  async checkAccordionVisible() {
    await step("The 'HOW IT WORKS' accordion is in the viewport", async () => {
      const tabs = await this.accordionTabs;
      await this.checkCountItemsInAccordion(tabs.length);
      await tabs[0].scrollIntoView();
    });
  }

  async checkActiveTabInAccordion(index = 0) {
    await step(
      `The ${formatOrdinalSuffix(index + 1)} tab is active`,
      async () => {
        const tab = (await this.accordionTabs)[index];
        await expect(tab).toHaveAttribute(...this.matchToAriaSelected);
        await expect(tab).toHaveAttribute(...this.matchToDataStateActive);
      }
    );
  }

  async checkTabText(expectedText) {
    await step(
      `"${truncateByWords(expectedText)}" text for the active tab is displayed`,
      async () => {
        const paragraph = await $(`p*=${expectedText}`);
        await expect(paragraph).toBeExisting();
        const parent = await paragraph.parentElement();
        await expect(parent).toBeDisplayed();
      }
    );
  }

  async checkTextarea(substr) {
    await step(
      `Textarea contains "${truncateByWords(substr)}" text`,
      async () => {
        const textareaValue = await this.textarea.getValue();
        expect(textareaValue).toContain(substr);
      }
    );
  }

  async checkAiTabsVisible() {
    await step(
      "The page is scrolled to the AI tabs and the tabs are visible",
      async () => {
        const tab = await this.aiTab(this.hdVoiceAiTabName);
        await expect(tab).toBeDisplayed();
      }
    );
  }

  async checkAiTabActive(tabName) {
    await step(`The "${tabName}" tab is active`, async () => {
      const tab = await this.aiTab(tabName);
      await expect(tab).toHaveAttribute(...this.matchToAriaSelected);
    });
  }

  async checkPlayAudioBtnExist() {
    await step("The 'PLAY AUDIO' button is existing", async () => {
      await expect(this.playAudioBtn).toBeExisting();
    });
  }

  async checkRoleSelectVisible() {
    await expect(this.roleSelect).toBeDisplayed();
  }

  async open() {
    return await super.open("/");
  }

  async scrollToSection(sectionName = "FOR DEVELOPERS") {
    await super.scrollToSection(sectionName);
  }
}

export default new MainPage();
