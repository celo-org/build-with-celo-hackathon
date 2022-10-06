import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'

import essentialReducer from '../features/essentials/essentialSlice'
import walletReducer from '../features/wallet/walletSlice'

import { essentialListeners } from '../features/essentials/essentialEffects'
import { walletListeners } from '../features/wallet/walletEffects'

const listenerMiddleware = createListenerMiddleware()

export default configureStore({
  reducer: {
    essential: essentialReducer,
    wallet: walletReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

//Listeners
essentialListeners(listenerMiddleware.startListening)
walletListeners(listenerMiddleware.startListening)
