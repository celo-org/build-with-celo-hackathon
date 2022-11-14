import { testUtils } from "./utils";
import Web3 from "web3";
import { Hex } from "web3-utils";

const { deployToken, convertFromHex, assertIsCorrectAddress, getSigners, convertToHex } = testUtils;

/** Hi dev, I created these custom utilities to make work easier for me.
 * Most time, I find it time-consuming trying to work with complex libraries that do not
 * provide a comprehensive way of using them. 
 * To use any library effectively, one needs to understand the inbuilt and underlying contexts
 * and how data or returns are wrapped. This is just my way of doing stuffs. Sometimes I found those 
 * libraries useful as well.
*/
async function loadFixtures() {
  const { owner, misc1, misc2, escapeAddr } = await getSigners();
  const signers = [
    owner,
    misc1,
    misc2,
    escapeAddr
  ];

  const token = await deployToken(owner, owner.address);
  return {
    balanceOf: async(who: string) : Promise<string> => {
      const result = await token.balanceOf(who);
      if(!Web3.utils.isHex(result)) return result.toString();
      return convertFromHex(result);
    },
    
    transfer : async(to: string, from: number, amount: Hex) : Promise<void> => {
      assertIsCorrectAddress(to);
      await token.connect(signers[from]).transfer(to, amount);
    },
    
    transferFrom : async(beneficiary: number, ownerAddress: string, amount: Hex) : Promise<void> => {
      assertIsCorrectAddress(ownerAddress);
      const _signer = signers[beneficiary];
      await token.connect(_signer).transferFrom(ownerAddress, _signer.address, amount);
    },
    
    // We will not mint to owner
    mint : async() : Promise<Hex> => {
      const value = convertToHex('10000000000000000000000000');
      for(let i = 0; i < signers.length; i++) {
        const to = signers[i];
        if(i > 0) {
          assertIsCorrectAddress(to.address);
          await token.connect(owner).mint(
            signers[i].address, 
            value
          );
        }
      }
      return value;
    },
    
    balances : async(a: string, b: string) : Promise<Array<string>> => {
      const initBalMsc1 = convertFromHex(await token.balanceOf(a));
      const initBalMsc2 = convertFromHex(await token.balanceOf(b));
      return [initBalMsc1, initBalMsc2];
    },
    
    lockSpecific : async(sender: number, lockedAmount: Hex) : Promise<void> => {
      await token.connect(signers[sender]).lockSpecific(signers[3].address, lockedAmount, 1);
    },
    
    unlockSpecific : async(sender: number, unlockedAmt: Hex) : Promise<void> => {
      await token.connect(signers[sender]).unlockSpecific(unlockedAmt);
    },
    
    decreaseAllowance : async(sender: number, beneficiary: string,  value: Hex) : Promise<void> => {
      await token.connect(signers[sender]).decreaseAllowance(beneficiary, value);
    },
    
    getAllowance : async(sender: number, beneficiary: string) : Promise<Hex> => {
      return await token.allowance(signers[sender].address, beneficiary);
    },
    
    approve : async(approver: number, beneficiary: string, value: Hex) : Promise<Hex> => {
      return await token.connect(signers[approver]).approve(beneficiary, value);
    },
    
    getReserve : async() : Promise<Hex> => await token.reserved(),
    signers: signers,
    token: token,
  }
}

export const loadCustomTokenFixtures = loadFixtures