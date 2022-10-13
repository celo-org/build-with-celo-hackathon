import { createSlice, createAction } from '@reduxjs/toolkit'

const spacesInitialState = {
  isLoading: true,
  selectedMembers: [],
  spaceInfo: {
    // for space creation
    name: null,
    type: null, //personal, rosca, regular, mchango
    authCode: '369bC1',
    members: [], //!TODO always include creator.
    goalAmount: null,
    ctbAmount: null,
    ctbDay: 'Monday',
    ctbOccurence: 'Weekly',
    disbDay: 'Tuesday',
    disbOccurence: 'Weekly',
    creator: null, //creator user address
  },
  roscaAddress: null,
  roscaDetails: {},
  userSpaces: {
    // just add contract addresses
    roscas: [],
    personal: [],
    regular: [],
    mchango: [],
  },
}

const spacesSlice = createSlice({
  name: 'spaces',
  initialState: spacesInitialState,
  reducers: {
    setSelectedMembers: (state, action) => {
      state.selectedMembers = action.payload
    },
    setSpaceInfo: (state, { payload }) => {
      const { spaceName, spaceType } = payload
      state.spaceInfo.members = state.selectedMembers
      state.spaceInfo.name = spaceName
      state.spaceInfo.type = spaceType
    },
    setCtbSchedule: (state, { payload }) => {
      ;(state.spaceInfo.ctbDay = payload.day), (state.spaceInfo.ctbOccurence = payload.occurrence)
    },
    setDisbSchedule: (state, { payload }) => {
      ;(state.spaceInfo.disbDay = payload.day), (state.spaceInfo.disbOccurence = payload.occurrence)
    },
    setGoalAmount: (state, { payload }) => {
      const size = state.spaceInfo.members.length
      state.spaceInfo.goalAmount = payload
      state.spaceInfo.ctbAmount = size ? payload / state.spaceInfo.members.length : payload
    },
    setUserSpaces: (state, { payload }) => {
      if (state.spaceInfo.type === 'rosca') {
        state.userSpaces.roscas.push(payload)
      } else if (state.spaceInfo.type === 'personal') {
        state.userSpaces.personal.push(payload)
      }
    },
  },
  extraReducers: {},
})

export const {
  setSelectedMembers,
  setSpaceInfo,
  setCtbSchedule,
  setDisbSchedule,
  setGoalAmount,
  setUserSpaces,
} = spacesSlice.actions

//Created action
export const getRoscaData = createAction('spaces/getRoscaData')
export const getRoscaAddress = createAction('spaces/getRoscaAddress')

export default spacesSlice.reducer
