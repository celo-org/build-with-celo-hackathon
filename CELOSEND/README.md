# ⚡ Hackathon Project Template ⚡
_This is a sample submission repository.
Please [__fork this repo__](https://help.github.com/articles/fork-a-repo/) and use this as a starting point for your hackathon project._

## Project Name

CeloSend

<img src="https://i.ibb.co/7JNY0pS/logoETH.png" width="70%">

## IMPORTANT!

## Applications

#### APK

Main App : https://general-bucket-android.s3.amazonaws.com/celosendwallet.apk

POS App : https://general-bucket-android.s3.amazonaws.com/celosendpos.apk

### Team name

CeloSend

#### Hackathon Track

ReFi

##### Region location

Mexico - CDMX

##### Team Members
- Luis Eduardo Arevalo Oliver, CEO
- Victor Alonso Altamirano Izquierdo, CTO
- Alejandro Sanchez Gutierrez, CMO

#### Project Description

Almost 4 years ago Vitálik Buterin, co founder of Ethereum posted in twitter this message:

<img src="https://i.ibb.co/ggfZWPD/vitalik.png">

At that time it grabbed the attention of almost the entire crypto space and the answers regarding that question were mostly a big “Not many if at all”. Of course, there have been isolated projects that try to work with the developed world with several big names attached, but not to much avail. Cryptocurrencies and blockchain technology from that time onwards has mostly been used by a few early adopters and some others, but were mostly already banked, educated people, even in the developing world. 

Now, let’s ask that same question today; How many unbanked have we banked by the year 2021? Despite having made great progress and having outliers like the country of El Salvador, outside of that, the progress is almost null. Most of the same people that are into crypto today have been in for years and are the same elite, educated, previously banked ones, it has not reached those who are not.   

We can say that because our team lives in one of those developing countries that countless projects try to portray as a target for financial inclusion, which is Mexico. 

And yes, Mexico is the perfect target as it is the largest issuer of remittances from the US and it will break $42Billion this year alone.  

<img src="https://cdn.howmuch.net/articles/outgoing-remittances-usa-final-8374.jpg" width="400">

Of course, remembering that the US is the biggest sender of remittances in the world.

It is important to mention that, according to the World Bank, 65% of Mexican adults do not have any type of bank account and only 10% save through a financial institution, in addition to the fact that 83% of Mexican adults do not have access to electronic payment systems. These circumstances limit the potential of the sector to place the resources of savers in productive projects that generate economic development and well-being for the population. And crypto is not doing better than the legacy system, most of the users are people like our team, tech savvy with a certain degree of education and already banked.

#### Summary

CeloSend is a Mobile-First wallet, cash out ramp and Point of Sale Superapp. We combine TradFi through Rapyd with Web3 to improve Financial Inclusion in Mexico and Latin America.

# Solution

CeloSend is a Mobile-First wallet, cash out ramp and Point of Sale Superapp. We combine TradFi through Rapyd with Web3 to improve Financial Inclusion in Mexico and LATAM

System's Architecture:

<img src="https://i.ibb.co/Pxw0vk3/scheme-drawio-1.png">

- All CELO transactions are controlled through [web3.js](https://web3js.readthedocs.io/en/v1.8.0/) and [WalletConnect](https://walletconnect.com/) on mainnet.

- Thanks to the Rapyd APIs we can manage users, checkout, swap and KYC of our app. (https://www.rapyd.net/)

# Main App Screens:

<img src="https://i.ibb.co/zXjkhpX/vlcsnap-2022-10-29-10h33m51s957.png" width="32%">

- In turn, through Rapyd and Celo we can have total control of the movements and transactions of our account in both Crypto and Fiat.

- Crypto

 <img src="https://i.ibb.co/DQn9fwq/vlcsnap-2022-10-29-10h34m09s518.png" width="32%"> <img src="https://i.ibb.co/K24b9GR/vlcsnap-2022-10-29-10h34m13s837.png" width="32%"> <img src="https://i.ibb.co/xqhBKd0/vlcsnap-2022-11-03-10h10m18s017.png" width="32%">

- Fiat

<img src="https://i.ibb.co/gZvVg92/vlcsnap-2022-10-29-10h34m46s997.png" width="32%"> <img src="https://i.ibb.co/9w6Jbyr/vlcsnap-2022-10-29-10h34m52s368.png" width="32%"> <img src="https://i.ibb.co/nzn2Szg/vlcsnap-2022-10-29-10h35m22s443.png" width="32%">

- The KYC of our application is controlled by Rapyd and to confirm it, the documents must match the user's registration.
  
  <img src="https://i.ibb.co/VLd2Jm8/vlcsnap-2022-10-29-10h42m00s764.png" width="32%">

- Through Celo we can also make transfers directly between Celo Wallets.

  - First we must click on the pay button.
  
    <img src="https://i.ibb.co/pWVsx4f/vlcsnap-2022-10-29-10h34m09s518.png" width="32%">

  - We must select if we want to Recieve or Scan/NFC (by default the app opens the Recieve option). In the case of this main app, payment is allowed through NFC to our POS as part of the adoption of this technology in traditional payments.
  
    <img src="https://i.ibb.co/K24b9GR/vlcsnap-2022-10-29-10h34m13s837.png" width="32%">
    <img src="https://i.ibb.co/x3sLpw1/vlcsnap-2022-10-29-10h46m43s392.png" width="32%">

  - In the case of Scan/NFC, we open a QR scanner which will take us through a very simple transfer process, each transaction needs biometric or pin confirmation.

    <img src="https://i.ibb.co/X78F0tL/vlcsnap-2022-10-29-10h49m47s015.png" width="32%">
    <img src="https://i.ibb.co/5GX4nxL/vlcsnap-2022-10-29-10h50m14s018.png" width="32%">
    <img src="https://i.ibb.co/R6BftGQ/vlcsnap-2022-10-29-10h50m51s965.png" width="32%">

- We carry out Celo and Fiat transfers by coordinating the services of Celo and Rapyd. Transferring the equivalent of CELO or USD currency from CeloSend Master accounts.

  <img src="https://i.ibb.co/sm7VH9X/vlcsnap-2022-10-29-10h35m54s612.png" width="32%">

- At the same time, we can obtain a virtual card from the Rapyd API to be able to spend the money from our Fiat account directly.

  <img src="https://i.ibb.co/sjLHdXD/vlcsnap-2022-10-29-10h35m12s227.png" width="32%"> 

- This is a screenshot of our backend in Rapyd.

  <img src="https://i.ibb.co/vXD3Hzf/image.png">

# Point of Sale application:

- The Point of Sale application is more focused on the simple reception of payments and an interface focused on generating payment orders through QR or NFC.

- The POS allows us to see the Crypto and Fiat balances received along with the list of transactions just like the Main App.

  <img src="https://i.ibb.co/Y84BpwN/Screenshot-20221029-110055.png" width="32%">
  <img src="https://i.ibb.co/yVmWzwG/Screenshot-20221029-110101.png" width="32%">

- One of the most important processes is being able to make payments at the POS through WalletConnect, being this the pillar of our device.

  <img src="https://i.ibb.co/fDwg2Pt/image.png" width="32%">
  <img src="https://i.ibb.co/qCd6Ngn/image.png" width="32%">
  <img src="https://i.ibb.co/K5b6Hy4/image.png" width="32%">

- When the reference is created by QR, it can be paid through any wallet compatible with WalletConnect, however our Main App also allows payment through NFC.

  - Main App / POS App:
  
    <img src="https://i.ibb.co/xFSS7tK/image.png" width="32%">
    <img src="https://i.ibb.co/SfjnCcT/image.png" width="32%">

- Once the reference payment has been made, we will be able to see the confirmed and verified messages.

- In addition, we provide a printed receipt with the URL where you can check your transaction.

  <img src="https://i.ibb.co/JvvxPwc/image.png" width="32%">

- Let's print!

#### URLs
List any URLs relevant to demonstrating your prototype

#### Presentation
List any links to your presentation or any related visuals you want to share.

Here is our main demo video: 

[![Demo](https://i.ibb.co/g4W3ypx/image.png)](Pending)

#### Next Steps

This application is directed at those who cannot benefit directly from cryptocurrency. It has the usual, both crypto and fiat wallets, transfers between crypto and fiat, transfers between crypto accounts and it gives a spin on the cash in - cash out portion of the equation as no other project provides it. It is very important if this application is going to benefit and bank people to be very agile and compatible with FIAT at least until crypto reaches mass market. Most of the developed world has not even incorporated to legacy electronic systems. In addition to that the incorporation of a Point of Sale thought mainly for SMEs is something that can be key in augmenting the change for further adoption. 

I think we can make the jump from those systems almost directly to self-banking, such as the jump that was made in some parts of Africa and even here in Latin America from skipping telephone landlines directly to Mobile phones. If that jump was made from that type of technology this one can be analogous and possible. 

Perhaps the most important feedback we have obtained is that we have to show how our application will ensure the enforcement of anti-laundering laws. 

We will do that will strong KYC. And at the same time Mexico has published since 2018 strong laws to manage that including its fintech law.

https://en.legalparadox.com/post/the-definitive-guide-mexican-fintech-law-a-look-3-years-after-its-publication#:~:text=The%20Mexican%20FinTech%20Law%20was,as%20Artificial%20Intelligence%2C%20Blockchain%2C%20collaborative

Quoting: " The Mexican FinTech Law was one of the first regulatory bodies created specifically to promote innovation, the transformation of traditional banking and credit financial services that would even allow the possibility of incorporating exponential technology such as Artificial Intelligence, Blockchain, collaborative economies and peer-to-peer financial services in secure regulatory spaces. "

All of this was a silent revolution that happened in this jurisdiction after the HSBC money-laundering scandal that included cartels and some other nefarious individuals. 
https://www.investopedia.com/stock-analysis/2013/investing-news-for-jan-29-hsbcs-money-laundering-scandal-hbc-scbff-ing-cs-rbs0129.aspx

Thus, the need for Decentralized solutions.

Security and identity verification of the clients who use the app is paramount for us, and to thrive in this market we need this to emulate incumbents such as Bitso. We think our technology is mature enough if we compare with these incumbents and much safer. 

Regarding the application we would like to test it with real Capital perhaps in Q4 2022.

Hopefully you liked the Mobile DApp and Point of Sale.

#### License
This repository includes an [unlicensed](http://unlicense.org/) statement though you may want to [choose a different license](https://choosealicense.com/).
