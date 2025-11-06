import Page from "../Page";
import { capitalize, step } from "../../helpers/utils";
import navigation from "../../data/navigation.json";

class VoiceAiPage extends Page {
  btnText = "START BUILDING FOR FREE";
  heading = navigation.products.submenu.voice["voice ai"]["page heading"];
  url = navigation.products.submenu.voice["voice ai"].url;

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
}

export default new VoiceAiPage();
