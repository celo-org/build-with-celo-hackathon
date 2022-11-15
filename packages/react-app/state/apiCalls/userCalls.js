// import { loginFailure, loginStart, loginSuccess } from "./userRedux"
import axios from 'axios';
import { useRouter } from 'next/router';
import { loginFailure, loginStart, loginSuccess } from '../app/userReducer';
// import {publicRequest, userRequest} from '../components/requestMethods'


export const login = async (dispatch, user) => {
    // const router = useRouter()

    dispatch(loginStart());
    try{
        const res = await axios.post("http://127.0.0.1:8080/api/collectors/auth/login", user)
        dispatch(loginSuccess(res.data));
        // router.path("individual/dashboard");

    }catch(err){
        dispatch(loginFailure())
    }
}
