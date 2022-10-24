const ContractKit = require("@celo/contractkit");
const Web3 = require("web3");
const privateKeyToAddress =
    require("@celo/utils/lib/address").privateKeyToAddress;
const normalizeAddressWith0x =
    require("@celo/utils/lib/address").normalizeAddressWith0x;
const fs = require("fs");
require("dotenv").config();



async function airdrop(add) {
    web3 = new Web3("https://alfajores-forno.celo-testnet.org");
    contractkit = ContractKit.newKitFromWeb3(web3);
    contractkit.connection.addAccount(process.env.PRIVATE_KEY_MINE);
    account = normalizeAddressWith0x(
        privateKeyToAddress(process.env.PRIVATE_KEY_MINE)
    );
    console.log('account:', account)
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
    let contract_address = '0xdd458b8cc455ce20B57B338E165Ac53baaE734EF'

    let contract = new contractkit.connection.web3.eth.Contract(abi, contract_address) // Init a web3.js contract instance
    let bal = await contract.methods.balanceOf().call()
    console.log(bal)

    let txo = await contract.methods.sendcUSD(add)
    let tx = await contractkit.sendTransactionObject(txo, { from: account, })
    const hash = await tx.getHash()
    const receipt = await tx.waitReceipt()
    return { hash, receipt }
}



module.exports = {
    main
}


async function main(add) {
    let result = await airdrop(add);

    return { result }

}