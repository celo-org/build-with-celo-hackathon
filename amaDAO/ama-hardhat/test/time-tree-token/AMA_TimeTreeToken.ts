import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import { Signers } from "../types";
import { shouldBehaveLikeAMA_TimeTreeToken } from "./AMA_TimeTreeToken.behavior";
import { deployAMA_TimeTreeTokenFixture } from "./AMA_TimeTreeToken.fixture";

describe("Unit tests - Token", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];

    this.loadFixture = loadFixture;
    //
    this.decimals = 18;
    //this.signerContract = this.signers.admin;
    // this.ownerAddress = this.signers.admin.address;
    this.owner = this.signers.admin;
    // this.recipientAddress = this.signers.alice.address;
    this.recipient = this.signers.alice;
  });

  describe("AMA_TimeTreeToken", function () {
    beforeEach(async function () {
      const { AMA_TimeTreeToken } = await this.loadFixture(deployAMA_TimeTreeTokenFixture);
      this.AMA_TimeTreeToken = AMA_TimeTreeToken;

      this.decimals = await this.AMA_TimeTreeToken.decimals();
      this.signerContract = this.AMA_TimeTreeToken.connect(this.signers.admin);
      //this.ownerAddress = this.signers.admin;
    });

    shouldBehaveLikeAMA_TimeTreeToken();
  });
});
