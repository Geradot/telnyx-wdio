import mainPage from "../pageobjects/MainPage.js";
import voiceAiPage from "../pageobjects/Products/VoiceAi.js";
import ourNetworkPage from "../pageobjects/Why Telnyx/OurNetworkPage.js";
import signUpPage from "../pageobjects/SignUpPage.js";
import pages from "../data/pages.json";
import capabilities from "../data/capabilities.json";
import navigation from "../data/navigation.json";

const widthOfScreen = 1440;
const heightOfScreen = 900;

describe("Testing Telnyx.com", () => {
  beforeEach(async () => {
    // await browser.reloadSession();
    await browser.setWindowSize(widthOfScreen, heightOfScreen);
    await mainPage.open();
    await mainPage.checkUrl("/");
  });

  it("TC-1: Clicking the 'Start building for free' button opens the registration page", async () => {
    await mainPage.openTheMenuItem(mainPage.products);
    await mainPage.openTheMenuItem(mainPage.voiceAi);
    await voiceAiPage.checkUrl(voiceAiPage.url);
    await voiceAiPage.checkPageHeadingDisplayed(voiceAiPage.heading);
    await voiceAiPage.clickStartBuildingBtn();
    await signUpPage.checkUrl(signUpPage.url);
    await signUpPage.checkPageHeadingDisplayed(signUpPage.heading);
  });

  it("TC-2: Changing the Role also changes the spoken text in the 'Text to speech' tab", async () => {
    const role1 = pages.main["ai tabs"]["text to speech"].roles[0];
    const role2 = pages.main["ai tabs"]["text to speech"].roles[1];

    // Ad-hoc because sometimes the test does not pass on the Desktop size.
    // Something happens with website’s layout.
    await browser.setWindowSize(heightOfScreen, widthOfScreen);

    await mainPage.clickCallAgentBtn();
    await mainPage.checkAiTabsVisible();
    await mainPage.checkAiTabActive(mainPage.hdVoiceAiTabName);
    await mainPage.clickAiTab(mainPage.textToSpeechTabName);
    await mainPage.checkAiTabActive(mainPage.textToSpeechTabName);
    await mainPage.checkPlayAudioBtnExist();
    await mainPage.checkTextarea(role1["checking text"]);
    await mainPage.clickRoleSelect();
    await mainPage.selectRole(role2.name);
    await mainPage.checkTextarea(role2["checking text"]);
  });

  it("TC-3: Clicking the 'Contact us' link opens it", async () => {
    const contactUs = pages["contact us"];
    await mainPage.clickContactUsLink();
    await mainPage.checkUrl(contactUs.url);
    await mainPage.checkPageHeadingDisplayed(contactUs["page heading"]);
  });

  it("TC-4: Clicking on a collapsible element reveals hidden text on the main page", async () => {
    const [firstKey] = Object.keys(capabilities).at(0);
    const [lastKey, lastValue] = Object.entries(capabilities).at(-1);

    await mainPage.checkAccordionVisible();
    await mainPage.checkActiveTabInAccordion(+firstKey);
    await mainPage.clickTabInAccordion(lastValue.title);
    await mainPage.checkActiveTabInAccordion(+lastKey);
    await mainPage.checkTabText(lastValue.description);
  });

  it("TC-5: Clicking on the arrow reveals the next code example", async () => {
    await mainPage.scrollToSection();
    await mainPage.checkFirstExampleCodeVisible();
    await mainPage.clickRightArrow();
    await mainPage.checkSecondExampleCodeVisible();
  });

  it("TC-6: Clicking on a collapsible element reveals hidden text on the 'Our Network' page", async () => {
    const nav = navigation["why telnyx"];
    await mainPage.openTheMenuItem(nav.title);
    await mainPage.openTheMenuItem(nav.submenu["our network"].title);
    await ourNetworkPage.checkUrl(nav.submenu["our network"].url);
    await ourNetworkPage.checkPageHeadingDisplayed(
      nav.submenu["our network"]["page heading"]
    );
    await ourNetworkPage.checkFAQSectionVisible();
    await ourNetworkPage.scrollToSection();
    await ourNetworkPage.checkAmountOfQuestions();
    await ourNetworkPage.checkQuestionOpened(
      ourNetworkPage.firstValue.question
    );
    await ourNetworkPage.openTheQuestion(ourNetworkPage.lastValue.question);
    await ourNetworkPage.checkQuestionOpened(ourNetworkPage.lastValue.question);
    await ourNetworkPage.checkQuestionClosed(
      ourNetworkPage.firstValue.question
    );
  });

  it.only('TC-7: A relevant YouTube link is bound to every case on the "Healthcare" page', async () => {
    await mainPage.openTheMenuItem(mainPage.solutions);
    await mainPage.openTheMenuItem(mainPage.healthcare);
    
    
  });
});
