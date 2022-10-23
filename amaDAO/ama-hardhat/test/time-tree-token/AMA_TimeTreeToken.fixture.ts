import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { AMA_TimeTreeToken } from "../../types/AMA_TimeTreeToken";
import type { AMA_TimeTreeToken__factory } from "../../types/factories/AMA_TimeTreeToken__factory";

export async function deployAMA_TimeTreeTokenFixture(): Promise<{ AMA_TimeTreeToken: AMA_TimeTreeToken }> {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const admin: SignerWithAddress = signers[0];
  //let admin = this.ownerAddress;

  const totalSupply = "1000000000000000000000000"; // 1000000 * 1e18

  const amaFactory: AMA_TimeTreeToken__factory = <AMA_TimeTreeToken__factory>(
    await ethers.getContractFactory("AMA_TimeTreeToken")
  );
  const AMA_TimeTreeToken: AMA_TimeTreeToken = <AMA_TimeTreeToken>await amaFactory.connect(admin).deploy(totalSupply);

  await AMA_TimeTreeToken.deployed();

  return { AMA_TimeTreeToken };
}
