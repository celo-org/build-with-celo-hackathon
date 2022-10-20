const ContractKit = require("@celo/contractkit");
const Web3 = require("web3");
const privateKeyToAddress =
    require("@celo/utils/lib/address").privateKeyToAddress;
const normalizeAddressWith0x =
    require("@celo/utils/lib/address").normalizeAddressWith0x;
const fs = require("fs");
require("dotenv").config();



async function main() {
    web3 = new Web3("https://alfajores-forno.celo-testnet.org");
    contractkit = ContractKit.newKitFromWeb3(web3);
    contractkit.connection.addAccount(process.env.PRIVATE_KEY);
    account = normalizeAddressWith0x(
        privateKeyToAddress(process.env.PRIVATE_KEY)
    );
    console.log(account)
    contractkit.connection.defaultAccount = account;
    // contractkit.contracts.setFeeCurrency(contractkit.StableToken)
    const abi = [
        {
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "addresses",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_to",
                    "type": "address"
                }
            ],
            "name": "sendcUSD",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ];
    let address = '0xf74E9ECf9C52426146a951fB15033da3AdE5455b'
    let contract_address = '0x901e46fAcEa407ee3f716E1B2876B99544915Bae'

    let contract = new contractkit.connection.web3.eth.Contract(abi, contract_address) // Init a web3.js contract instance
    let cUSDcontract = await contractkit.contracts.getStableToken()
    let bal = await contract.methods.balanceOf().call()
    console.log(bal)

    let add = await contract.methods.addresses('2').call()
    console.log(add)

    let txo = await contract.methods.sendcUSD(address)
    // .send({ from: account, gasPrice: 100000 })
    let tx = await contractkit.sendTransactionObject(txo, { from: account, })
    const hash = await tx.getHash()
    const receipt = await tx.waitReceipt()
    console.log('hash:', hash)

    console.log('receipt:', receipt)
}

main()



// Specifying the 'from' account and 'feeCurrency' is optional
// Transactions with an unspecified feeCurrency field will default to paying fees in CELO
// const tx = contract.methods.sendcUSD(address).send({ from: account.address })


// var ethers = require('ethers');
// var providers = require('ethers').providers;
// var Contract = require('ethers').Contract;
// require("dotenv").config();



// const privateKey = process.env.PRIVATE_KEY
// var provider = providers.getNetwork(44787)
// var wallet = new ethers.Wallet(privateKey, provider);
// var address = "0x901e46fAcEa407ee3f716E1B2876B99544915Bae";
// console.log('Address: ' + wallet.address);


// async function send(add) {
//     const contract = new Contract(
//         address,
//         abi,
//         wallet
//     );

//     const transaction = await contract.sendcUSD(add);
//     console.log("Transaction Done")
//     const output = await contract.balanceOf()
//     console.log("balanceOf: ", ethers.utils.formatEther(output))
// }


// send(addresses)
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });

