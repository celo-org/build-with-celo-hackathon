import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { AMA_SponsorEscrow } from "../../types/contracts/AMA_SponsorEscrow";
import type { AMA_SponsorEscrow__factory } from "../../types/factories/contracts/AMA_SponsorEscrow__factory";

task("deploy:AMA_SponsorEscrow")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const contractFactory: AMA_SponsorEscrow__factory = <AMA_SponsorEscrow__factory>await ethers.getContractFactory("AMA_SponsorEscrow");
    const contract: AMA_SponsorEscrow = <AMA_SponsorEscrow>await contractFactory.connect(signers[0]).deploy();
    await contract.deployed();
    console.log("AMA_SponsorEscrow deployed to: ", contract.address);
  });
