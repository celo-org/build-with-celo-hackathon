import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'

import essentialReducer from '../features/essentials/essentialSlice'
import walletReducer from '../features/wallet/walletSlice'
import spacesReducer from '../features/spaces/spacesSlice'

import { essentialListeners } from '../features/essentials/essentialEffects'
import { walletListeners } from '../features/wallet/walletEffects'
import { spacesListeners } from '../features/spaces/spacesEffects'

const listenerMiddleware = createListenerMiddleware()

export default configureStore({
  reducer: {
    essential: essentialReducer,
    wallet: walletReducer,
    spaces: spacesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

//Listeners
essentialListeners(listenerMiddleware.startListening)
walletListeners(listenerMiddleware.startListening)
spacesListeners(listenerMiddleware.startListening)
