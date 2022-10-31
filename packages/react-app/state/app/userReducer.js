import { createSlice } from "@reduxjs/toolkit";
import toast, { Toaster } from 'react-hot-toast';
const userReducer = createSlice({
    name:"user",
    initialState: {
        currentUser: null,
        isFetching: false,
        error: false
    },
    reducer: {
        loginStart:(state)=>{
            state.isFetching = true
        },
        loginSuccess:(state, action) =>{
            state.isFetching=false;
            state.currentUser=action.payload;
            toast.success('Logged in successfully', {
                duration: 4000,
                position: 'top-center',
                style: {},
                className: '',
                icon: '👏',
                iconTheme: {
                  primary: '#000',
                  secondary: '#fff',
                },
                
                ariaProps: {
                  role: 'status',
                  'aria-live': 'polite',
                },
            });
        },
        loginFailure:(state)=>{
            state.isFetching=false;
            state.error = true;
        },
        logout:(state)=>{
            state.currentUser= null;
        }
    }
});

export const {loginStart, loginSuccess, loginFailure} = userReducer.actions

export default userReducer.reducer