import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';
import { getAllNFTs, getNFTByTokenId } from './neftme_api/nft';

const initialState = {
  nfts: [],
  status: 'idle',
};

export const nfts = createSlice({
  name: 'nfts',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    // Fetch All NFTS
    builder.addCase(fetchAllNFTs.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(fetchAllNFTs.rejected, (state) => {
      state.status = 'failed';
    });
    builder.addCase(fetchAllNFTs.fulfilled, (state, action) => {
      state.status = 'succeeded';
      if (action.payload) {
        state.nfts = action.payload;
      }
    });
    // Fetch NFT by TokenID
    builder.addCase(fetchNFTByTokenID.fulfilled, (state, action) => {
      if (action?.payload?.tokenId) {
        const nftIndex = state.nfts.findIndex((nft) => nft.tokenId === action.payload.tokenId);
        state.nfts[nftIndex] = action.payload;
      }
    });
  },
});

// Async Thunks
export const fetchAllNFTs = createAsyncThunk(
  'nft/fetchAllNFT',
  (params, thunkAPI) => {
    const nftsState = thunkAPI.getState().nfts;
    if (!nftsState.nfts.length || params?.forceRefresh) {
      try {
        return getAllNFTs();
      } catch (err) {
        // log errors;
        return thunkAPI.rejectWithValue(null);
      }
    }
    return thunkAPI.fulfillWithValue(null);
  },
);

export const fetchNFTByTokenID = createAsyncThunk(
  'nft/fetchNFTByTokenID',
  (params, thunkAPI) => {
    const nftsState = thunkAPI.getState().nfts;
    if (!nftsState.nfts[params.tokenId] || params.forceRefresh) {
      try {
        return getNFTByTokenId(params.tokenId);
      } catch (err) {
        // log errors;
        return thunkAPI.rejectWithValue(null);
      }
    }
    return thunkAPI.fulfillWithValue(null);
  },
);

// Selectors
export const selectNFTs = (state) => state.nfts;

const selectAllNFTs = (state) => state.nfts.nfts;

const selectTokenId = (state, tokenId) => tokenId;

export const selectNFTTokenId = createSelector(
  [selectAllNFTs, selectTokenId],
  (nftsState, tokenId) => nftsState.find((nft) => nft.tokenId === tokenId),
);
