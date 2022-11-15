
# ⚡ Hackathon Project Template ⚡
_This is a sample submission repository.
Please [__fork this repo__](https://help.github.com/articles/fork-a-repo/) and use this as a starting point for your hackathon project._

## DeAudit
### DeAudit
#### DeFi

##### Region location
United States 
India

##### Team Members
- Barbara Tyler, Smart Contract Auditor and Developer
- Arihant Bansal, Full Stack Blockchain Developer

#### Project Description
A decentralized Audit marketplace on Celo.

#### Summary
1. SELECT A JURY
A jury is usually a reputed security engineer. This jury doesn’t do the audit itself but only signs off a reported vulnerability as a real bug. There are 5 jury members selected for every audit. They control a 3/5 multisig that approves a detected bug once it is reported by an auditor. They receive 5% of the total audit spend.
2. THE CONTRACT IS DEPLOYED FOR AUDITING
The contract must be deployed on-chain to make the code immutable.
3. POOLS ARE CREATED
Once the contract is deployed, 2 betting pools are created. Called NoBugs and YesBugs - representing a betting pool that says there are no severe bugs in this contract v/s yes there are bugs in this contract.
4. POOLS ARE EQUALLY FUNDED
To kick start the marketplace, the person requesting the audit must fund both pools.
5. AUDITORS AUDIT AND FUND POOLS
A security auditor looks at the deployed contract and judges whether there are bugs in this contract or not.
If they’re confident there are no severe bugs; they may add money to the NoBugs pool.
6. MONEY STARTS STREAMING FROM YESBUGS TO NOBUGS
Until a bug has been reported, the money from the YesBugs pool starts streaming to NoBugs pool, so the YesBugs pool will be exhausted in 30 days.
7A. BUG REPORT
If a security engineer finds a bug, they may report it to the jury.
The jury will vote with their signature on whether the bug is severe. If the jury accepts the bug as a severe bug, the NoBugs pool is liquidated, and all the money from NoBugs pool is distributed to the people who funded the YesBugs pool. This distribution happens proportionally to
•	When the funder puts money in the YesBugs pool (earlier you make a bet, more is your reward if true)
•	Amount put in as the bet (larger your bet that there are bugs, the more the reward)
•	5% goes to the jury members equally
7B. NO BUGS REPORTED
If the size of NoBugs pool is greater than 95% of the summation of the pools, the NoBugs pool can be liquidated. All the people who bet that there are no bugs are rewarded by the same ratios presented in 7a.


#### URLs
https://github.com/barbarayler/build-with-celo-hackathon/tree/main/DeAudit

#### Presentation
https://www.youtube.com/watch?v=Fosu92LztMg

#### Next Steps
This is a proof of idea, we've planned a lot of changes, upgrades and improvements to DeAudit.
1.	If the no bugs reported is the pool that won, an NFT is created with the amount of money that was liquidated and the ENS of people on the jury.
2.	Specify some background checks for approving a user as a jury member and not allowing anyone to do so randomly.
3.	Create a DAO which votes on approving Jury members based on their security profiles.
4.	Migrate our frontend DApp to TypeScript.
5.	Explore storing additional data (stored in a centralized server for now) to be kept on IPFS.
6.	Migrate to foundry for our dev environment.


#### License
This repository includes an [unlicensed](http://unlicense.org/) statement though you may want to [choose a different license](https://choosealicense.com/).
