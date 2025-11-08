import ourNetworkPage from "../../pageobjects/Why Telnyx/OurNetworkPage";

describe("Telnyx.com | Why Telnyx → Our Network page.", () => {
  beforeEach(async () => {
    await ourNetworkPage.open();

  });
  it("Clicking on a collapsible element reveals hidden text on the 'Our Network' page", async () => {
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
});
