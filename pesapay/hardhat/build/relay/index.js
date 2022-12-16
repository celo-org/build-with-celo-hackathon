'use strict';

var require$$0 = require('ethers');
var require$$1 = require('defender-relay-client/lib/ethers');

/**
 * ABI of the MinimalForwarder contract
 */

const ForwarderAbi$1 = [
  { inputs: [], stateMutability: "nonpayable", type: "constructor" },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
          { internalType: "uint256", name: "gas", type: "uint256" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct MinimalForwarder.ForwardRequest",
        name: "req",
        type: "tuple",
      },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "execute",
    outputs: [
      { internalType: "bool", name: "", type: "bool" },
      { internalType: "bytes", name: "", type: "bytes" },
    ],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [{ internalType: "address", name: "from", type: "address" }],
    name: "getNonce",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          { internalType: "address", name: "from", type: "address" },
          { internalType: "address", name: "to", type: "address" },
          { internalType: "uint256", name: "value", type: "uint256" },
          { internalType: "uint256", name: "gas", type: "uint256" },
          { internalType: "uint256", name: "nonce", type: "uint256" },
          { internalType: "bytes", name: "data", type: "bytes" },
        ],
        internalType: "struct MinimalForwarder.ForwardRequest",
        name: "req",
        type: "tuple",
      },
      { internalType: "bytes", name: "signature", type: "bytes" },
    ],
    name: "verify",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function",
  },
];

var forwarder = {
  ForwarderAbi: ForwarderAbi$1,
};

var MinimalForwarder="0xfC888c887ea2FF3c70DFF5B709E2d18D519b9f4b";var CashOut="0xdD01c2DcAf4f1899d36987A8bc7E856d48efe1D2";var Token="0x91A794303F6A1D18Ae03ec689983568D76121E00";var require$$3 = {MinimalForwarder:MinimalForwarder,CashOut:CashOut,Token:Token};

const ethers = require$$0;
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = require$$1;

const { ForwarderAbi } = forwarder;
const ForwarderAddress = require$$3.MinimalForwarder;

async function relay(forwarder, request, signature, whitelist) {
  // Decide if we want to relay this request based on a whitelist
  const accepts = !whitelist || whitelist.includes(request.to);
  if (!accepts) throw new Error(`Rejected request to ${request.to}`)

  // Validate request on the forwarder contract
  const valid = await forwarder.verify(request, signature);
  if (!valid) throw new Error(`Invalid request`)

  // Send meta-tx through relayer to the forwarder contract
  const gasLimit = (parseInt(request.gas) + 50000).toString();
  const tx = await forwarder.execute(request, signature, { gasLimit });
  const reciept = await tx.wait(10);
  console.log(reciept);
  return reciept
}

async function handler(event) {
  // Parse webhook payload
  if (!event.request || !event.request.body) throw new Error(`Missing payload`)
  const { request, signature } = event.request.body;
  console.log(`Relaying`, request, signature);

  // Initialize Relayer provider and signer, and forwarder contract
  const credentials = { ...event };
  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, {
    speed: "fast",
  });
  const forwarder = new ethers.Contract(ForwarderAddress, ForwarderAbi, signer);

  // Relay transaction!
  const tx = await relay(forwarder, request, signature);
  return { txHash: tx.confirmations }
}

var relay_1 = {
  handler,
  relay,
};

module.exports = relay_1;
