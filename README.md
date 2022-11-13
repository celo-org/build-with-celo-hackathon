<!--
# ⚡ Hackathon Project Template
_This is a sample submission repository.
Please [__fork this repo__](https://help.github.com/articles/fork-a-repo/) and use this as a starting point for your hackathon project._ -->

# ⚡ CASHOUT ⚡

---

    ![cashout demo video](https://user-images.githubusercontent.com/50701251/201548674-c36c3e00-3e6f-452f-b066-7aae5b2b215b.mp4)

---

Cashout is a crypto offramping solution for subsaharan Africa. We have built an easily interactable website to allow users to cashout their crypto currency for their local fiat currency instantly.

Cashout also has is also developing an API as a Service platform that provices an API to allow other developers connect to their site for easily offramping crypto to the end users.

with the increased adoption of cryptocurrency in subsaharan africa as per this [chainalysis report](https://blog.chainalysis.com/reports/sub-saharan-africa-cryptocurrency-geography-report-2022-preview/#:~:text=Sub%2Dsaharan%20Africa%20accounts%20for,growth%20over%20the%20year%20prior.) that also indicates that 80% of micro crpto payment transactions **(transactions less that $1000)** happens in subsaharan Africa.
This provides an opportunity and market for an offramping solution as our daily lifes still heavily revolve around fait currency for payment of goods and services.

The project leverages the power of the celo blockchain and smart contracts to allow users deposit funds into the wallet/vault, upon confirmation of the transaction. It fires [flutterwave payment aggregator](developer.flutterwave.com) to make a fait mobile money payment to the account number/phone number provided.
The project only supports **CUSD** transactions as its a popular stable celo currency and also less likelyhood of users hoarding on to it since its value is pegged to 1USD

### PesaPay Team

1. [Elias Hezron](eliashezron23@gmail.com) solidity engineer and Project Lead
2. [Sash solidity](tedwasachin123@gmail.com) and frontend engineer

#### Hackathon Track

DEFI

##### Region location

Kampala -Uganda

### Bounty Technologies Used

1. [Lava rpc Nodes](https://lavanet.xyz/)
   :lava rpc nodes were used for rpc connection to the celo blockchain both on the backend hardhat file and the frontend react applivcation file.
2. [Redstone](https://app.redstone.finance/)
   :Redstone price feeds was implemented in the smart contracts to limit users to only deposit amounts greater than the equivalent of 10USD. this is mainly because we don't want users transacting less as it gives us a better economic model that way.
3. [the graph protocol ](https://thegraph.com/en/)
   :the graph protocol was used to monitor the depositToken contract events emitted everytime a transaction is successfull. we then querry the graph to confirm that a transaction is reflected before we can make the fiat payment. here is our [subgraph](https://thegraph.com/hosted-service/subgraph/eliashezron/cashout)
4. [dapplooker](https://dapplooker.com/)
   : we used Dapplooker to visualise the data of our subgraph to monitor ttransaction and analytics. have a look at our [dapplooker schema](https://analytics.dapplooker.com/browse/2/schema/cashout)

### Other Technologies Used

1. [fait connect specification](https://github.com/fiatconnect/specification)
   after carefull detailed analysics of the fiat connect specifiaction, we drafted the solution to modify our specific use case but yet still implement the tenets the makers of fiat connect aim to implement.

- **Auth** we didnot implement the [eip4316](https://eips.ethereum.org/EIPS/eip-4361) and sessioning of the user. We also did not implemented protected routes as we did not find it neccessary. However we implement [eip2771](https://eips.ethereum.org/EIPS/eip-2771) and openZeppelin defender to monitor `nouces`, `chainId` and all other [eip1271](https://eips.ethereum.org/EIPS/eip-1271) validation criteria.
- **quoteOut** here we implement a combination of redstone pricefeeds and [exchange rate price Apis](https://api.exchangerate-api.com/v4/latest/USD) to get the fiat price equivalents of the crypto prices
- **KYC** We do understand that importance of KYC as a regulatory prerequiste, however we also know that many people do not love it and thus we implemented a solution that would alwo us send money without the strict requirement of KYC, however, for future implentation. we shall surely do a KYC

2. [useDapps](https://usedapp-docs.netlify.app/docs/) we implemented useDapps as rapid framework for Dapp development. we added custom celo network configurations so as to use it on the celo blockchain aswell. I have also made a [PR](https://github.com/TrueFiEng/useDApp/pull/1017) to the [repo](https://github.com/TrueFiEng/useDApp) that has been approved and will be added to the default config.

### Project Description

currently, the only available mechanisms for cashing out include Binance's peer to peer trading. however this does not support celo tokens of CUSD and OTP trading which is expensive interms of finding a merchant and the actual fee/charge at 5-10% of the actual price.
Cashout will operate and a meer charge of 2% which is the lowest in the market, and with ourwebbased UI system and simply implementable API we are easily intergrateable to any platform or wallet meking it instant and convinient.

Cashout was built with Celo social Impact in such as its impact markets top easily allow the end user, who receives celo's CUSD token to beable, inwallet cashout their UBI to mobile money that they can then use to purchase goods and services.

The intended users of the platform is the general public, Impact markets, corporations, internation remitances info of cryto currency and NGOs proving relief through crypto currency.

### usecases of cashout

these are the core reasons and motivations behind the cashout project.

1. Social Impact projects
   Cashout hopes to intergrate with impact markets projects that provide Universal basic income to locals in the subsaharan region allowing the end beneficiaries be able to easily cashout the crypto they recieve to fait inform of mobile money to their cellphones

2. crypto Remittance
   with the increased adoption of crypto currency allover the world, we are seeing increasing cases of remittances to subsaharan africa inform of crypto currency. this also was a tenet of the bitcoin founder satoshi Nakamoto. Cashout wants to enable this reality to allow the end users to simply convert their crypto for fiat

3. Crytopayments.
   One of the major hinderance to the adoption of cryptocurrency as a form of payment is the complexty involved to liquidate your crypto for fiat. Cashouit hopes to solve this by allowing the user to easily connect their wallet and liquidate their cryto currency. And with the API being rapidily developed, cashout would allow companies and bussiness simply intergrate this solutions in their products.

#### Summary

Main feature of offRamping has been successfull implementend as implemented in the demo

#### here is our it works

The user connects their wallet to the web based UI, selects a the country they are from and the token they want to trade. inputs their mobile money number where funds should be sent and initaites the transaction.
After ERC20 approval of the allowance. the user signs an EIP712 type message containing all the details of the transaction. We implemented cashless transactions to make the transaction cheaper on the users and also as an incentive for user onboarding.

The transaction is transmitted to the relayer through the EIP2771 context forwarer contract that verifies the trasaction and executes the transaction on behalf of the user the gasfees are relayed to an realyer hotwallet hosted on [openZeppelin Defender](https://defender.openzeppelin.com/#/relay). Upon confirmation of the the transaction, A mobile money payment is intiated to transfer funds to the user and a react toastify notification sent notifying the user on the progress of the transaction.

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
