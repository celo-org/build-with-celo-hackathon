<!--
# ⚡ Hackathon Project Template
_This is a sample submission repository.
Please [__fork this repo__](https://help.github.com/articles/fork-a-repo/) and use this as a starting point for your hackathon project._ -->

# ⚡ CASHOUT ⚡

Cashout is a crypto offramping solution for subsaharan Africa. We have built an easily interactable website to allow users to cashout their crypto currency for their local fiat currency instantinously.

Cashout also has is also an API as a Service platform that provices an API to allow other developers connect to their site for easily offramping crypto to the end users.

### PesaPay Team

#### Hackathon Track

##### Region location

Kampala -Uganda

##### Team Members

- Elias Hezron, solidity engineer and Project Lead
- Sash, solidity and frontend engineer

#### Project Description

Currently, with the increased popularity of crypto payments and adoption of cryptocurrencies, there is an increasing demand for avenues to be able to liquidate the crypto currency for actual fiat.
CASHOUT Project is aimed at helping people to be able to cashout their crypto for fiat currency through our web-based platform aswell as our easy to use API that developers and other builders can use to easily oframp funds to their end user.

currently, the only available mechanisms for cashing out include Binance's peer to peer trading. however this does nit support celo tokens of CUSD and OTP trading which is expensive interms of finding a merchant and the actual fee/charge at 5-10% of the actual price.
Cashout will operate and a meer charge of 2% which is the lowest in the market, and with ourwebbased UI system and simply implementable API we are easily intergrateable to any platform or wallet meking it instant and convinient.

Cashout was built with Celo social Impact in such as its impact markets top easily allow the end user, who receives celo's CUSD token to beable, inwallet cashout their UBI to mobile money that they can then use to purchase goods and services.

The intended users of the platform is the general public, Impact markets, corporations, internation remitances info of cryto currency and NGOs proving relief through crypto currency.

#### Summary

Main feature of offRamping has been successfull implementend.

#### here is our it works

The user connects their wallet to the web based UI, selects a the country they are from and the token they want to trade. inputs their mobile money number where funds should be sent and initaites the transaction.
After ERC20 approval of the allowance. the user signs an EIP712 type message containing all the details of the transaction. We implemented cashless transactions to make the transaction cheaper on the users.

The transaction is transmitted to the relayer through the EIP2771 context.forwarer verifies the tranaction and then executes the transaction on behalf of the user. Upon confirmation of the the transaction, A mobile money payment is intiated to transfer funds to the user and a react toastify notification sent notifying the user of the progress of the transaction.

For the API, the developer transmits the parameters to the API and then it works as descriped above.

#### URLs

List any URLs relevant to demonstrating your prototype

#### Presentation

List any links to your presentation or any related visuals you want to share.

#### Next Steps

What do you need to do next to turn this prototype into a working solution?

#### License

This repository includes an [unlicensed](http://unlicense.org/) statement though you may want to [choose a different license](https://choosealicense.com/).
