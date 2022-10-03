const ContractKit = require("@celo/contractkit");
const Web3 = require("web3");
const OdisUtils = require("@celo/identity").OdisUtils;
const privateKeyToAddress =
  require("@celo/utils/lib/address").privateKeyToAddress;
const normalizeAddressWith0x =
  require("@celo/utils/lib/address").normalizeAddressWith0x;
const extractAttestationCodeFromMessage =
  require("@celo/utils/lib/attestations").extractAttestationCodeFromMessage;

require("dotenv").config();

const delay = ms => new Promise(res => setTimeout(res, ms));

let networkURL,
  phoneHash,
  pepper,
  contractkit,
  account,
  web3,
  phoneNumber,
  network;


// setup web3, contractkit, add private key to contractkit
async function init() {
  web3 = new Web3("https://alfajores-forno.celo-testnet.org");
  contractkit = ContractKit.newKitFromWeb3(web3);
  contractkit.connection.addAccount(process.env.PRIVATE_KEY);
  account = normalizeAddressWith0x(
    privateKeyToAddress(process.env.PRIVATE_KEY)
  );
  contractkit.connection.defaultAccount = account;
  console.log('contractkit account', contractkit.defaultAccount);
  const balance = await contractkit.celoTokens.balancesOf(account);
  console.log('Celo balance', balance.CELO.toFixed());
  console.log('cUSD balance', balance.cUSD.toFixed());
}

async function sendTransaction() {
  let amount = contractkit.web3.utils.toWei("0.000000000000000001", "ether")

  // let goldtoken = await contractkit.contracts.getGoldToken()
  let stabletoken = await contractkit.contracts.getStableToken()
  // let celotx = await goldtoken.transfer(anAddress, amount).send({ from: account })
  let cUSDtx = await stabletoken.transfer("0xff407db55e8cf328e253bb75e8e3734a72bd2b34", amount).send({ from: account, feeCurrency: stabletoken.address })

  // let celoReceipt = await celotx.waitReceipt()
  let cUSDReceipt = await cUSDtx.waitReceipt()
}

// lookup phone number from ODIS, get the identifier (pepper) and phone number hash
async function getHashAndPepper() {
  console.log('Phone Number:', phoneNumber);
  const response = await lookup();
  pepper = response.pepper;
  phoneHash = response.phoneHash;
  console.log(`Pepper: ${pepper}`);
  console.log(`Phone hash: ${phoneHash}`);
}

async function getIdentifiers() {
  const attestationsContract = await contractkit.contracts.getAttestations();
  let mapping = await attestationsContract.lookupIdentifiers([phoneHash]);
  console.log(`Phone hash -> address mapping: `, mapping);
}

// request verification codes from ODIS
async function requestCodes() {
  const attestationsContract = await contractkit.contracts.getAttestations();

  /**
   * Approves the necessary amount of StableToken to request Attestations
   * @param attestationsRequested The number of attestations to request
   */
  const approve = await attestationsContract.approveAttestationFee(3);
  await approve.sendAndWaitForReceipt();

  /**
   * Requests a new attestation
   * @param identifier Attestation identifier (e.g. phone hash)
   * @param attestationsRequested The number of attestations to request
   */
  let request = await attestationsContract.request(phoneHash, 3);
  let requestReceipt = await request.sendAndWaitForReceipt();
  console.log(`Request receipt: `, requestReceipt);

  /**
   * Waits appropriate number of blocks, then selects issuers for previously requested phone number attestations
   * @param identifier Attestation identifier (e.g. phone hash)
   * @param account Address of the account
   */
  const selectIssuers = await attestationsContract.selectIssuersAfterWait(
    phoneHash,
    account
  );
  let issuers = await selectIssuers.sendAndWaitForReceipt();
  console.log(`Issuers:`, issuers);

  /**
   * Returns the attestation stats of a identifer/account pair
   * @param identifier Attestation identifier (e.g. phone hash)
   * @param account Address of the account
   */
  const stats = await attestationsContract.getAttestationStat(
    phoneHash,
    account
  );
  console.log(stats);

  let attestationsToComplete =
    await attestationsContract.getActionableAttestations(phoneHash, account);
  console.info(attestationsToComplete);

  // reveal the phone number to the issuer
  // https://celo-sdk-docs.readthedocs.io/en/latest/contractkit/classes/_wrappers_attestations_.attestationswrapper/#revealphonenumbertoissuer
  console.log(
    "Responses",
    await Promise.all(attestationsToComplete.map(postAttestationRequest))
  );
}

const postAttestationRequest = async (attestationToComplete) => {
  const attestations = await contractkit.contracts.getAttestations();

  const requestBody = {
    phoneNumber,
    account: account,
    issuer: attestationToComplete.issuer,
    salt: pepper,
    smsRetrieverAppSig: undefined,
    language: "en",
    securityCodePrefix: getSecurityPrefix(attestationToComplete),
  };
  console.log("Attestation Request Body: ", requestBody);
  const response = await attestations.revealPhoneNumberToIssuer(
    attestationToComplete.attestationServiceURL,
    requestBody
  );
  return response.json();
};

// verify an attestation request with the given code

async function verify(contractkit, base64Code) {
  const attestationsWrapper = await contractkit.contracts.getAttestations();

  let attestationsToComplete =
    await attestationsWrapper.getActionableAttestations(phoneHash, account);

  const prefix = base64Code.substring(0, 1);

  const respondingService = attestationsToComplete.filter(
    (attestationToComplete) =>
      getSecurityPrefix(attestationToComplete).toString() === prefix
  );

  if (respondingService.length === 1) {
    const getAttestationRequest = {
      account: account,
      issuer: respondingService[0].issuer,
      phoneNumber: phoneNumber,
      salt: pepper,
      securityCode: base64Code.substring(1),
    };
    try {
      const attestation =
        await attestationsWrapper.getAttestationForSecurityCode(
          respondingService[0].attestationServiceURL,
          getAttestationRequest,
          account
        );
      console.log("Attestation: ", attestation);
      const code = extractAttestationCodeFromMessage(attestation);
      if (code) {
        console.log("Extracted code: ", code);
        const matchingIssuer = await attestationsWrapper.findMatchingIssuer(
          phoneHash,
          account,
          code,
          attestationsToComplete.map((a) => a.issuer)
        );
        if (matchingIssuer === null) {
          console.warn("No matching issuer found for code");
          resolve(null);
          return;
        }
        const isValidRequest =
          await attestationsWrapper.validateAttestationCode(
            phoneHash,
            account,
            matchingIssuer,
            code
          );
        if (!isValidRequest) {
          console.warn("Code was not valid");
          resolve(null);
          return;
        }
        const completeResult = await attestationsWrapper.complete(
          phoneHash,
          account,
          matchingIssuer,
          code
        );
        const receipt = await completeResult.sendAndWaitForReceipt();
        console.log(receipt);
      } else {
        console.error("extracted code is null");
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    console.log("respondingService:", respondingService);
    console.log("Prefix does not match any issuers");
  }
}

// NOTE: this is currently a janky way of getting a prefix code for alfajores, need to update for mainnet
const getSecurityPrefix = (attestationToComplete) =>
  attestationToComplete.name[10];

// lookup the phoneHash and pepper for given account
async function lookup() {
  let odisUrl, odisPubKey;

  const authSigner = {
    authenticationMethod: OdisUtils.Query.AuthenticationMethod.WALLET_KEY,
    contractKit: contractkit,
  };

  odisUrl =
    "https://us-central1-celo-phone-number-privacy.cloudfunctions.net";
  odisPubKey =
    "kPoRxWdEdZ/Nd3uQnp3FJFs54zuiS+ksqvOm9x8vY6KHPG8jrfqysvIRU0wtqYsBKA7SoAsICMBv8C/Fb2ZpDOqhSqvr/sZbZoHmQfvbqrzbtDIPvUIrHgRS0ydJCMsA";

  const serviceContext = {
    odisUrl,
    odisPubKey,
  };

  const response =
    await OdisUtils.PhoneNumberIdentifier.getPhoneNumberIdentifier(
      phoneNumber,
      account,
      authSigner,
      serviceContext
    );

  return response;
}

// register an account with Accounts.sol and register the associated wallet
// This is a necessary step for ODIS to resolve wallet addresses correctly
async function registerAccountAndWallet() {
  const accountsContract = await contractkit.contracts.getAccounts();

  // register account if needed
  let registeredAccount = await accountsContract.isAccount(account);
  if (!registeredAccount) {
    console.log("Registering account");
    await accountsContract.createAccount().send();
  }

  // register wallet if needed
  let registeredWalletAddress = await accountsContract.getWalletAddress(
    account
  );
  console.log("Wallet address: ", registeredWalletAddress);
  if (registeredWalletAddress == "0x0000000000000000000000000000000000000000") {
    console.log(
      `Setting account's wallet address in Accounts.sol to ${account}`
    );
    try {
      const setWalletTx = await accountsContract.setWalletAddress(account);
      await setWalletTx.sendAndWaitForReceipt();

    }
    catch (e) {
      console.log("Retrying...")
      const setWalletTx = await accountsContract.setWalletAddress(account);
      await setWalletTx.sendAndWaitForReceipt();
    }

  }
}

// helper function to disable certain component when testing
async function main() {
  phoneNumber = "+2348057922485"

  await init();
  // await sendTransaction();
  await delay(100000);
  await registerAccountAndWallet();
  await getHashAndPepper();
  await getIdentifiers();
  // await requestCodes();
  // let code1 = await ask("Enter first code: ");
  // await verify(contractkit, code1);
  // let code2 = await ask("Enter second code: ");
  // await verify(contractkit, code2);
  // let code3 = await ask("Enter third code: ");
  // await verify(contractkit, code3);
  // await getIdentifiers();
}

main();
