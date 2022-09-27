const decimalFormator = (number) => {
  if (number === 0) {
    return 0;
  } else if (number >= 1000) {
    return number.toFixed(0);
  } else if (number >= 1 && number < 1000) {
    return number.toFixed(2);
  } else if (number >= 0.1 && number < 1) {
    return number.toFixed(4);
  } else if (number >= 0.01 && number < 0.1) {
    return number.toFixed(5);
  } else if (number >= 0.001 && number < 0.01) {
    return number.toFixed(6);
  } else if (number >= 0.0001 && number < 0.001) {
    return number.toFixed(7);
  } else if (number >= 0.00001 && number < 0.0001) {
    return number.toFixed(8);
  } else if (number >= 0.000001 && number < 0.00001) {
    return number.toFixed(10);
  } else return number;
};
export const priceFormatter = (number, unit) => {
  let _number = decimalFormator(number);
  return _number === "Loading..."
    ? "Loading..."
    : unit === ""
    ? _number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    : _number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",") +
      " " +
      unit;
};
