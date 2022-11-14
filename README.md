<!--
# ⚡ Hackathon Project Template
_This is a sample submission repository.
Please [__fork this repo__](https://help.github.com/articles/fork-a-repo/) and use this as a starting point for your hackathon project._ -->

# ⚡ CASHOUT ⚡

---

https://user-images.githubusercontent.com/50701251/201548674-c36c3e00-3e6f-452f-b066-7aae5b2b215b.mp4

---

**Cashout** is a crypto [off-ramping](https://www.babypips.com/crypto/learn/what-are-fiat-on-ramps-and-off-ramps) solution for [Sub-Saharan Africa](https://en.wikipedia.org/wiki/Sub-Saharan_Africa) .We have built an easily interactable website to allow users to cashout their crypto currency for their local fiat currency instantly.

Cashout also has is also developing an API as a Service platform that provices an API to allow other developers connect to their site for easily offramping crypto to the end users.

with the increased adoption of cryptocurrency in subsaharan africa as per this [chainalysis report](https://blog.chainalysis.com/reports/sub-saharan-africa-cryptocurrency-geography-report-2022-preview/#:~:text=Sub%2Dsaharan%20Africa%20accounts%20for,growth%20over%20the%20year%20prior.) that also indicates that 80% of micro crypto payment transactions **(transactions less that $1000)** happens in subsaharan Africa.
This provides an opportunity and market for an offramping solution as our daily lives still heavily revolve around fait currency for payment of goods and services.

The project leverages the power of the celo blockchain and smart contracts to allow users deposit funds into the [cashout smartcontract](https://alfajores.celoscan.io/address/0xdD01c2DcAf4f1899d36987A8bc7E856d48efe1D2#code) built on the alfajores celo network, Upon confirmation of the transaction. It Intiates the [flutterwave payment aggregator](developer.flutterwave.com) to make a fiat mobile money payment to the account number/phone number provided.

Flutterwave was chosen as a payment aggregator because it gives us access to the entire sub-saharan africa countries and currencies and thus was the most scalable payment aggregator we could use. It also charges a 1% fee on transactions allowing us to also charge and extra 1% - 1.5% fee. At 2% - 2.5% we are the cheapest available crypto off-ramping solution available in the market currently.

To provide Liquidity, Cashout hopes to raise capital for the initial fiat liquidity, After the first couple of transactions, The deposited crypto funds can then be withdrawn and liquidated from exchanges or otherwise then re-employed to the fiat account that is debited for making fiat payments. This way, the project iwill be self-sustaining.

The project only supports **CUSD** token type forexample this [token](https://alfajores.celoscan.io/address/0x91A794303F6A1D18Ae03ec689983568D76121E00#code) used for the demo project transactions. the rationale behind this is so as to have a more predictable price pattern and also its safer this way. Its also presumed on the basis that if people expect the value of an asset to go up, They will most probally choose to hoard it and so stable coins would be the best crypto currency they would offramp. We are open to intergrating other tokens in the future.

### PesaPay Team

1. [Elias Hezron](eliashezron23@gmail.com) solidity engineer and Project Lead
2. [Sash solidity](tedwasachin123@gmail.com) frontend engineer and UI designer

#### Hackathon Track

DEFI

##### Region location

Kampala - Uganda, AFRICA

### Bounty Technologies Used

1. [Lava rpc Nodes](https://lavanet.xyz/)
   :lava rpc nodes were used for rpc connection to the celo blockchain both on the backend hardhat file [here](https://github.com/eliashezron/pesapay/blob/9229828c017765de6ea9dca2351fed7a49ba7b22/pesapay/hardhat/hardhat.config.js#L31) and the frontend react application file [here](https://github.com/eliashezron/pesapay/blob/9229828c017765de6ea9dca2351fed7a49ba7b22/pesapay/client/src/config.js#L9)
2. [Redstone](https://app.redstone.finance/)
   :Redstone price feeds was implemented in the smart contracts [here](https://github.com/eliashezron/pesapay/blob/9229828c017765de6ea9dca2351fed7a49ba7b22/pesapay/hardhat/contracts/CashOut.sol#L57) to limit users to only deposit amounts greater than the equivalent of 10USD. Aswell ass in the frontend [here](https://github.com/eliashezron/pesapay/blob/9229828c017765de6ea9dca2351fed7a49ba7b22/pesapay/client/src/utils/depositFunction.js#L10) this is mainly because we don't want users transacting less as it gives us a better economic model that way.
3. [the graph protocol ](https://thegraph.com/en/)
   :the graph protocol was used to monitor the depositToken contract events emitted everytime a transaction is successfull. we then querry the graph to confirm that a transaction is reflected before we can make the fiat payment. here is our [subgraph](https://thegraph.com/hosted-service/subgraph/eliashezron/cashout)
4. [dapplooker](https://dapplooker.com/)
   : we used Dapplooker to visualise the data of our subgraph to monitor ttransaction and analytics. have a look at our [dapplooker schema](https://analytics.dapplooker.com/browse/2/schema/cashout)

### Other Technologies Used

1. [fait connect specification](https://github.com/fiatconnect/specification)
   after carefull detailed analysis of the fiat connect specifiaction, we modified our the solution our specific use case but yet still implement the tenets the makers of fiat connect aim to implement.

- **Auth** we did not implement the [eip4316](https://eips.ethereum.org/EIPS/eip-4361) as suggested in the specification for sessioning of the user. We also did not implemented protected routes as we did not find it neccessary. However we implemented [eip2771](https://eips.ethereum.org/EIPS/eip-2771) and openZeppelin [defender](https://docs.openzeppelin.com/defender/) to monitor `nouces`, `chainId` and all other [eip1271](https://eips.ethereum.org/EIPS/eip-1271) validation criteria.
- **quoteOut** here we implement a combination of [redstone pricefeeds](https://app.redstone.finance/#/app/tokens) and [exchange rate price Apis](https://api.exchangerate-api.com/v4/latest/USD) to get the fiat price equivalents of the crypto prices
- **KYC** We do understand that importance of KYC as a regulatory prerequiste, however we also know that many people do not love it and thus we implemented a solution that would allow us send money without the strict requirement of KYC, Flutterwave does a KYC of the business or the entity but then can allow you send your money to different mobile money accounts without the strict requirement of KYC. however, for future implementation. we shall surely do a KYC

2. [useDapps](https://usedapp-docs.netlify.app/docs/) we implemented useDapps as rapid framework for Dapp development. we added custom [celo network configurations](https://github.com/eliashezron/pesapay/blob/pesapay/pesapay/client/src/utils/celoChain.js) so as to use it on the celo blockchain aswell. I have also made a [PR](https://github.com/TrueFiEng/useDApp/pull/1017) to the [repo](https://github.com/TrueFiEng/useDApp) that has been approved and will be added to the default config in the next version.

### Project Description

currently, the only available mechanisms for cashing out include Binance's peer to peer trading. however this does not support celo tokens of CUSD and OTP trading which is expensive interms of finding a merchant and the actual fee/charge at 5-10% of the actual price.
Cashout will operate and a meer charge of 2% - 2.5% which is the lowest in the market, and with our web-based UI system and simply implementable API we are easily intergrateable to any platform or wallet making it instant and convenient.

Cashout was built with Celo social Impact in such as its [impact market](https://www.impactmarket.com/) top easily allow the end user, who receives celo's CUSD token to be able, inwallet cashout their UBI to mobile money that they can then use to purchase goods and services.

The intended users of the platform is the general public, Impact markets, corporations, international remitances of cryto currency and NGOs providing relief through crypto currency.

### usecases of cashout

these are the core reasons and motivations behind the cashout project.

1. Social Impact projects
   Cashout hopes to intergrate with impact markets projects that provide Universal basic income to locals in the subsaharan region allowing the end beneficiaries be able to easily cashout the crypto they recieve to fiat inform of mobile money to their cellphones

2. crypto Remittance
   With the increased adoption of crypto currency all over the world, we are seeing increasing cases of remittances to subsaharan africa inform of crypto currency. this also was a tenet of the bitcoin founder satoshi Nakamoto. Cashout wants to enable this reality to allow the end users to simply convert their crypto for fiat

3. Crytopayments.
   One of the major hinderance to the adoption of cryptocurrency as a form of payment is the complexity involved to liquidate your crypto for fiat. Cashouit hopes to solve this by allowing the user to easily connect their wallet and liquidate their cryto currency. And with the API being rapidily developed, cashout would allow companies and bussiness simply intergrate this solutions in their products.

#### Summary

Main feature of offRamping has been successfull implementend as implemented in the demo

#### here is our it works

The user connects their wallet to the web based UI, selects a the country they are from and the token they want to trade. inputs their mobile money number where funds should be sent and initaites the transaction.
After ERC20 approval of the allowance. the user signs an EIP712 type message containing all the details of the transaction. We implemented cashless transactions to make the transaction cheaper on the users and also as an incentive for user onboarding.

The transaction is transmitted to the relayer through the EIP2771 [context](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/metatx/ERC2771Context.sol) contract and the [forwarder](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/metatx/MinimalForwarder.sol) contract that verifies the trasaction and executes the transaction on behalf of the user. The gasfees are relayed to an [relayer](https://docs.openzeppelin.com/defender/relay) hotwallet hosted on [openZeppelin Defender](https://defender.openzeppelin.com/).We make a post request to a webHook url is connected to openzeppelin defender [autotask](https://docs.openzeppelin.com/defender/autotasks) to Automate the transaction.
Upon confirmation of the the transaction, A mobile money payment is then intiated to transfer funds to the user and a react toastify notification sent notifying the user on the progress of the transaction.

For the API, the developer transmits the parameters to the API and then it works as descriped above.

#### URLs

List any URLs relevant to demonstrating your prototype

#### Presentation

Here is the [presentation Demo Video](https://drive.google.com/file/d/1Oxmd0XB62XxKfqRDfVnKJB2LBil7fog4/view)

Here is the [Presentation Slides](https://docs.google.com/presentation/d/1Hxm5nsoAFjukMo-_meXa7dIzfZdzAFGb7fy7pRkg1cY/edit?usp=sharing)

#### Next Steps

Further development of the API to make it market reading.

#### License

This repository includes an [unlicensed](http://unlicense.org/) statement though you may want to [choose a different license](https://choosealicense.com/).
