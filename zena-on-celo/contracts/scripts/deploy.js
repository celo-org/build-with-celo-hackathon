const main = async () => {
  // const nftContractFactory = await hre.ethers.getContractFactory('OffsetHelper');
  // const nftContract = await nftContractFactory.deploy(["BTC"], ['0x4c5f90C50Ca9F849bb75D93a393A4e1B6E68Accb']);
  // await nftContract.deployed();
  // const nftContractAddress = nftContract.address;
  // console.log("NFT Contract deployed to:", nftContractAddress);

  const nftContractFactory = await hre.ethers.getContractFactory('SwapNCT');
  const nftContract = await nftContractFactory.deploy();
  await nftContract.deployed();
  const nftContractAddress = nftContract.address;
  console.log("NFT Contract deployed to:", nftContractAddress);
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