import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

export default configureStore({
  reducer: {
    auth: authReducer,
  },
})
