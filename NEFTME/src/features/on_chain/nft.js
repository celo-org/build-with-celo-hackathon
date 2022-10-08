import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = {
  nfts: {},
};

export const onChainNFT = createSlice({
  name: 'onChainNFT',
  initialState,
  reducers: {
    initStructure: (state, { payload: { tokenId, struct } }) => {
      if (!state.nfts[tokenId]) {
        state.nfts[tokenId] = {};
      }
      if (!state.nfts[tokenId][struct]) {
        state.nfts[tokenId] = {
          ...state.nfts[tokenId],
          [struct]: {
            loading: 'pending',
            data: [],
          },
        };
      }
    },
  },
  extraReducers: (builder) => {
    // Bids
    builder.addCase(fetchNFTBids.fulfilled, (state, action) => {
      if (action.payload) {
        state.nfts[action.meta.arg.tokenId].bids.loading = 'succeeded';
        state.nfts[action.meta.arg.tokenId].bids.data = action.payload;
      }
    });
    builder.addCase(fetchNFTBids.rejected, (state, action) => {
      state.nfts[action.meta.arg.tokenId].bids.loading = 'failed';
    });

    // Details
    builder.addCase(fetchNFTDetails.fulfilled, (state, action) => {
      if (action.payload) {
        state.nfts[action.meta.arg.tokenId].details.loading = 'succeeded';
        state.nfts[action.meta.arg.tokenId].details.data = action.payload;
      }
    });
    builder.addCase(fetchNFTDetails.rejected, (state, action) => {
      state.nfts[action.meta.arg.tokenId].details.loading = 'failed';
    });

    // Stakers
    builder.addCase(fetchStakers.fulfilled, (state, action) => {
      if (action.payload) {
        state.nfts[action.meta.arg.tokenId].stakers.loading = 'succeeded';
        state.nfts[action.meta.arg.tokenId].stakers.data = action.payload;
      }
    });
    builder.addCase(fetchStakers.rejected, (state, action) => {
      state.nfts[action.meta.arg.tokenId].stakers.loading = 'failed';
    });

    // User Stakes
    builder.addCase(fetchUserStakes.fulfilled, (state, action) => {
      if (action.payload) {
        state.nfts[action.meta.arg.tokenId].userStakes.loading = 'succeeded';
        state.nfts[action.meta.arg.tokenId].userStakes.data = action.payload;
      }
    });
    builder.addCase(fetchUserStakes.rejected, (state, action) => {
      state.nfts[action.meta.arg.tokenId].userStakes.loading = 'failed';
    });
  },
});

// Async Thunks
export const fetchNFTBids = createAsyncThunk(
  'onChainNFT/fetchNFTBids',
  (params, thunkAPI) => {
    const onChainNFTstate = thunkAPI.getState().onChainNFT;
    if (!onChainNFTstate.nfts?.[params.tokenId]?.bids || params.forceRefresh) {
      thunkAPI.dispatch(onChainNFT.actions.initStructure({ tokenId: params.tokenId, struct: 'bids' }));
      return params.contractMethods.getBids(params.tokenId).call();
    }
    return thunkAPI.fulfillWithValue(null);
  },
);

export const fetchNFTDetails = createAsyncThunk(
  'onChainNFT/fetchNFTDetails',
  (params, thunkAPI) => {
    const onChainNFTstate = thunkAPI.getState().onChainNFT;
    if (!onChainNFTstate.nfts?.[params.tokenId]?.details || params.forceRefresh) {
      thunkAPI.dispatch(onChainNFT.actions.initStructure({ tokenId: params.tokenId, struct: 'details' }));
      return params.contractMethods.nftDetails(params.tokenId).call();
    }
    return thunkAPI.fulfillWithValue(null);
  },
);

export const fetchStakers = createAsyncThunk(
  'onChainNFT/fetchStakers',
  (params, thunkAPI) => {
    const onChainNFTstate = thunkAPI.getState().onChainNFT;
    if (!onChainNFTstate.nfts?.[params.tokenId]?.stakers || params.forceRefresh) {
      thunkAPI.dispatch(onChainNFT.actions.initStructure({ tokenId: params.tokenId, struct: 'stakers' }));
      return params.contractMethods.getStakes(params.tokenId).call();
    }
    return thunkAPI.fulfillWithValue(null);
  },
);

export const fetchUserStakes = createAsyncThunk(
  'onChainNFT/fetchUserStakes',
  (params, thunkAPI) => {
    const onChainNFTstate = thunkAPI.getState().onChainNFT;
    if (!onChainNFTstate.nfts?.[params.tokenId]?.userStakes || params.forceRefresh) {
      thunkAPI.dispatch(onChainNFT.actions.initStructure({ tokenId: params.tokenId, struct: 'userStakes' }));
      return params.contractMethods.stakes(params.tokenId, params.account).call()
        .then((res) => ({ ...res }))
        .catch(() => thunkAPI.rejectWithValue(null));
    }
    return thunkAPI.fulfillWithValue(null);
  },
);

// Selectors
const selectAllNFTs = (state) => state.onChainNFT.nfts;

const selectTokenId = (state, tokenId) => tokenId;

export const selectNFTBid = createSelector(
  [selectAllNFTs, selectTokenId],
  (nftsState, tokenId) => nftsState[tokenId]?.bids,
);

export const selectNFTDetails = createSelector(
  [selectAllNFTs, selectTokenId],
  (nftsState, tokenId) => nftsState[tokenId]?.details,
);

export const selectNFTStakers = createSelector(
  [selectAllNFTs, selectTokenId],
  (nftsState, tokenId) => nftsState[tokenId]?.stakers,
);

export const selectNFTUserStakes = createSelector(
  [selectAllNFTs, selectTokenId],
  (nftsState, tokenId) => nftsState[tokenId]?.userStakes,
);

export const selectNFTUserStakedAmount = createSelector(
  [selectAllNFTs, selectTokenId],
  (nftsState, tokenId) => (
    Number.isNaN(nftsState[tokenId]?.userStakes?.data?.amount)
      ? 0
      : Number(nftsState[tokenId]?.userStakes?.data?.amount) * 10 ** -18
  ),
);
