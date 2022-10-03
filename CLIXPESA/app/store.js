import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'

import essentialReducer from '../features/essentials/essentialSlice'

import { essentialListeners } from '../features/essentials/essentialEffects'

const listenerMiddleware = createListenerMiddleware()

export default configureStore({
  reducer: {
    essential: essentialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

//Listeners
essentialListeners(listenerMiddleware.startListening)
