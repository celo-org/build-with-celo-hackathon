import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { formatEther, parseEther, parseUnits } from "ethers/lib/utils";

import * as hardhatContracts from "../utils/toucanContracts.json";
import {
  IToucanPoolToken,
  OffsetHelper,
  OffsetHelper__factory,
  Swapper,
  Swapper__factory,
} from "../typechain";
import addresses from "../utils/addresses";
import { BigNumber, Contract } from "ethers";
import { usdcABI, wethABI, wmaticABI } from "../utils/ABIs";

const ONE_ETHER = parseEther("1.0");

describe("Offset NCTs for amaDAO", function () {
  let offsetHelper: OffsetHelper;
  let swapper: Swapper;
  // let bct: IToucanPoolToken;
  let nct: IToucanPoolToken;
  // let weth: Contract;
  // let wmatic: Contract;
  let usdc: Contract;
  let addr1: SignerWithAddress;
  let addr2: SignerWithAddress;
  let addrs: SignerWithAddress[];

  beforeEach(async function () {
    [addr1, addr2, ...addrs] = await ethers.getSigners();

    const offsetHelperFactory = (await ethers.getContractFactory(
      "OffsetHelper",
      addr2
    )) as OffsetHelper__factory;
    offsetHelper = await offsetHelperFactory.deploy(
      ["BCT", "NCT", "USDC", "WETH", "WMATIC"],
      [
        addresses.bct,
        addresses.nct,
        addresses.usdc,
        addresses.weth,
        addresses.wmatic,
      ]
    );

    // weth = new ethers.Contract(addresses.weth, wethABI, addr2);
    // wmatic = new ethers.Contract(addresses.wmatic, wmaticABI, addr2);
    usdc = new ethers.Contract(addresses.usdc, usdcABI, addr2);

    nct = new ethers.Contract(
      addresses.nct,
      hardhatContracts.contracts.NatureCarbonTonne.abi,
      addr2
    ) as IToucanPoolToken;

    // bct = new ethers.Contract(
    //   addresses.bct,
    //   poolContract.abi,
    //   addr2
    // ) as IToucanPoolToken;
  });

  before(async () => {
    [addr1, addr2, ...addrs] = await ethers.getSigners();

    const swapperFactory = (await ethers.getContractFactory(
      "Swapper",
      addr2
    )) as Swapper__factory;
    swapper = await swapperFactory.deploy(
      ["BCT", "NCT", "USDC", "WETH", "WMATIC"],
      [
        addresses.bct,
        addresses.nct,
        addresses.usdc,
        addresses.weth,
        addresses.wmatic,
      ]
    );

    await Promise.all(
      addrs.map(async (addr) => {
        await addr.sendTransaction({
          to: addr2.address,
          value: (await addr.getBalance()).sub(ONE_ETHER),
        });
      })
    );

    // celo equiv needed calculateNeededETHAmount
    await swapper.swap(addresses.usdc, parseUnits("20.0", 6), {
      value: await swapper.calculateNeededETHAmount(
        addresses.usdc,
        parseUnits("20.0", 6)
      ),
    });

    await swapper.swap(addresses.nct, parseEther("50.0"), {
      value: await swapper.calculateNeededETHAmount(
        addresses.nct,
        parseEther("50.0")
      ),
    });
  });

  it("should redeem NCT from deposit", async function () {
    // first we set the initial chain state
    const states: {
      userNctBalance: BigNumber;
      contractNctBalance: BigNumber;
      nctSupply: BigNumber;
    }[] = [];
    states.push({
      userNctBalance: await nct.balanceOf(addr2.address),
      contractNctBalance: await nct.balanceOf(offsetHelper.address),
      nctSupply: await nct.totalSupply(),
    });

    // then we deposit 1.0 NCT into the OH contract
    await (await nct.approve(offsetHelper.address, ONE_ETHER)).wait();
    await (await offsetHelper.deposit(addresses.nct, ONE_ETHER)).wait();

    // then we set the chain state after the deposit transaction
    states.push({
      userNctBalance: await nct.balanceOf(addr2.address),
      contractNctBalance: await nct.balanceOf(offsetHelper.address),
      nctSupply: await nct.totalSupply(),
    });

    // and we compare chain states post deposit
    expect(
      formatEther(states[0].userNctBalance.sub(states[1].userNctBalance)),
      "User should have 1 less NCT post deposit"
    ).to.equal(formatEther(ONE_ETHER));
    expect(
      formatEther(
        states[1].contractNctBalance.sub(states[0].contractNctBalance)
      ),
      "Contract should have 1 more NCT post deposit"
    ).to.equal(formatEther(ONE_ETHER));
    expect(
      formatEther(states[0].nctSupply),
      "NCT supply should be the same post deposit"
    ).to.equal(formatEther(states[1].nctSupply));

    // we redeem 1.0 NCT from the OH contract for TCO2s
    await offsetHelper.autoRedeem(addresses.nct, ONE_ETHER);

    // then we set the chain state after the redeem transaction
    states.push({
      userNctBalance: await nct.balanceOf(addr2.address),
      contractNctBalance: await nct.balanceOf(offsetHelper.address),
      nctSupply: await nct.totalSupply(),
    });

    // and we compare chain states post redeem
    expect(
      formatEther(states[1].userNctBalance),
      "User should have the same amount of NCT post redeem"
    ).to.equal(formatEther(states[2].userNctBalance));
    expect(
      formatEther(
        states[1].contractNctBalance.sub(states[2].contractNctBalance)
      ),
      "Contract should have 1 less NCT post redeem"
    ).to.equal(formatEther(ONE_ETHER));
    expect(
      formatEther(states[1].nctSupply.sub(states[2].nctSupply)),
      "NCT supply should be less by 1 post redeem"
    ).to.equal(formatEther(ONE_ETHER));
  });

  it("Should fail because we haven't deposited NCT", async function () {
    await expect(
      offsetHelper.autoRedeem(addresses.nct, ONE_ETHER)
    ).to.be.revertedWith("Insufficient NCT/BCT balance");
  });
});
