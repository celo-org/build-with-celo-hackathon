/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./autotasks/relay/index.js":
/*!**********************************!*\
  !*** ./autotasks/relay/index.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const ethers = __webpack_require__(/*! ethers */ "ethers")
// const Flutterwave = require("flutterwave-node-v3")
const {
  DefenderRelaySigner,
  DefenderRelayProvider,
} = __webpack_require__(/*! defender-relay-client/lib/ethers */ "defender-relay-client/lib/ethers")

const { ForwarderAbi } = __webpack_require__(/*! ../../src/forwarder */ "./src/forwarder.js")
const ForwarderAddress = (__webpack_require__(/*! ../../deployCashout.json */ "./deployCashout.json").MinimalForwarder)
const { FLW_PUBLIC_KEY: publicKey, FLW_SECRET_KEY: secretKey } = process.env
const flw = new Flutterwave(publicKey, secretKey)

async function relay(forwarder, request, signature, params, whitelist) {
  // Decide if we want to relay this request based on a whitelist
  const accepts = !whitelist || whitelist.includes(request.to)
  if (!accepts) throw new Error(`Rejected request to ${request.to}`)

  // Validate request on the forwarder contract
  const valid = await forwarder.verify(request, signature)
  if (!valid) throw new Error(`Invalid request`)

  // Send meta-tx through relayer to the forwarder contract
  const gasLimit = (parseInt(request.gas) + 50000).toString()
  const tx = await forwarder.execute(request, signature, { gasLimit })
  const reciept = await tx.wait(10)
  // include logic to query the cashout contract matching the exact transaction has for events emited or for the ERC20 transfers.
  try {
    const { data } = await flw.Transfer.initiate(params)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  console.log(reciept)
  return reciept
}

async function handler(event) {
  // Parse webhook payload
  if (!event.request || !event.request.body) throw new Error(`Missing payload`)
  const { request, signature, params } = event.request.body
  console.log(`Relaying`, request, signature)

  // Initialize Relayer provider and signer, and forwarder contract
  const credentials = { ...event }
  const provider = new DefenderRelayProvider(credentials)
  const signer = new DefenderRelaySigner(credentials, provider, {
    speed: "fast",
  })
  const forwarder = new ethers.Contract(ForwarderAddress, ForwarderAbi, signer)

  // Relay transaction!
  const tx = await relay(forwarder, request, signature, params)
  console.log(`Sent meta-tx: ${tx.confirmations}`)
  return { txHash: tx.confirmations }
}

module.exports = {
  handler,
  relay,
}


/***/ }),

/***/ "./src/forwarder.js":
/*!**************************!*\
  !*** ./src/forwarder.js ***!
  \**************************/
/***/ ((module) => {

/**
 * ABI of the MinimalForwarder contract
 */
const ForwarderAbi = [
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
]

module.exports = {
  ForwarderAbi,
}


/***/ }),

/***/ "defender-relay-client/lib/ethers":
/*!***************************************************!*\
  !*** external "defender-relay-client/lib/ethers" ***!
  \***************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("defender-relay-client/lib/ethers");

/***/ }),

/***/ "ethers":
/*!*************************!*\
  !*** external "ethers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("ethers");

/***/ }),

/***/ "./deployCashout.json":
/*!****************************!*\
  !*** ./deployCashout.json ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = JSON.parse('{"MinimalForwarder":"0x4895bF998e0eF4DED03860175eA7de09F54Ed289","CashOut":"0x2Cff4be5Ac16AccbFe00d806A51270E5Fe556400","Token":"0x53cb991435c6f6d8bb9d4d32c127384d999a1548"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./autotasks/relay/index.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map