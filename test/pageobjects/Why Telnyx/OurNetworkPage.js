import Page from "../Page";
import faq from "../../data/faq.json";
import { step } from "@wdio/allure-reporter";
import { truncateByWords } from "../../helpers/utils";

const amountFAQ = 5;

class OurNetworkPage extends Page {
  constructor() {
    super();
    const [firstKey, firstValue] = Object.entries(faq).at(0);
    const [lastKey, lastValue] = Object.entries(faq).at(-1);
    this.firstKey = firstKey;
    this.lastKey = lastKey;
    this.firstValue = firstValue;
    this.lastValue = lastValue;
  }

  async getAnswers() {
    const section = await this.getFAQSection();
    return await section.$$("p");
  }

  async getAnswer(text) {
    const section = await this.getFAQSection();
    return await section.$(`p*=${text}`);
  }

  async getFAQSection() {
    const questionElement = await $(`*=${this.firstValue.question}`);
    const parent = await questionElement.parentElement();
    return await parent.parentElement().parentElement();
  }

  async getQuestions() {
    const section = await this.getFAQSection();
    return await section.$$("h3");
  }

  async getQuestion(question) {
    const section = await this.getFAQSection();
    return await section.$(`*=${question}`);
  }

  async checkQuestionOpened(question) {
    await step(
      `The "${truncateByWords(question)}" question is opened`,
      async () => {
        const questionElement = await this.getQuestion(question);
        const parent = await questionElement.parentElement();
        await expect(parent).toHaveAttribute(...this.matchToDataStateOpen);
      }
    );
  }

  async checkQuestionClosed(question) {
    await step(
      `The "${truncateByWords(question)}" question is closed`,
      async () => {
        const questionElement = await this.getQuestion(question);
        const parent = await questionElement.parentElement();
        await expect(parent).toHaveAttribute(...this.matchToDataStateClosed);
      }
    );
  }

  async checkFAQSectionVisible() {
    await step("The FAQ section is visible", async () => {
      const section = await this.getFAQSection();
      await expect(section).toBeDisplayed();
    });
  }

  async checkAmountOfQuestions() {
    await step(
      `There are ${amountFAQ} questions in the "FAQ" section`,
      async () => {
        const questions = await this.getQuestions();
        await super.checkAmountOfItems(questions.length, amountFAQ);
      }
    );
  }

  async openTheQuestion(question) {
    await step(`Click the "${truncateByWords(question)}" question`, async () => {
      const questionElement = await this.getQuestion(question);
      await questionElement.click();
    });
  }

  async scrollToSection(sectionName = "FAQ") {
    await super.scrollToSection(sectionName);
  }
}

export default new OurNetworkPage();
