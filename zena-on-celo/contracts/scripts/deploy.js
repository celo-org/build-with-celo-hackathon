const BCTcontract = "0x4c5f90C50Ca9F849bb75D93a393A4e1B6E68Accb"

const main = async () => {
  // const [owner, randoPerson] = await hre.ethers.getSigners();

  // Deploy Zena token and treasury and NFT handling
  const contractFactory = await hre.ethers.getContractFactory('ZenaTreasury');
  const contract = await contractFactory.deploy("0x4c5f90C50Ca9F849bb75D93a393A4e1B6E68Accb");
  await contract.deployed();
  const zenaAddress = contract.address;
  console.log("Zena treasury Contract deployed to:", zenaAddress);

  // Deploy FakeDEX
  const dexFactory = await hre.ethers.getContractFactory('FakeDEX');
  const dex = await dexFactory.deploy(BCTcontract, zenaAddress);
  await dex.deployed();
  const dexAddress = dex.address;
  console.log("Contract deployed to:", dexAddress);
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