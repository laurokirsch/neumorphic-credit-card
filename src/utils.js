const isFullNameValid = (fullName) =>
  /^[a-z ,.'-]*$/.test(fullName) || /^$/.test(fullName);

const isYearValid = (year) => {
  let isYearAboveOrEqualCurrentYear = Number(year) >= new Date().getFullYear();
  let regexIsValid = /^(\d+)$/.test(year);
  return year.length === 4
    ? isYearAboveOrEqualCurrentYear && regexIsValid
    : regexIsValid;
};

const isMonthValid = (month) => /^(0?[1-9]|1[012])$/.test(month);

export const validateInput = (name, value) => {
  switch (name) {
    case 'cardHolder':
      return isFullNameValid(value);
    case 'cardYear':
      return isYearValid(value);
    case 'cardMonth':
      return isMonthValid(value);
    default:
      return true;
  }
};

export const randomCreditCardBackgroundImage = () => {
  return Math.floor(Math.random() * 25 + 1);
};

export const creditCardsRegexMap = {
  visa: /^4/,
  amex: /^(34|37)/,
  mastercard: /^5[1-5]/,
  discover: /^6011/,
  unionpay: /^62/,
  troy: /^9792/,
  diners: /^(30[0-5]|36)/,
};
