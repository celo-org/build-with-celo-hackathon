// format an address
export const truncateAddress = (address) => {
  if (!address) return;
  return address.slice(0, 5) + "..." + address.slice(-5);
};

// convert from big number
export const formatBigNumber = (num) => {
  if (!num) return;
  if (String(num).length < 12) return num;
  return (num / 10 ** 18).toFixed(2);
};
