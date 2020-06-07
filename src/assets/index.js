const generateImagesArray = () => {
  const imgs = [];
  for (let i = 1; i <= 25; i++) {
    imgs.push(require(`./card-background/${i}.jpeg`));
  }
  return imgs;
};

export const creditCardBackground = [...generateImagesArray()];

export const creditCardFlagTypes = {
  visa: require('./card-type/visa.png'),
  amex: require('./card-type/amex.png'),
  mastercard: require('./card-type/mastercard.png'),
  discover: require('./card-type/discover.png'),
  unionpay: require('./card-type/unionpay.png'),
  troy: require('./card-type/troy.png'),
  diners: require('./card-type/diners.png'),
};

export const chip = require('./chip.png');
