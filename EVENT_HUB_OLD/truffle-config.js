// LOAD ENV VAR
require("dotenv").config();
//
// INIT PROVIDER USING CONTRACT KIT
const Kit = require("@celo/contractkit");
const kit = Kit.newKit(process.env.REACT_APP_DATAHUB_NODE_API);

// AWAIT WRAPPER FOR ASYNC FUNC
async function awaitWrapper() {
  // let account = kit.connection.addAccount('0xf222ad8e584e436bdf3e25b2d1d1bdf2f1d2eb3d22eccaf23c50f495ffa028dc'); // ADDING ACCOUNT HERE
  let account = kit.connection.addAccount(process.env.REACT_APP_PRIVATE_KEY); // ADDING ACCOUNT HERE
  console.log(account)
}
//
awaitWrapper();

// TRUFFLE CONFIG OBJECT
module.exports = {
  contracts_build_directory: './src/artifacts',
  networks: {
    alfajores: {
      provider: kit.connection.web3.currentProvider, // CeloProvider
      network_id: 44787, // latest Alfajores network id
      networkCheckTimeout: 60000
    },
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*"
    }
  },
  // Configure your compilers
  compilers: {
    solc: {
      version: "0.8.3", // Fetch exact version from solc-bin (default: truffle's version)
    },
  },
  db: {
    enabled: false,
  },
};