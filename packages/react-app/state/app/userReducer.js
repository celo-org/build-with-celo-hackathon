import { createSlice } from "@reduxjs/toolkit";
import { useRouter } from "next/router";
import toast, { Toaster } from 'react-hot-toast';



const userReducer = createSlice({
    name:'user',
    initialState: {
        currentUser: null,
        loading: false,
        error: null,
        success: false,
    },
    reducers: {
        loginStart:(state)=>{
            state.loading=true
        },
        loginSuccess:(state, {payload}) =>{
            state.loading=false;
            state.currentUser=payload;
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
        loginFailure:(state, {payload})=>{
            state.loading=false;
            state.error = payload;
            toast.error('Failed to Login', {
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
        logout:(state)=>{
            state.currentUser= null;
        }
    }
});

export const {loginStart, loginSuccess, loginFailure} = userReducer.actions

export default userReducer.reducer