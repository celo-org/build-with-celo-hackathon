var Web3 = require("web3");
var { newKitFromWeb3 } = require("@celo/contractkit");

const web3 = new Web3("https://alfajores-forno.celo-testnet.org")
const kit = newKitFromWeb3(web3);

const account = web3.eth.accounts.create(web3.utils.randomHex(32))

console.log('Address: ', account.address)
console.log('Private: ', account.privateKey)

// Address:  0x4935f9c63BFE2a6Bf650fC70537D91b6483b69Cc
// Private:  0xdf554825c335a8267b8a3403ff265422efe958b4ad3fd9a53bf1ee7124e2eda8

// Address:  0xdC6a725a139614450542D9954d48A1dAdee5A06f
// Private:  0x7e467a1328a3032c5faab271197c46785ba359582445e76892b8256a0c2099b3
