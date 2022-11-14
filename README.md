# amaDAO


## Project Name: amaDAO - Regenerative protocol for 'work'
### Team name: amaDAO
#### Hackathon Track: DAO, ReFi

##### Region: Queensland, Australia.

##### Team Members
- Nathan Challen - Fullstack / Blockchain 
- Venkatesh Lingampally - Mobile Dev
- Benji Chimex - Widget Dev 

## Project Description

#### Background

As a knowledge worker, whether you are on your laptop in a coffee shop or in a CBD office tower.  Your work is generating carbon emissions: the power for your computer, the lights overhead, the coffee and energy you consume. It may seem insignificant yet considering it is how most adults globally spend more than one third of their day it's effect is insidious.  Stop and think about this for one minute... If we could measure and offset this carbon what impact would it have on the world?  

> With 1 Billion knowledge workers worldwide and 3 Tonnes of carbon per worker we could offset 10% of the world's carbon for a small percent on every dollar.  

Since COVID-19 and the *Great Resignation* swept the globe; the dynamics of employment have changed.  Workers have more power - they choose to be less in the office, more at home.  Individuals are working for multiple companies, freelancing, exploring DAOs.   Simultaneously, *Climate Change* is making a visible impact on the world.  Over the last years here in Australia we've had devastating wildfires, abnormal rainfall resulting in mass flooding, in Europe heatwaves and in the Americas drought. As I write, 'the worst humanitarian disaster' in the decade is happening with mass flooding in Pakistan.   

At amaDAO we obsess about 'work' as a construct. What it means to 'work'. In particular, our deepest obsession is with motivation.  That is, we ask deep questions about why people work? and how can we use technology to supercharge intrinsic motivation?  Our founders have created products in the future of work domain for the last 6 years around payments and remote work. For the last 18 months we've narrowed focus on DAOs and blockchain protocols.  We believe those who contribute to DAOs are at the peak of intrinsic motivation pyramid.  

Our vision is a work protocol and native token encapsulating all aspects of motivation for benefit beyond mere utility of payment exchange.     

#### Phase 1 MVP

The immediate application and market will be Knowledge workers in DAOs.  However, even this simple dApp would perform very well and have wide appeal on Product Hunt and App Stores as a standalone app.  Users of the app will be doubly incentivised:

1/ **Intrinsic Motivation** - personal development of self discipline to remain focused on one task at a time; paired with:

2/ **Environmental Reward** - knowing each hour they remained focused the sponsor is reversing their carbon imprint.

The team has developed tools native mobile apps, timer tools, reporting systems and smart contracts all of which qualify the ability to deliver on the project in an MVP timeframe.   
Nathan Challen (Co-founder) has previously won the Silver Kitty in the Environment category for GreenHabit.

#### Phase 2 Protocol

In DAO forums we've witnessed discussions relating to a movement toward the formation of "Labour DAOs" with new rules for engagement with the members.  Following the great resignation and labor shortages, workers have new found power in new ways - this new form of DAO is an interesting idea.  Imagine a future where an individual or organisation would only accept payment for work in a token that had offsets embedded?  Taking this further, a graphic artist could set an offset at an extra rate to permit coverage for their energy hungry GPUs.      

In Phase 2, we'll wrap stable coins of various denominations (cUSD to start) with a 'green' prefix.  For example: "cgUSD" is a green Celo USD with embedded carbon offset.  This would enable exchange of the token to be used across the ecosystem and open up applications in other industries not limited to knowledge work. Across the Celo ecosystem (and ultimately beyond) environmental contribution could be measured independent of our smart contracts by scanning transactions in our tokens.

Within knowledgework, we'll provide tools to demonstrate immediate application of the protocol.  For example: the amaDAO web3 CV will include a true green contribution value.  This would provide visibility and transparency to green DAOs looking to employ green workers and similarly, green workers looking to join green DAOs.  We'll look for partners to integrate the new protocol in similar and innovative ways.

Integrating our tokens with Valora wallet would enable listing and payment for green jobs.

#### Phase 3 DAO

We'll formulate a DAO whereby members vote on new providers to the ecosystem that affect our protocol. Decision makers vote to approve sponsors, new members and dWork DAO tools we permit to contribute hours or invoices.


## Implementation

**MVP Mobile App** - The primary function of the user facing App will be a timer utilising the [Pomodoro Technique](https://en.wikipedia.org/wiki/Pomodoro_Technique).  The benefit of this technique for our application is that it requires the user to interact each half hour.  This provides a tightly coupled time tracking experience allowing us to keep an accurate account of the hours.  Sponsors also benefit in that their green brand can appear to the user frequently.  The user is reminded as to who is paying the offset of the carbon for the hours worked and the sponsor's green message and action contained.

The app will be developed in Flutter and made available across the app stores on iOS and Android.

**Celo EVM Smart Contracts** - The app will interact directly, committing work each 30mins to the Celo blockchain ledger.  Paired with the duration will be the Sponsor wallet address.  Sponsor addresses will be made public for verification purposes.  Our smart contract will autonomously trigger an exchange to our partner to offset carbon accumulating from the tracked hours. Sponsors will buy tokens in advance.  

**API and Server logic** - Pairs the users' work session with a Sponsor.  If the user is working for an Organisation, the sponsor is likely to be that organisation. Otherwise, an algorithm will determine the most suitable sponsor.  There is potential for an open market for sponsors to bid for users' attention based upon the work type and market.  

**Verification Widget** - the widget produces an SVG text image (A similar approach to GitHub verifications) containing the summary of the sponsors on chain data.  An embed tool will provide a copy/paste for the Javascript to embed the widget on any website.  A user who clicks on the widget will be shown the block scan data associated with the value.  

**Sponsor dApp** - sponsors can access a dApp dashboard to purchase tokens. The dashboard will present the impact their sponsorship has made.    

**NFT Badges & awards** - users and sponsors will be presented on leaderboards.  Further, users will receive NFTs for at various stages and for leaderboard placings.  



#### URLs

*Hacker Earth*
https://build-with-celo.hackerearth.com/challenges/hackathon/celo-hackathon/dashboard/d7ab6fc/idea/draft/work3-a-regen-protocol-for-hours-worked/

*GitHub*
https://github.com/oespn/amaDAO-build-with-celo-hackathon

*Sponsor Site*
Note: Sponsorships will be added by our team.  However, you can view existing sponsorships, the escrows and badges here:

https://ama-dao-refi-work.vercel.app/


![amaDAO-Timer-Site-Demo](https://user-images.githubusercontent.com/42083185/201580041-8b4b2322-6886-4e92-bae5-8eb2729c5a4f.gif)




#### Presentation

[![Presso video](https://img.youtube.com/vi/2rpQVP5QLfk/maxresdefault.jpg)](http://www.youtube.com/watch?v=2rpQVP5QLfk "Refi Work on Celo")

https://youtu.be/2rpQVP5QLfk

### Week Ending: 30 Sept 22

- [x] Interaction & Swimlanes Diagrams - https://github.com/celo-org/build-with-celo-hackathon/commit/84dcc37f969f437971c67445bef21de275d4a641
- [x] Draft of Tree Token - https://github.com/celo-org/build-with-celo-hackathon/commit/bed6bb69373f7c896eb00a24a85c6c445b6d75e6
- [x] Draft Sponsor Escrow Contract with Faucet - https://github.com/celo-org/build-with-celo-hackathon/commit/0cfeee47a7eadef0e7fa7e7a27b47193bfa216c6
- [x] Draft of Pomodoro App logic - https://github.com/celo-org/build-with-celo-hackathon/commit/6c55446341430ccdc58bc09daeecd9ad9f6ecf28

### Week Ending: 06 Oct 22

- [x] Designs for App - https://github.com/celo-org/build-with-celo-hackathon/pull/10/commits/18a2964b2e2df986a0f4b08c4c9d6c7329011d08
- [x] New hardhat TS setup - https://github.com/celo-org/build-with-celo-hackathon/pull/10/commits/3549ead3ebdd3f896c83aa99626f7a23af0778d7
- [x] Test case coverage 50% - https://github.com/celo-org/build-with-celo-hackathon/pull/10/commits/7187452ccd3ee2f5f650d41f8ef54350a65f3e48
- [x] Started evaluation of Toucan 

### Week Ending: 15 Oct 22

- [x] Onboard new team members 
- [x] Designs for Widget - https://github.com/celo-org/build-with-celo-hackathon/commit/d4695fb5a7796907b157741fea97e99ed1ed0344
- [x] Added flows to Timer app - https://github.com/celo-org/build-with-celo-hackathon/commit/f24d80d6d56a2352e0630c425d4fc509b3895b07
- [x] Add wallet connect to Timer app - https://github.com/celo-org/build-with-celo-hackathon/commit/8f654816e894f7045d72dd8a4e8d170c6ec8842d

### Week Ending: 23 Oct 22

- [x] Sum sponsor escrows - https://github.com/celo-org/build-with-celo-hackathon/commit/d4695fb5a7796907b157741fea97e99ed1ed0344
- [x] Sum sponsor testcase - https://github.com/celo-org/build-with-celo-hackathon/commit/f24d80d6d56a2352e0630c425d4fc509b3895b07

### Week Ending: 01 Nov 22

- [x] Setup Smart contract read for Widget - https://github.com/celo-org/build-with-celo-hackathon/commit/d4695fb5a7796907b157741fea97e99ed1ed0344
- [x] SVG generator backend for Widget - https://github.com/celo-org/build-with-celo-hackathon/commit/f24d80d6d56a2352e0630c425d4fc509b3895b07
- [x] Deploy to Alfajores from hardhat - https://github.com/celo-org/build-with-celo-hackathon/commit/93a4f5b3e6cb676d67ccffc7d3e72ae3ae819bd4

### Week Ending: 14 Nov 22

- [x] App faucet - https://github.com/oespn/amaDAO-build-with-celo-hackathon/commit/d292d88904c7d447a8de3bdef51a7bed8fccc678
- [x] Integrated Toucan - https://github.com/oespn/amaDAO-build-with-celo-hackathon/commit/dd9d27f323af396484e1228e8defface092b6272
- [x] Front-end for widgets  - https://github.com/oespn/amaDAO-build-with-celo-hackathon/commit/2fda09a4ab34bf180f99e67d7a5e3710f0e32172
- [x] Traversal of sponsorships - https://github.com/oespn/amaDAO-build-with-celo-hackathon/commit/9fd0c9ddfd2e8ea6cba46239d1e0b2e3836efd4d



#### License
GPLv3
