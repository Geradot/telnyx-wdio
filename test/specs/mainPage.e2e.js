import mainPage from "../pageobjects/MainPage.js";
import { widthOfScreen, heightOfScreen } from "../helpers/consts.js";
import { step } from "@wdio/allure-reporter";

describe("Telnyx.com | Main page.", () => {
  beforeEach(async () => {
    await browser.setWindowSize(widthOfScreen, heightOfScreen);
    await mainPage.open();
  });

  afterEach(async () => {
    await step("Reload browser session", async () => {
      await browser.reloadSession();
    });
  });

  it("Changing the Role also changes the spoken text in the 'Text to speech' tab", async () => {
    // Ad-hoc because sometimes the test does not pass on the Desktop size.
    // Something happens with website’s layout.
    await browser.setWindowSize(heightOfScreen, widthOfScreen);

    await mainPage.clickCallAgentBtn();
    await mainPage.checkAiTabActive(mainPage.hdVoiceAiTabName);
    await mainPage.clickAiTab(mainPage.textToSpeechTabName);
    await mainPage.checkPlayAudioBtnExist();
    await mainPage.checkTextarea(mainPage.role1["checking text"]);
    await mainPage.clickRoleSelect();
    await mainPage.selectRole(mainPage.role2.name);
    await mainPage.checkTextarea(mainPage.role2["checking text"]);
  });

  it("Clicking the 'Contact us' link opens it", async () => {
    await mainPage.clickContactUsLink();
    await mainPage.checkThePage(mainPage.contactUs, false);
  });

  it("Clicking on a collapsible element reveals hidden text on the main page", async () => {
    await mainPage.checkAccordionVisible();
    await mainPage.checkActiveTabInAccordion(+mainPage.firstKey);
    await mainPage.clickTabInAccordion(mainPage.lastValue.title);
    await mainPage.checkActiveTabInAccordion(+mainPage.lastKey);
    await mainPage.checkTabText(mainPage.lastValue.description);
  });

  it("Clicking on the arrow reveals the next code example", async () => {
    await mainPage.scrollToSection();
    await mainPage.checkFirstExampleCodeVisible();
    await mainPage.clickRightArrow();
    await mainPage.checkSecondExampleCodeVisible();
  });
});
