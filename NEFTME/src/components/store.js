import { configureStore } from '@reduxjs/toolkit';
import { api } from '@features/api';
import { onChainNFT } from '@features/on_chain/nft';
import { nfts } from '@features/nft';

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    nfts: nfts.reducer,
    onChainNFT: onChainNFT.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
});
