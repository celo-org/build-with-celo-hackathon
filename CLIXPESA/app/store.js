import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'

import essentialReducer from '../features/essentials/essentialSlice'
import walletReducer from '../features/wallet/walletSlice'
import spacesReducer from '../features/spaces/spacesSlice'
import loansReducer from '../features/microloans/loansSlice'

import { essentialListeners } from '../features/essentials/essentialEffects'
import { walletListeners } from '../features/wallet/walletEffects'
import { spacesListeners } from '../features/spaces/spacesEffects'
import { loansListeners } from '../features/microloans/loansEffects'

import { blockscoutApi } from './services/blockscout'

const listenerMiddleware = createListenerMiddleware()

export default configureStore({
  reducer: {
    [blockscoutApi.reducerPath]: blockscoutApi.reducer,
    essential: essentialReducer,
    wallet: walletReducer,
    spaces: spacesReducer,
    loans: loansReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware, blockscoutApi.middleware),
})

//Listeners
essentialListeners(listenerMiddleware.startListening)
walletListeners(listenerMiddleware.startListening)
spacesListeners(listenerMiddleware.startListening)
loansListeners(listenerMiddleware.startListening)
