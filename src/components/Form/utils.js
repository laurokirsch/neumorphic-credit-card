const isFullNameValid = (fullName) => {
  const regexName = /^$|^[a-z ,.'-]*$/;
  return regexName.test(fullName);
};

const isCardNumberValid = (cardNumber) => {
  const regexNumbers = /^[0-9]{0,16}$/;
  return regexNumbers.test(cardNumber);
};

const isYearValid = (year) => {
  const isYearAboveOrEqualCurrentYear =
    Number(year) >= Number(new Date().getFullYear().toString().substr(2));
  const regexIsValid = /^(\d+)$/.test(year);
  return year.length === 2
    ? isYearAboveOrEqualCurrentYear && regexIsValid
    : regexIsValid;
};

const isMonthValid = (month) => /^(0?[1-9]|1[012])$/.test(month);

export const validateInput = (name, value) => {
  switch (name) {
    case 'cardHolder':
      return isFullNameValid(value);
    case 'cardNumber':
      return isCardNumberValid(value);
    case 'cardYear':
      return isYearValid(value);
    case 'cardMonth':
      return isMonthValid(value);
    default:
      return true;
  }
};
