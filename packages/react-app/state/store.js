


import { configureStore } from '@reduxjs/toolkit';
// import todoReducer from './app/todoRedux';
import userReducer from './app/userReducer';


const store = configureStore({
    reducer: {
        user: userReducer
    }
})
  
export default store
