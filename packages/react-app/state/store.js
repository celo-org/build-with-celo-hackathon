


import { configureStore } from '@reduxjs/toolkit';
import todoReducer from './app/todoRedux';
import userReducer from './app/userReducer';


const store = configureStore({
    reducer: {
        // todos: todoReducer,
        user: userReducer,
    }
})
  
export default store