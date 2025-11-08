import Page from "../Page";
import { capitalize } from "../../helpers/utils";
import { step } from "@wdio/allure-reporter";
import navigation from "../../data/navigation.json";

class VoiceAiPage extends Page {
  constructor() {
    super();
    this.btnText = "START BUILDING FOR FREE";
    this.voiceAi = navigation.products.submenu.voice["voice ai"];
  }

  async getStartBuildingBtn() {
    const formattedText = capitalize(this.btnText);
    return $(`span[data-content='${formattedText}']`).parentElement();
  }

  async clickStartBuildingBtn() {
    await step(`Click "${this.btnText}" button`, async () => {
      const button = await this.getStartBuildingBtn();
      await button.waitForDisplayed();
      await button.click();
    });
  }

  async open() {
    await super.open(this.voiceAi);
  }
}

export default new VoiceAiPage();
