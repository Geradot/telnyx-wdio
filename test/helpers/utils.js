import allureReporter from "@wdio/allure-reporter";

export async function step(name, fn) {
  allureReporter.startStep(name);
  try {
    await fn();
  } finally {
    allureReporter.endStep();
  }
}

export const capitalize = (str) =>
  typeof str === "string"
    ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
    : "";

/**
 * Truncate a text by words
 * @param {string} text The text to truncate
 * @param {number} maxWords (8 is default) The maximum number of words to keep
 * @returns {string} The truncated text
 */
export const truncateByWords = (text, maxWords = 8) => {
  const words = text.trim().split(/\s+/);
  if (words.length <= maxWords) return text;

  const half = Math.floor(maxWords / 2);
  return words.slice(0, half).join(" ") + "…";
};
