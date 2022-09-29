import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: true,
  status: {
    isLoading: false,
    isSuccess: false,
    isFailed: false,
  },
}

const essentialSlice = createSlice({
  name: 'essential',
  initialState,
  reducers: {
    setLoggedIn: (state, action) => {
      state.hasAccounts = action.payload
    },
  },
})

export const { setLoggedIn } = essentialSlice.actions

export default essentialSlice.reducer
