const generateImagesArray = () => {
  const imgs = [];
  for (let i = 1; i <= 25; i++) {
    imgs.push(require(`./card-bg/${i}.jpeg`));
  }
  return imgs;
};

export const creditCardBackground = [...generateImagesArray()];

export const creditCardFlagTypes = {
  visa: require('./card-flags/visa.png'),
  amex: require('./card-flags/amex.png'),
  mastercard: require('./card-flags/mastercard.png'),
  discover: require('./card-flags/discover.png'),
  unionpay: require('./card-flags/unionpay.png'),
  troy: require('./card-flags/troy.png'),
  diners: require('./card-flags/diners.png'),
};

export const chip = require('./chip.png');
