import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

// import type { AMA_SponsorEscrow } from "../../src/types/AMA_SponsorEscrow";
import { Signers } from "../types";
import { shouldBehaveLikeAMA_SponsorEscrow } from "./AMA_SponsorEscrow.behavior";
import { deployAMA_SponsorEscrowFixture } from "./AMA_SponsorEscrow.fixture";

describe("Unit tests - Sponsor", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];

    this.loadFixture = loadFixture;
  });

  describe("AMA_SponsorEscrow", function () {
    beforeEach(async function () {
      const { ama } = await this.loadFixture(deployAMA_SponsorEscrowFixture);
      this.AMA_SponsorEscrow = ama;

      // Given tokens to Sponsor for tests
      //this.AMA_TimeTreeToken.transfer(this.signers.alice, 20);
    });

    shouldBehaveLikeAMA_SponsorEscrow();
  });
});
