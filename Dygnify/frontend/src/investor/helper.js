const API = "https://api-sandbox.circle.com/v1/banks/wires";

const data = {
  idempotencyKey: "6ae62bf2-bd71-49ce-a599-165ffcc33680",
  beneficiaryName: "John Smith",
  accountNumber: "123456789",
  routingNumber: "021000021",
  billingDetails: {
    name: "John Smith",
    city: "Boston",
    country: "US",
    line1: "1 Main Street",
    district: "MA",
    postalCode: "02201",
  },
  bankAddress: { country: "US" },
};

export const createAccount = () => {
  return fetch(API, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CIRCLE}`,
    },
    body: data,
  })
    .then((response) => {
      //   return response.json();
      console.log(response);
    })
    .catch((err) => console.log(err));
};

const APIGET = `https://api-sandbox.circle.com/v1/banks/wires/${process.env.BANK_ACCOUNT_ID}/instructions`;

const getTransferDetails = () => {
  return fetch(APIGET, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${process.env.CIRCLE}`,
    },
  })
    .then((response) => {
      //   return response.json();
      console.log(response);
    })
    .catch((err) => console.log(err));
};