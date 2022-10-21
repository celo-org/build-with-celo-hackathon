require('@nomicfoundation/hardhat-toolbox')
require('hardhat-deploy')
require('hardhat-abi-exporter')
require('@nomiclabs/hardhat-ethers')

const defaultNetwork = 'alfajores'
const mnemonicPath = "m/44'/52752'/0'/0" // derivation path used by Celo
const privateKey = '0x20a67adf6750c75ead6e91a6df269a250d301123723d743a8d65c3a57a7b1fa7'

// This is the mnemonic used by celo-devchain
const DEVCHAIN_MNEMONIC =
  'concert load couple harbor equip island argue ramp clarify fence smart topic'

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.7',
  defaultNetwork,
  paths: {
    artifacts: './contracts/artifacts',
    cache: './contracts/cache',
    deploy: './contracts/deploy',
    deployments: './contracts/deployments',
  },
  abiExporter: {
    path: './blockchain/Abis/Jsons',
    only: ['Spaces', 'Rosca'],
    runOnCompile: true,
    clear: true,
    flat: true,
  },
  networks: {
    localhost: {
      url: 'http://127.0.0.1:8545',
      accounts: {
        mnemonic: DEVCHAIN_MNEMONIC,
      },
    },
    alfajores: {
      url: 'https://alfajores-forno.celo-testnet.org',
      accounts: [privateKey],
      chainId: 44787,
    },
    alfajoresDatahub: {
      url: 'https://celo-alfajores--rpc.datahub.figment.io/apikey/<API KEY>',
      accounts: [privateKey],
      chainId: 44787,
    },
  },
  namedAccounts: {
    deployer: 0,
  },
  typechain: {
    outDir: 'types',
    target: 'ethers-v5', //web3-v1
    alwaysGenerateOverloads: false, // should overloads with full signatures like deposit(uint256) be generated always, even if there are no overloads?
    externalArtifacts: ['externalArtifacts/*.json'], // optional array of glob patterns with external artifacts to process (for example external libs from node_modules)
  },
}

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html

task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners()

  for (const account of accounts) {
    console.log(account.address)
  }
})

task(
  'devchain-keys',
  'Prints the private keys associated with the devchain',
  async (taskArgs, hre) => {
    const accounts = await hre.ethers.getSigners()
    const hdNode = hre.ethers.utils.HDNode.fromMnemonic(DEVCHAIN_MNEMONIC)
    for (let i = 0; i < accounts.length; i++) {
      const account = hdNode.derivePath(`m/44'/60'/0'/0/${i}`)
      console.log(`Account ${i}\nAddress: ${account.address}\nKey: ${account.privateKey}`)
    }
  },
)
