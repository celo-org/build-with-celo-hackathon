import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { STATUS } from '../constants'
import axios from '../services/axios'
import { removeUserToken, setUserToken } from '../services/localStorage'

const namespace = 'auth'

const base = '/api/user'

export const signupUser = createAsyncThunk(`${namespace}/signupUser`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${base}/signup`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const verifyEmail = createAsyncThunk(`${namespace}/verifyEmail`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${base}/verify-email`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})

export const loginUser = createAsyncThunk(`${namespace}/loginUser`, async (objData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(`${base}/login`, objData)
    return data;
  } catch (err) {
    return rejectWithValue(err.response.data)
  }
})


const DEFAULT = { status: null, data: null, error: null }

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    signup: DEFAULT,
    verifyEmail: DEFAULT,
    login: DEFAULT,
    user: null,
    verifyPassword: DEFAULT,
    changePassword: DEFAULT,
    resetPassword: DEFAULT,
  },
  reducers: {
    logout(state) {
      state.user = null;
      removeUserToken()
    },
  },
  extraReducers: {
    [signupUser.pending](state) {
      state.signup.status = STATUS.PENDING
    },
    [signupUser.fulfilled](state, { payload }) {
      state.signup.status = STATUS.FULFILLED
      state.signup.data = payload
    },
    [signupUser.rejected](state, { payload }) {
      state.signup.status = STATUS.REJECTED
      state.signup.error = payload
    },

    [verifyEmail.pending](state) {
      state.verifyEmail.status = STATUS.PENDING
    },
    [verifyEmail.fulfilled](state, { payload }) {
      state.verifyEmail.status = STATUS.FULFILLED
      state.verifyEmail.data = payload
    },
    [verifyEmail.rejected](state, { payload }) {
      state.verifyEmail.status = STATUS.REJECTED
      state.verifyEmail.error = payload
    },
    
    [loginUser.pending](state) {
      state.login.status = STATUS.PENDING
    },
    [loginUser.fulfilled](state, { payload }) {
      state.login.status = STATUS.FULFILLED
      state.user = payload.result
      setUserToken(payload.token)
    },
    [loginUser.rejected](state, { payload }) {
      state.login.status = STATUS.REJECTED
      state.login.error = payload
    },
    
  }
})

export const { logout } = authSlice.actions

export const selectSignupState = state => state.auth.signup
export const selectVerifyEmailState = state => state.auth.verifyEmail
export const selectLoginState = state => state.auth.login


export default authSlice.reducer
