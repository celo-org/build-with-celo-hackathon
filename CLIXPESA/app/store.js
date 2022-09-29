import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit'

import essentialReducer from '../features/essentials/essentialSlice'

const listenerMiddleware = createListenerMiddleware()

export default configureStore({
  reducer: {
    essential: essentialReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

//Listeners
