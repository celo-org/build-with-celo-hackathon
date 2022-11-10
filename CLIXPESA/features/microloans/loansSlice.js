import { createSlice, createAction } from '@reduxjs/toolkit'

const loansInitialState = {
  ONRsAddr: '',
  allOffers: [],
}

const loansSlice = createSlice({
  name: 'loans',
  initialState: loansInitialState,
  reducers: {
    setONRsAddress: (state, action) => {
      state.ONRsAddr = action.payload
    },
    setOffers: (state, action) => {
      state.allOffers = action.payload
    },
  },
  extraReducers: {},
})

//Created Actions
export const fetchOffers = createAction('loans/fetchOffers')
export const fetchRequests = createAction('loans/fetchRequests')
export const fetchLoans = createAction('loans/fetchLoans')
export const updateLoans = createAction('loans/updateLoans')

export const { setONRsAddress, setOffers } = loansSlice.actions

export default loansSlice.reducer
