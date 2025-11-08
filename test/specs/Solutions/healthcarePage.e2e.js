import healthcarePage from "../../pageobjects/Solutions/HealthcarePage";

describe("Telnyx.com | Solutions → Healthcare page.", () => {
  beforeEach(async () => {
    await healthcarePage.open();
  });

  it('A relevant YouTube link is bound to every case on the "Healthcare" page', async () => {
    await healthcarePage.scrollToCases();
    await healthcarePage.checkAmountOfItems();
    await healthcarePage.checkYouTubeLinks();
  });
});
