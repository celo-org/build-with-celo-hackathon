# A brief description to run these test cases.
###  pre-learned technologies required
1. JavaScripts
2. Solidity 


### Technology and FrameWork used and links to install these technologies in your system
1. [Truffle](https://trufflesuite.com/docs/truffle/getting-started/installation/) 
2. [Ganache](https://trufflesuite.com/ganache/)
3. [Chai](https://www.chaijs.com/guide/installation/)
4. [Mocha](https://mochajs.org/#installation)
5. [Web3.js](https://web3js.readthedocs.io/en/v1.8.0/getting-started.html#adding-web3)
6. [openzepplin](https://docs.openzeppelin.com/contracts/4.x/)



#### Ganache- A Local BlockChain used to test the files.
#### Truffle- It provides a development environment to test our smart contracts with the help of EVM compatibility.
#### Chai- A javaScript frame Work which helps us to check whether our contract is giving the same output as the required , required output can be custom codded.
#### Mocha- A generic JavaScript testing framework.
#### Web3.js - A javascript framework helps us to communicate between Smart Contract and our frontend.And many more functionality.

## Contract we will be dealing with-
1. ERC20Token.sol- This is used to create custom tokens.
2. CrowdSale.sol- This is used to distribute all the tokens.
3. CrowdSaleFactory.sol- It is used to create custom CrowdSale.
4. MyGovernor.sol- It is used to vote on proposals and many more functions.



### Fork the project into ur git repo-
1. [Fork_from](https://github.com/t-phoenix/equistart)

### Start locla blockchain in ur laptop.
1. open **Ganache**
2. select **QUICKSTART ETHEREUM** option. 
*This will start a local blockchain in ur lap*

**After doing these steps**



### Clone the project from git-
1. Go to the direactory in which you want ur project 
2. create a **new blank folder** in that directory
3. open terminal for the folder.
4. type `LINK OF YOUR CLONED REPO` and press this will make a clone of the project into ur system.

### Change wallet address in [2_deploy_token_factory.js](../migrations/2_deploy_token_factory.js) which is *owner,executors & proposers* to any wallet address in your genache.

### To check if all the proccess is done perfectly.
1. open **Terminal** of project folder directory
2. type `cd contracts` and press **Enter**
3. type `truffle migrate --reset` and press **Enter** *this will deploy all the contract in your local blockchain*
**IF THE MIGRATION IS SUCCESSFULL THEN YOU HAVE DONE EVERYTHING RIGHT.**


### How to Run these files.
*currently you are in contract directory*
1. type `cd test` hit *enter*.
#### If you want to test all the test case at once
- type `truffle test` and hit enter.

#### If u want to test all the test case individually 
*code- `turffle test <FILE NAME>`*
1. for *crowdsale* type `truffle test crowdsale.test.js` and hit *enter*
2. for *CrowdSaleFactory* type `truffle test CrowdSaleFactory.test.js` and hit *enter*
3. for *ERC20Token* type `truffle test ERC20Token.test.js` and hit *enter*
4. for *MyGovernor* type `truffle test MyGovernor.test.js` and hit *enter*
5. for *TokenFactory* type `truffle test TokenFactory.test.js` and hit *enter*
  
### If test cases are behaving not currectly -> [refer](notes.txt)
