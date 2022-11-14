// import { HardhatUserConfig } from "hardhat/config";
// import "@nomicfoundation/hardhat-toolbox";

// const defaultNetwork = "alfajores";
// const mnemonicPath = "m/44'/52752'/0'/0"; // derivation path used by Celo

// // This is the mnemonic used by celo-devchain
// const DEVCHAIN_MNEMONIC =
//   "concert load couple harbor equip island argue ramp clarify fence smart topic";

// const config: HardhatUserConfig = {
//   networks: {
  //   localhost: {
  //     url: "http://127.0.0.1:8545",
  //     accounts: {
  //       mnemonic: DEVCHAIN_MNEMONIC,
  //     },
  //   },
  //   alfajores: {
  //     url: "https://alfajores-forno.celo-testnet.org",
  //     accounts: [`${process.env.PRIVATE_KEY}`],
  //     chainId: 44787,
  //   },
  //   alfajoresDatahub: {
  //     url: "https://celo-alfajores--rpc.datahub.figment.io/apikey/<API KEY>",
  //     accounts: [`${process.env.PRIVATE_KEY}`],
  //     chainId: 44787,
  //   },
  //   celo: {
  //     url: "https://forno.celo.org",
  //     accounts: [`${process.env.PRIVATE_KEY}`],
  //     chainId: 42220,
  //   },
  //   celoDatahub: {
  //     url: "https://celo-mainnet--rpc.datahub.figment.io/apikey/<API KEY>",
  //     accounts: [`${process.env.PRIVATE_KEY}`],
  //     chainId: 42220,
  //   },
  // },
  // solidity: {
  //   version: "0.8.9",
  //   settings: {          // See the solidity docs for advice about optimization and evmVersion
  //     optimizer: {
  //       enabled: true,
  //       runs: 200
  //     },
  //     evmVersion: "byzantium"
  //    }
//   },
  
//   namedAccounts: {
//     deployer: 0,
//     feeTo: 1,
//   },
  // typechain: {
  //   outDir: "types",
  //   target: "web3-v1",
  //   alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
  //   externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  // },
// };

// export default config;










import { config as CONFIG } from "dotenv";
import { HardhatUserConfig, task } from "hardhat/config";
import "@nomicfoundation/hardhat-chai-matchers";
// import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-ethers";
import "@symfoni/hardhat-react";
import "@typechain/ethers-v5";
import "hardhat-typechain";
import "hardhat-deploy";
import "ethers";
// import "@typechain/web3-v1"
// import "hardhat-deploy-ethers";

CONFIG();

const defaultNetwork = "alfajores";
const mnemonicPath = "m/44'/52752'/0'/0"; // derivation path used by Celo

// This is the mnemonic used by celo-devchain
const DEVCHAIN_MNEMONIC =
  "concert load couple harbor equip island argue ramp clarify fence smart topic";


// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  for (const account of accounts) {
    console.log(account.address);
  }
});

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
const config: HardhatUserConfig = {
  // react: {
  //   providerPriority: ["web3modal", "hardhat"],
  // },
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      accounts: {
        mnemonic: DEVCHAIN_MNEMONIC,
      },
    },
    alfajores: {
      url: "https://alfajores-forno.celo-testnet.org",
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 44787,
    },
    alfajoresDatahub: {
      url: "https://celo-alfajores--rpc.datahub.figment.io/apikey/<API KEY>",
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 44787,
    },
    celo: {
      url: "https://forno.celo.org",
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 42220,
    },
    celoDatahub: {
      url: "https://celo-mainnet--rpc.datahub.figment.io/apikey/<API KEY>",
      accounts: [`${process.env.PRIVATE_KEY}`],
      chainId: 42220,
    },
  },
  // hardhat: {
  //   accounts: [
  //     {
  //       balance: "10000000000000000000000",
  //       privateKey:
  //         "0xe87d780e4c31c953a68aef2763df56599c9cfe73df4740fc24c2d0f5acd21bae",
  //     },
  //   ],
  // },
  namedAccounts: {
    deployer: 0,
    feeTo: 1
  },
  // typechain: {
  //   outDir: "types",
  //   target: "web3-v1",
    
  //   // alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
  //   // externalArtifacts: ["externalArtifacts/*.json"], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  // },
  
  solidity: {
    compilers: [
      {
        version: "0.8.9",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
};
export default config;
