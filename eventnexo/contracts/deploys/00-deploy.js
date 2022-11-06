const main = async () => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts();

  const EEventStorage = await ethers.getContractFactory("EEventStorage");
  const eeventStorage = await EEventStorage.deploy();

  await eeventStorage.deployed();

  const ETicketStorage = await ethers.getContractFactory("ETicketStorage");
  const eTicketStorage = await ETicketStorage.deploy();

  await eTicketStorage.deployed();

  const Eventnexo = await ethers.getContractFactory("Eventnexo");
  const eventnexo = await Eventnexo.deploy();

  await eventnexo.deployed();

  console.table({
    "EEvent Storage": eeventStorage.address,
    "ETicket Storage": eTicketStorage.address,
    Eventnexo: xchange.address,
  });
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
