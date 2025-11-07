import mainPage from "../pageobjects/MainPage.js";
import voiceAiPage from "../pageobjects/Products/VoiceAi.js";
import ourNetworkPage from "../pageobjects/Why Telnyx/OurNetworkPage.js";
import signUpPage from "../pageobjects/SignUpPage.js";
import healthcarePage from "../pageobjects/Solutions/HealthcarePage.js";

const widthOfScreen = 1440;
const heightOfScreen = 900;

describe("Testing Telnyx.com", () => {
  beforeEach(async () => {
    await browser.setWindowSize(widthOfScreen, heightOfScreen);
    await mainPage.open();
    await mainPage.checkUrl("/");
  });

  it("TC-1: Clicking the 'Start building for free' button opens the registration page", async () => {
    await mainPage.openTheMenuItem(
      mainPage.products.title,
      mainPage.voiceAi.title
    );
    await voiceAiPage.checkThePage(voiceAiPage.voiceAi);
    await voiceAiPage.clickStartBuildingBtn();
    await signUpPage.checkThePage(signUpPage.signUp);
  });

  it("TC-2: Changing the Role also changes the spoken text in the 'Text to speech' tab", async () => {
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

  it("TC-3: Clicking the 'Contact us' link opens it", async () => {
    await mainPage.clickContactUsLink();
    await mainPage.checkThePage(mainPage.contactUs);
  });

  it("TC-4: Clicking on a collapsible element reveals hidden text on the main page", async () => {
    await mainPage.checkAccordionVisible();
    await mainPage.checkActiveTabInAccordion(+mainPage.firstKey);
    await mainPage.clickTabInAccordion(mainPage.lastValue.title);
    await mainPage.checkActiveTabInAccordion(+mainPage.lastKey);
    await mainPage.checkTabText(mainPage.lastValue.description);
  });

  it("TC-5: Clicking on the arrow reveals the next code example", async () => {
    await mainPage.scrollToSection();
    await mainPage.checkFirstExampleCodeVisible();
    await mainPage.clickRightArrow();
    await mainPage.checkSecondExampleCodeVisible();
  });

  it("TC-6: Clicking on a collapsible element reveals hidden text on the 'Our Network' page", async () => {
    await mainPage.openTheMenuItem(
      mainPage.whyTelnyx.title,
      mainPage.ourNetwork.title
    );
    await ourNetworkPage.checkThePage(ourNetworkPage.ourNetwork);
    await ourNetworkPage.checkFAQSectionVisible();
    await ourNetworkPage.scrollToSection();
    await ourNetworkPage.checkAmountOfItems();
    await ourNetworkPage.checkQuestionOpened(
      ourNetworkPage.firstValue.question
    );
    await ourNetworkPage.openTheQuestion(ourNetworkPage.lastValue.question);
    await ourNetworkPage.checkQuestionClosed(
      ourNetworkPage.firstValue.question
    );
  });

  it('TC-7: A relevant YouTube link is bound to every case on the "Healthcare" page', async () => {
    await mainPage.openTheMenuItem(
      mainPage.solutions.title,
      mainPage.healthcare.title
    );
    await healthcarePage.scrollToCases();
    await healthcarePage.checkAmountOfItems();
    await healthcarePage.checkYouTubeLinks();
  });
});
