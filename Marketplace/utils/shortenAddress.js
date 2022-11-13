export const shortenAddress = (address) => (
  `${address.substring(0, 5)}...${address.slice(address.length - 4)}`
);
