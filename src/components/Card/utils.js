export const randomCreditCardBackgroundImage = () => {
  return Math.floor(Math.random() * 25 + 1);
};

const creditCardsRegexMap = {
  visa: /^4/,
  amex: /^(34|37)/,
  mastercard: /^5[1-5]/,
  discover: /^6011/,
  unionpay: /^62/,
  troy: /^9792/,
  diners: /^(30[0-5]|36)/,
};

export const getCreditCardFlagByRegex = (creditCardNumber) => {
  for (const [creditCardFlag, flagRegex] of Object.entries(
    creditCardsRegexMap
  )) {
    if (flagRegex.test(creditCardNumber)) {
      return creditCardFlag;
    }
  }
  // default
  return 'mastercard';
};

export const outlineElementStyle = (element) => {
  return element
    ? {
        width: `${element.offsetWidth}px`,
        height: `${element.offsetHeight}px`,
        transform: `translateX(${element.offsetLeft}px) translateY(${element.offsetTop}px)`,
      }
    : null;
};

export const maskCardNumber = (cardNumber) => {
  const cardNumberArr = cardNumber.split('');
  const cardNumberWithSpaces = [];

  // fill with blank spaces in groups of 4
  cardNumberArr.forEach((num, index) => {
    if (index % 4 === 0) cardNumberWithSpaces.push(' ');
    cardNumberWithSpaces.push(num);
  });

  return cardNumberWithSpaces;
};
