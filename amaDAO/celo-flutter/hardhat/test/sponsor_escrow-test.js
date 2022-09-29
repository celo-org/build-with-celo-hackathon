const { expect } = require("chai");
const { Wallet } = require("ethers");
const { network, ethers, waffle, artifacts } = require("hardhat");

describe("SponsorEscrow", function () {
  it("Should create escrow", async function () {
    //let contract_owner = await ethers.getSigner(network.config.from);
    const signers = await ethers.getSigners();

    const [owner, sponsor] = await ethers.getSigners();

    //const SponsorEscrow = await ethers.getContractFactory("AMA_SponsorEscrow");
    //const sponsorEscrow = await SponsorEscrow.deploy(); //connect(contract_owner)

    //** problems managing between owner & sponsor.  Move to typescript hardhat config

    const sponsorArtifact = await artifacts.readArtifact("AMA_SponsorEscrow");
    const sponsorEscrow = await waffle.deployContract(sponsor, sponsorArtifact);
    await sponsorEscrow.deployed();

    expect(await sponsorEscrow.nEscrow()).to.exist;
    //expect(sponsorEscrow.nEscrow).to.equal(0);
    //this.sponsor = sponsor; //signers[1];

    const createEscrowTx = await sponsorEscrow.create("Test", 40, 1000 );
    //const createEscrowTx = await sponsorEscrow.create("Test", 40, 1000 );

    // wait until the transaction is mined
    await createEscrowTx.wait();

    expect(await sponsorEscrow.nEscrow()).to.equal(1);
    //expect(sponsorEscrow.nEscrow).to.equal(1);
  });
});
