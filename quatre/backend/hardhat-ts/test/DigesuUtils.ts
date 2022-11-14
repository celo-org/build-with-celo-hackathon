import { testUtils } from "./utils";
import Web3 from "web3";
import { Hex } from "web3-utils";

const {
  assertValue,
  deployContracts,
  convertFromHex, 
  assertIsCorrectAddress, 
  getSigners, 
  convertToHex,
  CREATION_FEE,
  VALUE_TO_SEND,
  MINIMUM_POOL_AMOUNT,
  INITIAL_ACCOUNT_BALANCE} = testUtils;

/** Hi dev, I created these custom utilities to make work easier for me.
 * Most time, I find it time-consuming trying to work with complex libraries that do not
 * provide a comprehensive way of using them. 
 * To use any library effectively, one needs to understand the inbuilt and underlying contexts
 * and how data or returns are wrapped. This is just my way of doing stuffs. Sometimes I found those 
 * libraries useful as well.
*/
async function loadFixtures() {
  const { owner, feeTo, member1, member2, member3 } = await getSigners();

  const signers = [
    member1,
    member2,
    member3,
    owner,
    feeTo
  ];

  const { 
    digesu, 
    accountManager, 
    token,
    tokenAddress,
    digesuAddress,
    managerAddress } = await deployContracts(owner, owner.address, feeTo.address, MINIMUM_POOL_AMOUNT);
    
  await accountManager.connect(owner).setFactory(digesu.address);
  await accountManager.connect(owner).setAccountCreationFee(CREATION_FEE);

  const createAccount = async(who: number, sender: any) => {
    assertValue(who < 3, "Out of bound");
      const _who = signers[who].address;
      console.log("Stops here", _who);
      await accountManager.connect(sender).createAccount(
        INITIAL_ACCOUNT_BALANCE, 
        _who,
        {value: VALUE_TO_SEND}
      );
      // return _who;
    }

    const getAccount = async(who: string): Promise<string> => {
      assertIsCorrectAddress(who);
      return await accountManager.getAccount(who);
    }

    return {
      createAccount : createAccount,

      createAccountForM_1_2_3: async(sender: any) => {
        for(let i = 0; i < 3; i++) {
          await createAccount(i, sender);
        }
      },
      
      createPublicPoolFromMember1 : async(
        quorum: number, 
        durationInDays: number, 
        ccr: number, 
        amount: number, 
        asset: string,
        callback: Function
      ) : Promise<void> => {
        const result = await digesu.connect(member1).createPublicPool(
          quorum,
          durationInDays,
          ccr,
          amount,
          asset
        );
        if(result) callback();
      },

      createPrivatePoolFromMember1 : async(
        durationInDays: number, 
        ccr: number, 
        asset: string,
        amount: number,
        callback: Function
      ) : Promise<void> => {
        const members = [
          member1.address,
          member2.address,
          member3.address
        ];
        const result = await digesu.connect(member1).createPublicPool(
          durationInDays,
          ccr,
          members,
          asset,
          amount
        );
        if(result) callback();
      },

      joinABand: async(poolId: number, member: any) : Promise<void> => {
        await digesu.connect(member).joinABand(poolId);
      },

      getAccount: getAccount,

      confirmAccountStatusForMembers_1_2_3: async(): Promise<void> => {
        for(let i = 0; i < 3; i++) {
          const account = await getAccount(signers[i].address);
          assertIsCorrectAddress(account);
        }
      },

      fetchPoolData: async(poolId: number): Promise<any> => {
        return await digesu.allPools();
      },
      digesu,
      token,
      signers,
      tokenAddress,
      digesuAddress,
      managerAddress 
  }
}

export const loadCustomDigesuFixtures = loadFixtures