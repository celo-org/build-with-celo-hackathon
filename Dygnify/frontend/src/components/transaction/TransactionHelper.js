import { ethers } from "ethers";
import dygnifyStaking from "../../artifacts/contracts/protocol/old/DygnifyStaking.sol/DygnifyStaking.json";
import dygnifyToken from "../../artifacts/contracts/protocol/old/TestUSDCToken.sol/TestUSDCToken.json";
import { requestAccount } from "../navbar/NavBarHelper";
import opportunityOrigination from "../../artifacts/contracts/protocol/OpportunityOrigination.sol/OpportunityOrigination.json";
import opportunityPool from "../../artifacts/contracts/protocol/OpportunityPool.sol/OpportunityPool.json";
import seniorPool from "../../artifacts/contracts/protocol/SeniorPool.sol/SeniorPool.json";
import borrowerContract from "../../artifacts/contracts/protocol/Borrower.sol/Borrower.json";
import investor from "../../artifacts/contracts/protocol/Investor.sol/Investor.json";

import {
  getDisplayAmount,
  getTrimmedWalletAddress,
} from "../../services/displayTextHelper";

const opportunityOriginationAddress =
  process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS;
const sixDecimals = 6;
const eighteenDecimals = 18;

export async function getUserWalletAddress() {
  try {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      return address;
    }
  } catch (error) {
    console.log(error);
  }
  return undefined;
}

export async function approve(amount) {
  if (amount <= 0 || amount <= "0") {
    console.log("Amount must be greater than 0");
  } else if (typeof window.ethereum !== "undefined") {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const signer = provider.getSigner();
    const contract2 = new ethers.Contract(
      process.env.REACT_APP_TOKEN,
      dygnifyToken.abi,
      signer
    );
    const transaction = await contract2.approve(
      process.env.REACT_APP_DYGNIFY_STAKING_ADDRESS,
      amount
    );
    await transaction.wait();
  }
}

export async function allowance(ownerAddress) {
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const signer = provider.getSigner();
    const contract2 = new ethers.Contract(
      process.env.REACT_APP_TOKEN,
      dygnifyToken.abi,
      signer
    );
    const transaction = await contract2.allowance(
      ownerAddress,
      process.env.REACT_APP_DYGNIFY_STAKING_ADDRESS
    );

    return ethers.utils.formatEther(transaction);
  }
}

export async function stake(amount) {
  if (amount <= 0 || amount <= "0") {
    console.log("Amount must be greater than 0");
  } else if (typeof window.ethereum !== "undefined") {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.REACT_APP_DYGNIFY_STAKING_ADDRESS,
      dygnifyStaking.abi,
      signer
    );
    const transaction1 = await contract.stake(amount);
    await transaction1.wait();
  }
}

export async function unstake(amount) {
  if (amount === 0) console.log("Amount must be greater than 0");
  else if (typeof window.ethereum !== "undefined") {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.REACT_APP_DYGNIFY_STAKING_ADDRESS,
      dygnifyStaking.abi,
      signer
    );
    const transaction = await contract.unstake(amount);
    await transaction.wait();
  }
}

export async function withdrawYield() {
  if (typeof window.ethereum !== "undefined") {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.REACT_APP_DYGNIFY_STAKING_ADDRESS,
      dygnifyStaking.abi,
      signer
    );
    const transaction = await contract.withdrawYield();
    await transaction.wait();
  }
}

export async function getTotalYield() {
  try {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.REACT_APP_DYGNIFY_STAKING_ADDRESS,
        dygnifyStaking.abi,
        signer
      );
      const data = await contract.getTotalYield();

      return ethers.utils.formatEther(data);
    }
  } catch (error) {
    console.log(error);
  }
  return 0;
}

// once all work done this function name needs to be changed to getUSDCWalletBal
export async function getWalletBal(address) {
  try {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      // console.log({ provider });
      const contract = new ethers.Contract(
        process.env.REACT_APP_TEST_USDCTOKEN,
        dygnifyToken.abi,
        provider
      );
      const signer = provider.getSigner();
      const bal = await contract.balanceOf(
        address ? address : await signer.getAddress()
      );
      return ethers.utils.formatUnits(bal, sixDecimals);
    }
  } catch (error) {
    console.log(error);
  }

  return 0;
}

export async function getWithdrawBal() {
  try {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(
        process.env.REACT_APP_DYGNIFY_STAKING_ADDRESS,
        dygnifyStaking.abi,
        provider
      );

      const signer = provider.getSigner();
      const data = await contract.stakingBalance(await signer.getAddress());
      return ethers.utils.formatEther(data);
    }
  } catch (error) {
    console.log(error);
  }

  return 0;
}

export const getEthAddress = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  return await signer.getAddress();
};

// to create opportunity
export async function createOpportunity(formData) {
  let borrower = await getEthAddress();
  let {
    loan_type,
    loan_amount,
    loan_tenure,
    loan_interest,
    capital_loss,
    payment_frequency,
    loanInfoHash,
    collateralHash,
  } = formData;
  console.log("backend call", formData);

  if (typeof window.ethereum !== "undefined") {
    await requestAccount();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
      opportunityOrigination.abi,
      signer
    );
    const loanAmt = ethers.utils.parseUnits(loan_amount, sixDecimals);
    const loanInterest = ethers.utils.parseUnits(loan_interest, sixDecimals);
    const capitalLoss = capital_loss
      ? ethers.utils.parseUnits(capital_loss, sixDecimals)
      : 0;
    const transaction1 = await contract.createOpportunity(
      borrower,
      loanInfoHash,
      loan_type,
      loanAmt,
      loan_tenure,
      loanInterest,
      payment_frequency,
      collateralHash,
      capitalLoss
    );
    await transaction1.wait();
    console.log("successfully created*******");
  }
}

export function convertDate(epochTimestamp) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  //epoch gives timestamp in seconds we need to convert it in miliseconds
  var d = new Date(epochTimestamp * 1000);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("/");
}

function getOpportunity(opportunity) {
  if (!opportunity) {
    return undefined;
  }

  // Create the opportunity object
  let obj = {};
  obj.id = opportunity.opportunityID.toString();
  obj.borrower = opportunity.borrower.toString();
  obj.borrowerDisplayAdd = getTrimmedWalletAddress(obj.borrower);
  obj.opportunityInfo = opportunity.opportunityInfo.toString();
  obj.loanType = opportunity.loanType.toString(); // 0 or 1 need to be handled
  let amount = ethers.utils.formatUnits(opportunity.loanAmount, sixDecimals);
  obj.opportunityAmount = getDisplayAmount(amount);
  obj.actualLoanAmount = amount;
  obj.loanTenure = (opportunity.loanTenureInDays / 30).toString() + " Months";
  let loanInt = ethers.utils.formatUnits(opportunity.loanInterest, sixDecimals);
  obj.loanActualInterest = loanInt;
  obj.loanInterest = loanInt.toString() + "%";
  obj.paymentFrequencyInDays =
    opportunity.paymentFrequencyInDays.toString() + " Days";
  obj.collateralDocument = opportunity.collateralDocument.toString();
  obj.capitalLoss = ethers.utils
    .formatUnits(opportunity.capitalLoss, sixDecimals)
    .toString();
  obj.status = opportunity.opportunityStatus.toString();
  obj.opportunityPoolAddress = opportunity.opportunityPoolAddress.toString();

  obj.createdOn = convertDate(opportunity.createdOn);

  return obj;
}
// to fetch created opportunities of specific borrower
export async function getOpportunitysOf() {
  try {
    if (typeof window.ethereum !== "undefined") {
      // await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
        opportunityOrigination.abi,
        provider
      );

      let borrower = await getEthAddress();
      const data = await contract.getOpportunityOf(borrower);
      let opportunities = [];
      for (const op of data) {
        let tx = await contract.opportunityToId(op);
        let obj = await getOpportunity(tx);
        opportunities.push(obj);
      }
      return opportunities;
    }
  } catch (error) {
    console.log(error);
  }

  return 0;
}

export async function voteOpportunity(id, vote) {
  try {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        opportunityOriginationAddress,
        opportunityOrigination.abi,
        signer
      );
      const transaction1 = await contract.voteOpportunity(id, vote);
      await transaction1.wait();
    }
  } catch (error) {
    console.log(error);
  }
}

// to fetch opportunity by id
export async function getOpportunityAt(id) {
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(
        process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
        opportunityOrigination.abi,
        provider
      );

      console.log("check");
      let tx = await contract.opportunityToId(id);
      let obj = getOpportunity(tx);
      return obj;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
}

export async function getAllUnderReviewOpportunities() {
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(
        process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
        opportunityOrigination.abi,
        provider
      );

      const count = await contract.getTotalOpportunities();
      let opportunities = [];

      for (let i = 0; i < count; i++) {
        let id = await contract.opportunityIds(i);

        let tx = await contract.opportunityToId(id);
        if (tx.opportunityStatus.toString() == "0") {
          let obj = getOpportunity(tx);
          opportunities.push(obj);
        }
      }
      return opportunities;
    }
  } catch (error) {
    console.log(error);
  }

  return 0;
}

export async function getApprovalHistory() {
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(
        process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
        opportunityOrigination.abi,
        provider
      );
      const underWriter = await getEthAddress();
      const opportunities = await contract.getUnderWritersOpportunities(
        underWriter
      );
      let count = opportunities.length;
      let opportunitiesList = [];

      for (let i = 0; i < count; i++) {
        let tx = await contract.opportunityToId(opportunities[i]);
        if (tx.opportunityStatus.toString() != "0") {
          //neglecting non voted opoortunities.
          let obj = getOpportunity(tx);
          opportunitiesList.push(obj);
        }
      }
      return opportunitiesList;
    }
  } catch (error) {
    console.log(error);
  }

  return 0;
}

export async function getAllActiveOpportunities() {
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(
        process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
        opportunityOrigination.abi,
        provider
      );

      const count = await contract.getTotalOpportunities();
      let opportunities = [];

      for (let i = 0; i < count; i++) {
        let id = await contract.opportunityIds(i);
        let opportunity = await contract.opportunityToId(id);
        if (opportunity.opportunityStatus.toString() == "5") {
          // get pool for opportunity
          let poolAddress = opportunity.opportunityPoolAddress.toString();
          console.log(poolAddress);
          const poolContract = new ethers.Contract(
            poolAddress,
            opportunityPool.abi,
            provider
          );
          let poolBal = await poolContract.poolBalance();
          let obj = getOpportunity(opportunity);
          obj.isFull = poolBal >= obj.loanAmount;
          opportunities.push(obj);
        }
      }
      return opportunities;
    }
  } catch (error) {
    console.log(error);
  }

  return undefined;
}

export async function getDrawdownOpportunities() {
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
        opportunityOrigination.abi,
        provider
      );

      let borrower = await getEthAddress();
      const data = await contract.getOpportunityOf(borrower);
      let opportunities = [];
      for (const opportunity of data) {
        let tx = await contract.opportunityToId(opportunity);

        if (!tx.opportunityPoolAddress) {
          continue;
        }

        // Get opportunities available for drawdown
        let poolAddress = tx.opportunityPoolAddress.toString();
        console.log(poolAddress);
        const poolContract = new ethers.Contract(
          poolAddress,
          opportunityPool.abi,
          provider
        );

        if (!poolContract) {
          continue;
        }

        let poolBalance = await poolContract.poolBalance();
        poolBalance = ethers.utils.formatUnits(poolBalance, sixDecimals);
        let loanAmount = ethers.utils.formatUnits(tx.loanAmount, sixDecimals);
        console.log(poolBalance.toString());
        if (parseInt(poolBalance) >= parseInt(loanAmount)) {
          let obj = await getOpportunity(tx);
          opportunities.push(obj);
        }
      }
      return opportunities;
    }
  } catch (error) {
    console.log(error);
  }

  return undefined;
}

export async function getAllWithdrawableOpportunities() {
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
        opportunityOrigination.abi,
        provider
      );

      let borrower = await getEthAddress();
      const count = await contract.getOpportunityOf(borrower);
      let opportunities = [];

      for (let i = 0; i < count; i++) {
        let id = await contract.opportunityIds(i);

        let tx = await contract.opportunityToId(id);

        if (tx.opportunityStatus.toString() == "7") {
          let poolAddress = tx.opportunityPoolAddress.toString();
          console.log(poolAddress);
          const poolContract = new ethers.Contract(
            poolAddress,
            opportunityPool.abi,
            provider
          );
          let poolBal = await poolContract.poolBalance();
          if (poolBal.toString() != "0") {
            const signer = provider.getSigner();
            const userStakingAmt = await poolContract.stakingBalance(
              await signer.getAddress()
            );
            const estimatedAPY = await poolContract.juniorYieldPerecentage();
            let obj = getOpportunity(tx);
            obj.capitalInvested = userStakingAmt;
            obj.estimatedAPY = estimatedAPY;
            obj.yieldGenerated = userStakingAmt * estimatedAPY;
            if (obj) {
              opportunities.push(obj);
            }
          }
        }
      }
      return opportunities;
    }
  } catch (error) {
    console.log(error);
  }

  return [];
}

export async function getUserSeniorPoolInvestment() {
  try {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      console.log({ signer });
      const contract = new ethers.Contract(
        process.env.REACT_APP_SENIORPOOL,
        seniorPool.abi,
        signer
      );

      let data = await contract.getUserInvestment();
      if (data) {
        return {
          stakingAmt: parseFloat(
            ethers.utils.formatUnits(data.stakingAmt, sixDecimals)
          ),
          withdrawableAmt: parseFloat(
            ethers.utils.formatUnits(data.withdrawableAmt),
            sixDecimals
          ),
        };
      }
    }
  } catch (error) {
    console.log(error);
  }

  return undefined;
}

export async function getBorrowerDetails(address) {
  try {
    if (typeof window.ethereum !== "undefined") {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(
        process.env.REACT_APP_BORROWER,
        borrowerContract.abi,
        provider
      );
      if (!address) {
        address = await getEthAddress();
      }
      if (address) {
        return await contract.borrowerProfile(address);
      }
    }
  } catch (error) {
    console.log(error);
  }

  return undefined;
}

export async function updateBorrowerDetails(cid) {
  try {
    if (typeof window.ethereum !== "undefined" && cid) {
      await requestAccount();
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.REACT_APP_BORROWER,
        borrowerContract.abi,
        signer
      );
      let transaction = await contract.updateBorrowerProfile(cid);
      await transaction.wait();
    }
  } catch (error) {
    console.log(error);
  }

  return undefined;
}

export async function getOpportunitiesWithDues() {
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (!provider) {
        return;
      }
      const contract = new ethers.Contract(
        process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
        opportunityOrigination.abi,
        provider
      );

      if (!contract) {
        return;
      }

      let borrower = await getEthAddress();
      const data = await contract.getOpportunityOf(borrower);
      let opportunities = [];
      for (const opportunity of data) {
        let tx = await contract.opportunityToId(opportunity);
        // check for the drawn down opportunities
        if (tx.opportunityStatus.toString() == "6") {
          let poolAddress = tx.opportunityPoolAddress.toString();
          console.log(poolAddress);
          const poolContract = new ethers.Contract(
            poolAddress,
            opportunityPool.abi,
            provider
          );

          if (!poolContract) {
            continue;
          }

          let repaymentDate = await poolContract.nextRepaymentTime();
          let repaymentAmount = await poolContract.getRepaymentAmount();
          let totalRepaidAmt = await poolContract.totalRepaidAmount();
          repaymentAmount = ethers.utils.formatUnits(
            repaymentAmount,
            sixDecimals
          );

          let obj = await getOpportunity(tx);
          obj.nextDueDate = convertDate(repaymentDate);
          obj.epochDueDate = repaymentDate.toString();
          obj.repaymentAmount = repaymentAmount;
          obj.repaymentDisplayAmount = getDisplayAmount(repaymentAmount);
          obj.totalRepaidAmount = parseFloat(
            ethers.utils.formatUnits(totalRepaidAmt, sixDecimals)
          );
          const overdueTime = Math.floor(Date.now() / 1000) - repaymentDate;
          obj.isOverDue = overdueTime > 0 ? true : false;

          opportunities.push(obj);
        }
      }
      return opportunities;
    }
  } catch (error) {
    console.log(error);
  }

  return undefined;
}

export async function getAllUnderwriterOpportunities() {
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const contract = new ethers.Contract(
        process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
        opportunityOrigination.abi,
        provider
      );

      let underWriter = await getEthAddress();
      const count = await contract.underwriterToOpportunity(underWriter);
      let opportunities = [];

      for (let i = 0; i < count; i++) {
        let id = await contract.opportunityIds(i);

        let tx = await contract.opportunityToId(id);
        if (tx.opportunityStatus.toString() == "0") {
          let obj = getOpportunity(tx);
          opportunities.push(obj);
        }
      }
      return opportunities;
    }
  } catch (error) {
    console.log(error);
  }

  return 0;
}

export async function investInSeniorPool(amount) {
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        process.env.REACT_APP_SENIORPOOL,
        seniorPool.abi,
        signer
      );
      amount = ethers.utils.parseUnits(amount, sixDecimals);
      let transaction = await contract.stake(amount);
      await transaction.wait();
    }
  } catch (error) {
    console.log(error);
  }
}

export async function investInJuniorPool(poolAddress, amount) {
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log({ provider });
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        poolAddress,
        opportunityPool.abi,
        signer
      );
      amount = ethers.utils.parseUnits(amount, sixDecimals);
      let transaction = await contract.deposit("0", amount); //0 denotes junior subpool
      await transaction.wait();
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getSeniorPoolSharePrice() {
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.REACT_APP_SENIORPOOL,
        seniorPool.abi,
        provider
      );
      let sharePrice = await contract.sharePrice();
      return ethers.utils.formatUnits(sharePrice, eighteenDecimals);
    }
  } catch (error) {
    console.log(error);
  }
  return 0;
}

export async function getSeniorPoolDisplaySharePrice(defaultSharePrice) {
  let sharePrice;
  // 10 will be the default in case we didn't get default share price
  defaultSharePrice = defaultSharePrice ? defaultSharePrice : 10;
  let backendSharePrice = parseFloat(await getSeniorPoolSharePrice());
  if (backendSharePrice > (100 + parseFloat(defaultSharePrice)) / 100) {
    sharePrice = parseFloat((1 - backendSharePrice) * 100);
  } else {
    sharePrice = defaultSharePrice;
  }
  return { sharePrice: sharePrice, displaySharePrice: sharePrice + "%" };
}

export async function repayment(poolAddress) {
  let borrower = await getEthAddress();

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const signer = provider.getSigner();
    const poolContract = new ethers.Contract(
      poolAddress,
      opportunityPool.abi,
      signer
    );

    const transaction1 = await poolContract.repayment();
    await transaction1.wait();
  }
}

export async function getJuniorWithdrawableOp(){
  let investorAddress = await getEthAddress();
  try {
    if (typeof window.ethereum !== "undefined") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(
        process.env.REACT_APP_INVESTOR,
        investor.abi,
        provider
      );
      const originationContract = new ethers.Contract(
        process.env.REACT_APP_OPPORTUNITY_ORIGINATION_ADDRESS,
        opportunityOrigination.abi,
        provider
      );
      
      let opportunities = await contract.getOpportunityOfInvestor(investorAddress);
      let opportunityList = [];
      for(let i = 0 ; i<opportunities.length ; i++){
        let tx = await originationContract.opportunityToId(opportunities[i]);
        let obj = await getOpportunity(tx);

        const poolContract = new ethers.Contract(
          obj.opportunityPoolAddress,
          opportunityPool.abi,
          provider
        );
        let stakingBal = await poolContract.stakingBalance(investorAddress);
        stakingBal =  ethers.utils.formatUnits(stakingBal.toString(), sixDecimals)
        obj.capitalInvested = stakingBal;
        let poolBal = await poolContract.poolBalance();
        poolBal = ethers.utils.formatUnits(poolBal, sixDecimals);
        let JuniorPoolDetails = await poolContract.juniorSubpoolDetails();
        let JuniorPoolBalance = ethers.utils.formatUnits( JuniorPoolDetails[2].toString(), sixDecimals);

        let investorWithdrawable = await poolContract.stakingBalance(investorAddress); 
        investorWithdrawable = ethers.utils.formatUnits(investorWithdrawable.toString(), sixDecimals);
        
        obj.withdrawableAmt = (parseInt(poolBal) >= parseInt(obj.opportunityAmount) ? investorWithdrawable : 0)
        opportunityList.push(obj);
      }
      console.log(opportunityList)
      return opportunityList;
    }
  } catch (error) {
    console.log(error);
  }
  return [];
}

export async function drawdown(poolAddress) {
  let borrower = await getEthAddress();

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const signer = provider.getSigner();
    const poolContract = new ethers.Contract(
      poolAddress,
      opportunityPool.abi,
      signer
    );

    const transaction1 = await poolContract.drawdown();
    await transaction1.wait();
  }
}

export async function withdrawAllJunior(poolAddress) {
  let borrower = await getEthAddress();

  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    console.log({ provider });
    const signer = provider.getSigner();
    const poolContract = new ethers.Contract(
      poolAddress,
      opportunityPool.abi,
      signer
    );

    const transaction1 = await poolContract.withdrawAll(0);// 0 is juniorpool ID
    await transaction1.wait();
  }
}