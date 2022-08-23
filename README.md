# ⚡ Build with Celo Hackathon ⚡ 

Build with Celo Hackathon is a three (3) phase hackathon event focused on Regenerative Finance (#ReFi) within DAOs, NFTs, Gaming (GameFi), Social Impact (SocialFI) and developer tooling/infrastructure on the Celo platform.

## Hackathon Tracks: 

 - __DAO Track:__ 
    - Build decentralized web applications facilitating DAOs within ReFi, ReFi DAO Tools, and ReFi DAO Infrastructure.
 - __NFT, Gaming and Creator Track:__ 
 	- Build an application incorporating ReFi, ReFi creators tools, and ReFi creators infrastructure
 - __Social Impact Track:__ 
 	- Build a decentralized web applications focused on social impact within ReFi, Social impact ReFi Tools, and Social impact ReFi Infrastructure
 

## Timeline
Three (3) phase hackathon event starting August 24th, 2022 and ending in January 2023.
### Phase 1: Idea
 - Hackathon Phase 1 Kick-off - August 24th, 2022
 - Project Idea Submissions Due - September 11th, 2022
 - Evaluations - September 12th-19th, 2022
 - Shortlisted projects with prize/award ceremony announced for phase 2, hack - September 20th, 2022
 
### Phase 2: Hack/build MVP
 - Hackathon Phase 2 Kick off - September 20th, 2022
 - Project Submissions Due - October 30 11th, 2022
 - Evaluations - October 31st- November 11th, 2022
 - Shortlisted projects with prize/award ceremony announced for phase 3, pitch - November 12th, 2022
 
### Phase 3: Iterate & Pitch with Celo
 - Hackathon Phase 3 Kick off - November 12th, 2022
 - Project Submissions Due - December 12th, 2022
 - Evaluations - December 13th - December 20th, 2022
 - Prize/award ceremony announced - December 21st, 2022
 - Fast track Valora dApps listing event for phase 3 participants with dedicated mentorship hours with the Valora team - TBA Early January 2023
 - VC Demo day event - TBA Early January 2023
  
 
## Process
**Hackathon participants will need to:**

 1. [Fork this repo](#hackathon-repo-process)
 2. Utilize [HackerEarth](https://www.hackerearth.com/challenges/hackathon/celo-hackathon) to:
	 - Manage and collaborate with your team
	 - Submit your project for final evaluation

## Hackathon Repo Process

 1. Fork this repo
    - Press the Fork button
 2. Create project branch
 3. Make your changes within new branch!
	 - Copy the folder named **Project_Name**
	 - Rename the copied folder with your project name
	 - Modify project details within your project folder **Readme.md**
		 - Project Name
		 - Brief Description
		 - Team members & roles
		 - Hackathon track
		 - Project details
		-- Demonstartion video _(*Phase 2 & 3, Required)_
        -- Requirements _(*Phase 2 & 3, Required)_
        -- Instructions to build & test _(*Phase 2 & 3, Required)_

 4. Add, commit, and push the changes
	 - Add the files you've changed and commit them with a descriptive message.
 5. Submit your pull request _(*Phase 2 & 3, Required)_
    -  Submit to the maintainers for approval. Head over to the original repositories Pull Requests tab, you should see an automatic suggestion from GitHub to create a pull request from your new branch.
    -  Utilize your project name as the title for your initial pull Requests
    -  Provide a brief project description within the pull request comment

***Congrats, your officially a Build with Celo Hackathon participant!***


## Developer tools and resources

This section contains information about some of the key tools and resources that will help developers start building applications on Celo.

For a comprehensive list of resources and information, review [Celo Docs.](https://docs.celo.org/)

### QUICK START GUIDES

View the [Developer Code Examples page](https://docs.celo.org/developer-guide/start) to get started using the Celo SDKs with guided coding exercises.

### TOOLS

#### SDKs

-   [ContractKit](https://docs.celo.org/developer-guide/contractkit)
-   Javascript package of Celo blockchain utilities
-   Manage connections to the Celo blockchain, accounts, send transactions, interact with smart contracts, etc.
-   A set of wrappers around the core protocol smart contracts to easily connect with contracts related to governance, validators, on-chain exchange, etc.
-   Includes [web3.js](https://web3js.readthedocs.io/en/v1.2.4/)
-   [Celo Ethers.js Wrapper](https://github.com/celo-tools/celo-ethers-wrapper) (experimental)
-   A minimal wrapper to make [ethers.js](https://docs.ethers.io/v5/) compatible with the Celo network
-   [use-contractkit](https://github.com/celo-tools/use-contractkit)
-   A [Web3Modal](https://web3modal.com/)-like experience that injects ContractKit into your web-based application. Supports a variety of different wallets, including but not limited to Valora, Ledger, Metamask (Celo compatible fork) and any WalletConnect compatible wallets
-   [DappKit](https://docs.celo.org/developer-guide/dappkit)
-   Easily connect to the [Valora](http://valoraapp.com/) wallet with your React Native mobile application
-   Valora manages user account, private keys and transaction signing, so you can focus on building your dapp
-   Learn more and see the code with the [Dappkit truffle box](https://github.com/critesjosh/celo-dappkit)
-   [Python SDK](https://github.com/blaize-tech/celo-sdk-py)
-   [Java SDK](https://github.com/blaize-tech/celo-sdk-java)


#### Infrastructure

-   [Valora](https://valoraapp.com/) provides a clean, intuitive UI where users can send transactions and interact with smart contracts
-   [Forno](https://stackedit.io/developer-guide/forno)
-   Node access service so you can connect your dapp to the Celo blockchain without having to run node infrastructure
-   [ODIS](https://stackedit.io/developer-resources/contractkit/odis.md)
-   Oblivious decentralized identity service
-   Lightweight identity layer that makes it easy to send cryptocurrency to a phone number
-   Blockscout block explorers
-   [Alfajores testnet](http://alfajores-blockscout.celo-testnet.org/) & [mainnet](http://explorer.celo.org/)
-   [Stats.celo.org](http://stats.celo.org/) to check network activity and health


#### Networks

-   [Alfajores Testnet](https://docs.celo.org/getting-started/alfajores-testnet)
-   [Faucet](https://celo.org/developers/faucet) for free testnet CELO and cUSD
-   [Forno](https://docs.celo.org/developer-guide/forno) supports connections to alfajores
-   Requires Alfajores Celo wallet for mobile device testing (please request, support@clabs.co)
-   [Baklava testnet](https://docs.celo.org/getting-started/baklava-testnet) for validators and testing protocol changes


#### Ethereum Tools

-   Similarities between Celo and Ethereum means you can use many of the most popular Ethereum developer tools.
-   Celo supports the EVM, so tools for writing smart contracts in Solidity (or any language that compiles to EVM bytecode) are compatible with Celo
-   ERC20, NFT (ERC721) and other smart contract interface standards are supported, see [Celo for Ethereum Developers](https://docs.celo.org/developer-guide/celo-for-eth-devs)
- [Truffle](https://www.trufflesuite.com/)
- [OpenZeppelin](https://openzeppelin.com/)
- [Remix](https://remix.ethereum.org/)

#### Ongoing projects

-   [Community projects](https://docs.celo.org/developer-guide/celo-dapp-gallery)
-   [Grant recipients](https://celo.org/experience/grants/directory)

#### Web wallets
  -  [celowallet.app](https://celowallet.app/)
  -  [Celo Terminal](https://github.com/zviadm/celoterminal/)


#### Community

-   Join our [Discord](https://chat.celo.org/)
-   [Discourse Forum](https://forum.celo.org/)
