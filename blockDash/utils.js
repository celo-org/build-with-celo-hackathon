const ContractKit = require("@celo/contractkit");
const Web3 = require("web3");
const OdisUtils = require("@celo/identity").OdisUtils;
const privateKeyToAddress =
    require("@celo/utils/lib/address").privateKeyToAddress;
const normalizeAddressWith0x =
    require("@celo/utils/lib/address").normalizeAddressWith0x;

require("dotenv").config();

let
    phoneNumber,
    phoneHash,
    pepper


var networkURL = "https://alfajores-forno.celo-testnet.org";
var web3 = new Web3(networkURL);
var contractkit = ContractKit.newKitFromWeb3(web3);
contractkit.connection.addAccount(process.env.PRIVATE_KEY_MINE);
var account = normalizeAddressWith0x(
    privateKeyToAddress(process.env.PRIVATE_KEY_MINE)
);


async function init(privateKey) {
    web3 = new Web3("https://alfajores-forno.celo-testnet.org");
    contractkit = ContractKit.newKitFromWeb3(web3);
    contractkit.connection.addAccount(privateKey);
    account = normalizeAddressWith0x(
        privateKeyToAddress(privateKey)
    );
    contractkit.connection.defaultAccount = account;
    console.log('account:', account);
    console.log('contractkit account', contractkit.defaultAccount);
    const balance = await contractkit.celoTokens.balancesOf(account);
    console.log('Celo balance', balance.CELO.toFixed());
    console.log('cUSD balance', balance.cUSD.toFixed());
}

async function sendCELO(privateKey, e164Number, value) {
    console.log('e164Number: ', e164Number)

    if (e164Number.length == 42) {
        anAddress = e164Number;
    } else {
        anAddress = await getIdentifiers(e164Number);
    }
    console.log('anadddress:', anAddress)
    await init(privateKey)
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

async function getWalletBalance(privateKey, e164Number) {

    web3 = new Web3("https://alfajores-forno.celo-testnet.org");
    contractkit = ContractKit.newKitFromWeb3(web3);
    // contractkit.connection.addAccount(privateKey);
    contractkit.connection.addAccount(privateKey);


    account = normalizeAddressWith0x(
        privateKeyToAddress(privateKey)
    );
    contractkit.connection.defaultAccount = account;

    const balance = await contractkit.celoTokens.balancesOf(account);
    console.log('Celo balance', balance.CELO.toFixed());
    console.log('cUSD balance', balance.cUSD.toFixed());

    let celoBalanceConv = await contractkit.web3.utils.fromWei(balance.CELO.toFixed())
    let cUSDBalanceConv = await contractkit.web3.utils.fromWei(balance.cUSD.toFixed())

    console.log(`${account} CELO balance: ${celoBalanceConv}`)
    console.log(`${account} cUSD balance: ${cUSDBalanceConv}`)

    return { celoBalanceConv, cUSDBalanceConv }
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
    console.log("getting address func")
    // console.log('account from sgetIdentifiers: ', account)

    try {
        const response =
            await OdisUtils.PhoneNumberIdentifier.getPhoneNumberIdentifier(
                e164Number,
                account,
                authSigner,
                serviceContext
            );

        console.log('response:', response)
        const attestationsContract = await contractkit.contracts.getAttestations();
        let mapping = await attestationsContract.lookupIdentifiers([response.phoneHash]);
        console.log(`Phone hash -> address mapping: `, mapping);
        values = Object.values(mapping)[0]
        address = Object.values(Object.keys(values))
        console.log(`Phone hash -> address: `, address[address.length - 1]);
        return address[address.length - 1]

    } catch (e) {
        console.warn(e)
        return ''
    };


}

module.exports = {
    getWalletBalance,
    sendCELO
}