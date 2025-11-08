import Page from "./Page";
import pages from "../data/pages.json";

class SignUpPage extends Page {
  constructor() {
    super();
    this.signUp = pages["sign up"];
  }

  async checkThePage() {
    await super.checkThePage(this.signUp);
  }
}

export default new SignUpPage();
