const tokenTransactions = (address, page, offset) => {
  if (!address) {
    return null;
  }
  console.log("Fetching transactions for address - ", address);
  var api_options = {
    method: "get",
    url: `${
      process.env.REACT_APP_POLYGONSCAN_URL
    }/api?module=account&action=tokentx&address=${address}&startblock=0&endblock=99999999&page=${
      page ? page : 1
    }&offset=${offset ? offset : 10}&sort=desc&apikey=${
      process.env.REACT_APP_POLYGONSCAN_APIKEY
    }`,
  };

  return api_options;
};

module.exports = { tokenTransactions };
