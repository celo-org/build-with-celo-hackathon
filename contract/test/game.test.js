const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Lock", function () {

  async function deployGameAndRewardTokenFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, account1, account2] = await ethers.getSigners();

    const CUSD = await ethers.getContractFactory("CUSDMock");
    const cusd = await CUSD.deploy();

    const GAME = await ethers.getContractFactory("Game");
    const game = await GAME.deploy((await cusd).address);

    await cusd.approve(game.address, 100);

    const answer = ethers.utils.id("hello world");

    return { owner, account1, account2, cusd, game, answer };
  }

  describe("Deployment", function () {
    it("Should set cUSD address correctly", async function () {
      const { cusd, game } = await loadFixture(deployGameAndRewardTokenFixture);
      expect(await game.cUSD()).to.equal(cusd.address);
    });

    it("Should have set allowance for game contract to spend cUSD token of owner", async function () {
      const { owner, cusd, game } = await loadFixture(deployGameAndRewardTokenFixture);
      expect(await cusd.allowance(owner.address, game.address)).to.equal(100);
    });
  });

  describe("Create function", function () {

    /**
     * Note:
     * When testing for reverted assertion please use following:
     * 1. await expect(YOUR EXPRESSION).to.be.reverted;
     * and don't use
     * 2. expect(await YOUR EXPERSSION).to.be.reverted;
     * condition 1 will pass the test (becuase it waits for whole statement assertion to execute) but in condition 2 it throws an error before executing the whole assertion which results in failed test.
     */
    it("Should fail if reward is not more than 4", async function () {
      const { game, answer } = await loadFixture(deployGameAndRewardTokenFixture);
      await expect(game.create(answer, 4)).to.be.revertedWith("reward should be greater than 4 cUSD!");
    });

    it("Should fail if allowance of ERC20 is less than reward", async function () {
      const { game, answer } = await loadFixture(deployGameAndRewardTokenFixture);
      await expect(game.create(answer, 101)).to.be.revertedWith("allowance should more than reward!");
    });

    it("Should create an a question", async function () {
      const { cusd, game, answer } = await loadFixture(deployGameAndRewardTokenFixture);

      await game.create(answer, 10);
      const question = await game.questions(0);

      expect(question.answer).to.be.equals(answer);
      expect(question.reward).to.be.equals(10);
      expect(await game.id()).to.be.equals(1);

      expect(await cusd.balanceOf(game.address)).to.be.equals(10);
    });
  });

  describe("Guess function", function () {

    it("Should transfer the fund if guess is correct", async function () {
      const { account1, cusd, game, answer } = await loadFixture(deployGameAndRewardTokenFixture);

      let reward = 10;
      await game.create(answer, reward);

      await expect(game.connect(account1).guess(0, "hello world")).to.emit(game, "solved").withArgs(account1.address, 0, reward);

      const question = await game.questions(0);

      expect(question.reward).to.be.equals(0);
      expect(await cusd.balanceOf(game.address)).to.be.equals(0);
      expect(await cusd.balanceOf(account1.address)).to.be.equals(reward);
    });
    it("Should revert for wrong answer", async function () {
      const { account1, cusd, game, answer } = await loadFixture(deployGameAndRewardTokenFixture);

      let reward = 10;
      await game.create(answer, reward);

      await expect(game.connect(account1).guess(0, "hi world")).to.be.revertedWith("Wrong answer!");

      const question = await game.questions(0);

      expect(question.reward).to.be.equals(10);
      expect(await cusd.balanceOf(game.address)).to.be.equals(10);
      expect(await cusd.balanceOf(account1.address)).to.be.equals(0);
    });
  });

});
