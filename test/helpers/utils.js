/**
 * Capitalizes the first letter of a string and lowercases the rest.
 * @param {string} str The input string
 * @returns {string} Capitalized text
 */
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

/**
 * Format a number with its ordinal suffix
 * @param {number} n
 * @returns suffix of ordinal number (1st, 2nd, 3rd, 4th, etc.)
 */
export const formatOrdinalSuffix = (n) => {
  const remainder10 = n % 10;
  const remainder100 = n % 100;

  if (remainder100 >= 11 && remainder100 <= 13) return n + "th";

  switch (remainder10) {
    case 1:
      return n + "st";
    case 2:
      return n + "nd";
    case 3:
      return n + "rd";
    default:
      return n + "th";
  }
};
