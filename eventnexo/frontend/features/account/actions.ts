import type { ContractKit } from "@celo/contractkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { AppDispatch, AppState } from "../../app/store";
import { NativeTokenId } from "../../app/constant";
import { validateAddress } from "../../utils/address";

interface FetchBalancesParams {
  address: string;
  kit: ContractKit;
}

export type AccountBalances = Record<NativeTokenId, string>;

export const fetchBalances = createAsyncThunk<
  AccountBalances | null,
  FetchBalancesParams,
  { dispatch: AppDispatch; state: AppState }
>("accounts/fetchBalances", async (params, thunkAPI) => {
  const { address, kit } = params;
  const lastUpdated = thunkAPI.getState().account.lastUpdated;

  const balances = await _fetchBalances(address, kit);
  return balances;
});

async function _fetchBalances(address: string, kit: ContractKit) {
  validateAddress(address, "fetchBalances");
  const balances = await kit.getTotalBalance(address);
  const filteredBalances: Partial<Record<NativeTokenId, string>> = {};
  for (const tokenId of Object.keys(NativeTokenId)) {
    // @ts-ignore
    filteredBalances[tokenId] = balances[tokenId].toString();
  }
  return filteredBalances as Record<NativeTokenId, string>;
}
