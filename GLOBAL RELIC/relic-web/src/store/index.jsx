import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
    modal: 'scale-0',
    updateModal: 'scale-0',
    deleteModal: 'scale-0',
    backModal: 'scale-0',
    chatModal: 'scale-0',
    connectedWalletAddress: '',
    backers: [],
    projects: [],
    project: null,
    relicCFContract: null,
    stats: null,
    currentUser: null,
    group: null,
  })
  

  export {setGlobalState, useGlobalState, getGlobalState}