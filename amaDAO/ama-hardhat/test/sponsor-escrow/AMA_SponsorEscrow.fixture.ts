import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { AMA_SponsorEscrow } from "../../types/AMA_SponsorEscrow";
import type { AMA_SponsorEscrow__factory } from "../../types/factories/AMA_SponsorEscrow__factory";

export async function deployAMA_SponsorEscrowFixture(): Promise<{ ama: AMA_SponsorEscrow }> {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const admin: SignerWithAddress = signers[0];
  const alice: SignerWithAddress = signers[1];
  const bob: SignerWithAddress = signers[2];

  const amaFactory: AMA_SponsorEscrow__factory = <AMA_SponsorEscrow__factory>(
    await ethers.getContractFactory("AMA_SponsorEscrow")
  );
  const ama: AMA_SponsorEscrow = <AMA_SponsorEscrow>await amaFactory.connect(admin).deploy();
  await ama.deployed();

  return { ama };
}
