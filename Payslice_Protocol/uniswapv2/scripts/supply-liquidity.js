// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const { ethers } = require("hardhat");
const hre = require("hardhat");
const cDEFI = require("../abis/cDEFI.json");
const cETH = require("../abis/cETH.json");
const cEUR = require("../abis/cEUR.json");
const cREAL = require("../abis/cREAL.json");
const cUSD = require("../abis/cUSD.json");
const DAI = require("../abis/DAI.json");
const USDC = require("../abis/USDC.json");
const WMATIC = require("../abis/WMATIC.json");

async function main() {

    const pairs = {
        "cDEFI|cETH": ["0xD16324B00B0bD87af2182eB28C7FC941EE20ec75","0xe07e18e1DB637B292bB07B934C9E943aB91373F3"],
        "cEUR|cREAL": ["0x8369B70746C39F5707d9d60ca264b6C0Deefc8aD","0x7De5201260afaBE85ceA2411761cf2Ffb168B224"],
        "cUSD|DAI": ["0xE46AD6b17a4a5f8309e7004D5a246473F2f0DC1F","0x01006B12De5317225ab72e252F654b8a77E74B7f"],
        "USDC|WMATIC": ["0x27258d7C77ccCBD988779a3Cd5BFA133dC639121","0x2d852a3a36d649BABb7E3e99ab514Ec44c1E07Ca"],
        "cEUR|cETH": ["0x8369B70746C39F5707d9d60ca264b6C0Deefc8aD","0xe07e18e1DB637B292bB07B934C9E943aB91373F3"],
        "cREAL|cUSD": ["0x7De5201260afaBE85ceA2411761cf2Ffb168B224","0xE46AD6b17a4a5f8309e7004D5a246473F2f0DC1F",],
        "DAI|USDC": ["0x01006B12De5317225ab72e252F654b8a77E74B7f","0x27258d7C77ccCBD988779a3Cd5BFA133dC639121"],
        "WMATIC|cDEFI": ["0x2d852a3a36d649BABb7E3e99ab514Ec44c1E07Ca","0xD16324B00B0bD87af2182eB28C7FC941EE20ec75"],
        "USDC|cDEFI": ["0x27258d7C77ccCBD988779a3Cd5BFA133dC639121","0xD16324B00B0bD87af2182eB28C7FC941EE20ec75"],
        "DAI|cETH": ["0x01006B12De5317225ab72e252F654b8a77E74B7f","0xe07e18e1DB637B292bB07B934C9E943aB91373F3"],
        "cUSD|cEUR": ["0xE46AD6b17a4a5f8309e7004D5a246473F2f0DC1F","0x8369B70746C39F5707d9d60ca264b6C0Deefc8aD"],
        "cREAL|WMATIC": ["0x7De5201260afaBE85ceA2411761cf2Ffb168B224","0x2d852a3a36d649BABb7E3e99ab514Ec44c1E07Ca",]
    }
    //fund exchange
    const fundAmount = ethers.utils.parseEther("3000000");
    const [signer] = await ethers.getSigners();
    const deployedRouter = await ethers.getContractAt("ZuniswapV2Router","0x9479d7cf8b6ebeca30f688BC5Dd77250B49361Ed". signer);

    Object.entries(pairs).forEach(async ([key, [address1, address2]]) => {

        const [name1, name2] = key.split("|");

        const abi1 = require(`../abis/${name1}.json`);
        const abi2 = require(`../abis/${name2}.json`);
        
        console.log(name1, name2);
        
        const contract = await ethers.getContractAt(abi1.abi, address1);
        
        await signer.getTransactionCount();
        
        await contract.approve("0x9479d7cf8b6ebeca30f688BC5Dd77250B49361Ed", fundAmount);
        

        // await (await ethers.getContractAt(name1, address1)).approve(deployedRouter.address, fundAmount);
        // await (await ethers.getContractAt(name2, address2)).approve(deployedRouter.address, fundAmount);

        // await deployedRouter.addLiquidity(
        //     address1,
        //     address2,
        //     fundAmount,
        //     fundAmount,
        //     ethers.utils.parseEther("1000000"),
        //     ethers.utils.parseEther("1000000"),
        //     signer.address
        // )
    });
}




// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
