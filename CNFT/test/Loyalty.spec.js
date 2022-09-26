const { ethers } = require("hardhat");
const { utils } = ethers;
const { expect } = require("chai");

function parseEther(amount) {
    return utils.parseEther(amount);
}

// function to generate signature
async function getPermitSignature(signer, token, spender, value, deadline) {
    const [nonce, name, version, chainId] = await Promise.all([
        token.nonces(signer.address),
        token.name(),
        "1",
        signer.getChainId(),
    ]);

    return utils.splitSignature(
        await signer._signTypedData({
            name,
            version,
            chainId,
            verifyingContract: token.address,
        }, {
            Permit: [{
                    name: "owner",
                    type: "address",
                },
                {
                    name: "spender",
                    type: "address",
                },
                {
                    name: "value",
                    type: "uint256",
                },
                {
                    name: "nonce",
                    type: "uint256",
                },
                {
                    name: "deadline",
                    type: "uint256",
                },
            ],
        }, {
            owner: signer.address,
            spender,
            value,
            nonce,
            deadline,
        })
    );
}

let Token, token;

let LoyaltyProgram, loyaltyProgram, loyaltyTokenAddress, loyaltyToken;

let deployer, payer, vendor, invalidVendor;

describe("Loyalty Program", () => {
    before(async() => {
        [deployer, payer, vendor, invalidVendor] = await ethers.getSigners();

        Token = await ethers.getContractFactory("Token");
        token = await Token.deploy();
        await token.deployed();

        // the deployer has the token that can be used as payment so giving out some to the payer who will later pay for goods & services and receive loyalty rewards
        await token.transfer(payer.address, parseEther("50"));

        LoyaltyProgram = await ethers.getContractFactory("LoyaltyProgram");
        loyaltyProgram = await LoyaltyProgram.deploy(token.address);
        await loyaltyProgram.deployed();

        loyaltyTokenAddress = await loyaltyProgram.loyaltyToken();
        loyaltyToken = await ethers.getContractAt(
            "LoyaltyToken",
            loyaltyTokenAddress
        );
    });

    describe("Deployment", async() => {
        it("On Deployment Payer should have some tokens to pay for services", async() => {
            expect(await token.balanceOf(payer.address)).to.be.eq(
                parseEther("50")
            );
        });

        // any vendor should be able to register.
        it("Vendor should be able to register", async() => {
            await loyaltyProgram.connect(vendor).registerVendor();
            expect(await loyaltyProgram.isVendorRegistered(vendor.address)).to
                .be.true;
        });
    });

    describe("After Vendor Registrated", async() => {
        // Payer is paying 10 tokens and expect 1 loyaltyToken consider 10% loyalty rewards.
        it("Payer should be able to relay payment transaction to Vendor and in return receive 10% reward", async() => {
            const amount = parseEther("10");
            const deadline = ethers.constants.MaxUint256;
            const { v, r, s } = await getPermitSignature(
                payer,
                token,
                loyaltyProgram.address,
                amount,
                deadline
            );

            await loyaltyProgram
                .connect(vendor)
                .payViaSignature(payer.address, amount, deadline, v, r, s);

            expect(await token.balanceOf(payer.address)).to.be.eq(
                parseEther("40")
            );
            expect(await token.balanceOf(vendor.address)).to.be.eq(
                parseEther("10")
            );
            expect(await loyaltyToken.balanceOf(payer.address)).to.be.eq(
                parseEther("1")
            );
        });

        // The entity relaying the transaction is not a registered vendor.
        it("Invalid Vendor trying to relay transaction", async() => {
            const amount = parseEther("10");
            const deadline = ethers.constants.MaxUint256;
            const { v, r, s } = await getPermitSignature(
                payer,
                token,
                loyaltyProgram.address,
                amount,
                deadline
            );

            await expect(
                loyaltyProgram
                .connect(invalidVendor)
                .payViaSignature(payer.address, amount, deadline, v, r, s)
            ).to.be.revertedWith("ONLY_VENDORS_CAN_RELAY");
        });

        // Vendor is trying to get payment from someone other than the payer.
        it("Valid vendor passing invalid payer address", async() => {
            const amount = parseEther("10");
            const deadline = ethers.constants.MaxUint256;
            const { v, r, s } = await getPermitSignature(
                payer,
                token,
                loyaltyProgram.address,
                amount,
                deadline
            );

            await expect(
                loyaltyProgram
                .connect(vendor)
                .payViaSignature(
                    deployer.address,
                    amount,
                    deadline,
                    v,
                    r,
                    s
                )
            ).to.be.revertedWith("ERC20Permit: invalid signature");
        });

        // Vendor is trying to get more payment then the payer has signed for.
        it("Vendor passing invalid amount", async() => {
            const amount = parseEther("10");
            const deadline = ethers.constants.MaxUint256;
            const { v, r, s } = await getPermitSignature(
                payer,
                token,
                loyaltyProgram.address,
                amount,
                deadline
            );

            await expect(
                loyaltyProgram
                .connect(vendor)
                .payViaSignature(
                    deployer.address,
                    parseEther("11"),
                    deadline,
                    v,
                    r,
                    s
                )
            ).to.be.revertedWith("ERC20Permit: invalid signature");
        });
    });
});