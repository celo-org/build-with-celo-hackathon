import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  userDetails: {
    names: null,
    initials: null,
    phoneNo: '+245712345678',
    country: null,
    userToken: null,
  },
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
      state.isLoggedIn = action.payload
    },
    setUserDetails: (state, { payload }) => {
      const { userNames, phoneNumber } = payload
      state.userDetails.names = userNames
      state.userDetails.phoneNo = phoneNumber

      const country = { '+254': 'Kenya', '+256': 'Uganda', '+255': 'Tanzania' }
      state.userDetails.country = country[phoneNumber.slice(0, 4)]

      const names = userNames.split(' ')
      state.userDetails.initials = names[0].slice(0, 1) + names[1].slice(0, 1)
    },
    setUserToken: (state, action) => {
      state.userDetails.userToken = action.payload
    },
    setToken: (state, action) => {
      state.userDetails.userToken = action.payload
    },
  },
})

export const { setLoggedIn, setUserDetails, setUserToken, setToken } = essentialSlice.actions

export default essentialSlice.reducer
