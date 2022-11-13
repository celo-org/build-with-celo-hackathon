import { abs, log10 } from 'mathjs';

const SI_SYMBOL = ['', 'k', 'M', 'B', 'T', 'P', 'E'];

// eslint-disable-next-line import/prefer-default-export
export const abbreviateNumber = (number, isDecimals) => {
  // what tier? (determines SI symbol)
  // eslint-disable-next-line no-bitwise
  const tier = log10(abs(number)) / 3 | 0;

  // if zero, we don't need a suffix
  if (tier === 0) return isDecimals ? number.toFixed(2) : number;

  // get suffix and determine scale
  const suffix = SI_SYMBOL[tier];
  const scale = 10 ** (tier * 3);

  // scale the number
  const scaled = number / scale;

  // format number and add suffix
  return `${isDecimals ? scaled.toFixed(1) : scaled}${suffix}`;
};

// eslint-disable-next-line import/prefer-default-export
export const removeDecimals = (number) => {

  return Math.trunc(number)
};

