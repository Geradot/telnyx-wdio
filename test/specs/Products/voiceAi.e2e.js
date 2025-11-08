import voiceAiPage from "../../pageobjects/Products/VoiceAi.js";
import signUpPage from "../../pageobjects/SignUpPage.js";

describe("Telnyx.com | Products → Voice AI page.", () => {
  beforeEach(async () => {
    await voiceAiPage.open();
  });

  it("Clicking the 'Start building for free' button opens the registration page", async () => {
    await voiceAiPage.clickStartBuildingBtn();
    await signUpPage.checkThePage(signUpPage.signUp);
  });
});
