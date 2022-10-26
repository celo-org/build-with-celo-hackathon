const main = async () => {
  // const [owner, randoPerson] = await hre.ethers.getSigners();
  const BCTcontract = "0x4c5f90C50Ca9F849bb75D93a393A4e1B6E68Accb"
  const zenaTreasury = "0x4fdAD4f7562952bD1dbdb815d34f73ce932114a7"
  const contractFactory = await hre.ethers.getContractFactory('FakeDEX');
  const contract = await contractFactory.deploy(BCTcontract, zenaTreasury);
  await contract.deployed();
  const contractAddress = contract.address;
  console.log("Contract deployed to:", contractAddress);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

runMain();