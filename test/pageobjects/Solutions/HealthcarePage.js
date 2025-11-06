import Page from "../Page";
import healthcareCases from "../../data/healthcare-cases.json";

class HealthcarePage extends Page {
  healthCareCases = Object.keys(healthcareCases);
  healthCareLinks = Object.values(healthcareCases);

  async open() {
    await super.open();
  }
}
export default new HealthcarePage();