const ContractKit = require("@celo/contractkit");
const Web3 = require("web3");
const OdisUtils = require("@celo/identity").OdisUtils;
const privateKeyToAddress =
    require("@celo/utils/lib/address").privateKeyToAddress;
const normalizeAddressWith0x =
    require("@celo/utils/lib/address").normalizeAddressWith0x;

require("dotenv").config();

var networkURL = "https://alfajores-forno.celo-testnet.org";
var web3 = new Web3(networkURL);
var contractkit = ContractKit.newKitFromWeb3(web3);
// contractkit.connection.addAccount(process.env.PRIVATE_KEY);
// var account = normalizeAddressWith0x(
//     privateKeyToAddress(process.env.PRIVATE_KEY)
// );
// contractkit.connection.defaultAccount = account;
// console.log('contractkit account', contractkit.defaultAccount);

async function init(privateKey) {
    web3 = new Web3("https://alfajores-forno.celo-testnet.org");
    contractkit = ContractKit.newKitFromWeb3(web3);
    contractkit.connection.addAccount(privateKey);
    account = normalizeAddressWith0x(
        privateKeyToAddress(privateKey)
    );
    contractkit.connection.defaultAccount = account;
    console.log('contractkit account', contractkit.defaultAccount);
    const balance = await contractkit.celoTokens.balancesOf(account);
    console.log('Celo balance', balance.CELO.toFixed());
    console.log('cUSD balance', balance.cUSD.toFixed());
}


const authSigner = {
    authenticationMethod: OdisUtils.Query.AuthenticationMethod.WALLET_KEY,
    contractKit: contractkit,
};

const serviceContext = {
    odisUrl: "https://us-central1-celo-phone-number-privacy.cloudfunctions.net",
    odisPubKey: "kPoRxWdEdZ/Nd3uQnp3FJFs54zuiS+ksqvOm9x8vY6KHPG8jrfqysvIRU0wtqYsBKA7SoAsICMBv8C/Fb2ZpDOqhSqvr/sZbZoHmQfvbqrzbtDIPvUIrHgRS0ydJCMsA"
}


async function getIdentifiers(e164Number) {
    const response =
        await OdisUtils.PhoneNumberIdentifier.getPhoneNumberIdentifier(
            e164Number,
            account,
            authSigner,
            serviceContext
        );
    const attestationsContract = await contractkit.contracts.getAttestations();
    let mapping = await attestationsContract.lookupIdentifiers([response.phoneHash]);
    console.log(`Phone hash -> address mapping: `, mapping);

    values = Object.values(mapping)[0]
    address = Object.values(Object.keys(values))
    console.log(`Phone hash -> address: `, address[address.length - 1]);
    return address[address.length - 1]
}

async function sendCELO(privateKey, e164Number, value) {
    await init(privateKey)
    anAddress = await getIdentifiers(e164Number)
    account_mine = await normalizeAddressWith0x(
        privateKeyToAddress(privateKey)
    );
    contractkit.connection.addAccount(normalizeAddressWith0x(privateKey))
    console.log('contractkit account', contractkit.defaultAccount);
    const balance = await contractkit.celoTokens.balancesOf(account_mine);
    console.log('Celo balance', balance.CELO.toFixed());
    console.log("FROM: ", account_mine)
    console.log("TO: ", anAddress)



    let amount = contractkit.web3.utils.toWei(value, "ether")
    let goldtoken = await contractkit.contracts.getGoldToken()
    let celotx = await goldtoken.transfer(anAddress, amount).send({ from: account_mine })
    let celoReceipt = await celotx.waitReceipt()

    console.log(`CELO Transaction: https://alfajores-blockscout.celo-testnet.org/tx/${celoReceipt.transactionHash}/`)
    return 'Successfully sent'
}


async function getWalletBalance(e164Number) {
    anAddress = await getIdentifiers(e164Number)
    let goldtoken = await contractkit.contracts.getGoldToken()
    let stabletoken = await contractkit.contracts.getStableToken()

    let celoBalance = await goldtoken.balanceOf(anAddress)
    let cUSDBalance = await stabletoken.balanceOf(anAddress)

    let celoBalanceConv = await contractkit.web3.utils.fromWei(celoBalance.toString(), "ether")
    let cUSDBalanceConv = await contractkit.web3.utils.fromWei(cUSDBalance.toString(), "ether")
    // Print balances
    console.log(`${anAddress} CELO balance: ${celoBalanceConv}`)
    console.log(`${anAddress} cUSD balance: ${cUSDBalanceConv}`)


    // return new Promise(function (resolve, reject) {
    //     resolve([celoBalanceConv, cUSDBalanceConv]);
    // });
    return { celoBalanceConv, cUSDBalanceConv }

}

module.exports = {
    getWalletBalance,
    sendCELO
}