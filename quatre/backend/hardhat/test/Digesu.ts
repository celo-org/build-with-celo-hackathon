// import { time, loadFixture, mine } from "@nomicfoundation/hardhat-network-helpers";
// import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import Web3 from "web3";
import { Hex } from "web3-utils";
import { testUtils }  from "./utils";
import { loadCustomDigesuFixtures } from "./DigesuUtils";

const {
  bn,
  add, 
  wrap,
  reduce, 
  format,
  convertToHex,
  CREATION_FEE,
  ZERO_ADDRESS,
  convertFromHex, 
  compareEqualString, 
  compareEqualNumber, 
  MINIMUM_POOL_AMOUNT,
  assertIsCorrectAddress,
  INITIAL_ACCOUNT_BALANCE } = testUtils;

//   await accountManager.connect(owner).setFactory(digesu.address);
// await accountManager.connect(owner).setAccountCreationFee(CREATION_FEE);


describe("Testing Digesu contract", function () {
  
  describe("Deployment: Digesu", function () {

   
    it("Should create accounts for signers 1, 2, 3 successfully", async function () {
      const { signers, createAccountForM_1_2_3, confirmAccountStatusForMembers_1_2_3 } = await loadCustomDigesuFixtures();
      await createAccountForM_1_2_3(signers[1]);
      await confirmAccountStatusForMembers_1_2_3();
    });

   
  });

});
// expect(await ethers.provider.getBalance(lock.address)).to.equal(
//   lockedAmount
// );


// it("Should transfer the funds to the owner", async function () {
//   const { lock, unlockTime, lockedAmount, owner } = await 
//     deployOneY()arLockFixture
//   );

//   await time.increaseTo(unlockTime);

//   await expect(lock.withdraw()).to.changeEtherBalances(
//     [owner, lock],
//     [lockedAmount, -lockedAmount]
//   );
// });
// });

// describe("Events", function () {
//   it("Should emit an event on withdrawals", async function () {
//     const { lock, unlockTime, lockedAmount } = await 
//       deployOn()YearLockFixture
//     );

//     await time.increaseTo(unlockTime);

//     await expect(lock.withdraw())
//       .to.emit(lock, "Withdrawal")
//       .withArgs(lockedAmount, anyValue); // We accept any value as `when` arg
//   });
// });