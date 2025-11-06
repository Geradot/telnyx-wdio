import Page from "./Page";
import pages from "../data/pages.json";

class SignUpPage extends Page {
  url = pages["sign up"].url;
  heading = pages["sign up"]["page heading"];
}

export default new SignUpPage();
