import React, {useEffect, useState} from 'react'
import Link from 'next/link'
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../components/Icons/Loader';
import { login } from '../state/apiCalls/userCalls';
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';
import axios from 'axios';


const Login = () => {
    const currentYear = new Date().getFullYear();
    const user = localStorage.getItem('user');
    // const state = {
    //     email: '',
    //     username: '',
    //     password: '',
  
    //     errors: {},
    //   };
    const router = useRouter()
    const [email, setEmail] = useState("")
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState("")
      // redirect authenticated user to profile screen
    
    const toastOptions = {
        duration: 8000,
        position: 'top-center',
        // Styling
        style: {},
        className: '',
        // Custom Icon
        icon: '👏',
        // Change colors of success/error/loading icon
        iconTheme: {
            primary: 'red',
            secondary: '#fff',
        },
        // Aria
        ariaProps: {
            role: 'status',
            'aria-live': 'polite',
        },
    }

    // const {isFetching, error } = useSelector((state) => state.user);
  
    // const { loading, currentUser, error } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    useEffect(() => {
        router.prefetch('/individual/dashboard')
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
            
                try {
    
                    const res = await axios.post("http://127.0.0.1:8080/api/collectors/auth/login", {
                        email
                    })
                    if (res.data.status === true) {
                        toast.success(res.data.msg, toastOptions);
                        localStorage.setItem('user',JSON.stringify(res.data.user));
                        setLoading(false)
                        setEmail("");

                        setTimeout(()=>{
                            router.push("/individual/dashboard");
                        }, 3000)
                    }else{
                        toast.error(res.data.msg, toastOptions);
                        setError(true)

                        setTimeout(()=>{
                            setLoading(false)
                        }, 4000)
                    }

                } catch(err){
                    console.log(err)
    
                }
          

    }
    useEffect(() => {
        
        if (user) {
        router.push('/individual/dashboard')
        }
    }, [])



  return (
    <>
    <Toaster/>

        <section className="h-screen">
            <div className="  h-full">
            <div className="flex justify-between items-center h-full g-6 text-gray-800">
                <div className=" w-full md:w-1/2 lg:w-1/2  bg-white h-screen overflow-y-auto px-4 md:px-[60px] lg:px-[80px] xl:px-[100px] pt-[50px] pb-7 scrollbar ">
                    <div className='container mx-auto fixed top-0 right-0 left-0 w-full px-6 py-3 bg-white'>
                        <Link href="/">
                            <a>
                                <img src='/images/logo.svg'/>
                            </a>
                        </Link>
                        
                    </div>
                    <div className='max-w-[500px] mx-auto flex items-center h-full'>

                        <div className='w-full'>
                                <div className="mb-10 text-left">
                                <h2 className="text-4xl font-semibold text-gray-700 capitalize  mb-3">Log In</h2>
                                <p className="mt-3 text-gray-500 ">Welcome back. Please enter your details.</p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-6">
                                    <label className="text-gray-700 font-medium mb-3" htmlFor="email">Email<span>*</span></label>
                                    <input id="email" type="email" placeholder="Enter your email" className={`block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border ${error ? 'border-red-700 focus:border-red-700' : 'border-gray-200 focus:border-gray-300' }   rounded-md focus:outline-none`} name="email" min="3" autoComplete="off" onChange={(e) => setEmail(e.target.value)}/>
                                    
                                </div>

                                <button type="submit" className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full h-12" onClick={handleSubmit}>
                                 {loading === true ? (
                                        <Loader/>
                                    )
                                    : 
                                    
                                    'Log In'
                                }
                                </button>
                        
                                
                        
                                <div className="flex items-center justify-center mt-5">
                                    <span className="">Don't have an account?</span>
                                    <Link href="/signup">
                                        <a className=" text-[#DD7D37] ml-2 underline">Sign Up</a>

                                    </Link>
                                </div>
                            </form>
                        </div>
                        
                    </div>
                
                    <div className='container mx-auto w-full px-6 mt-4'>
                        <div className='flex items-center justify-between flex-wrap gap-3'>
                            <div>
                                <p>&copy; gidiscrap {currentYear}</p>
                            </div>

                            <div>
                                <a href="mailto://help@gidiscrap.com">help@gidiscrap.com</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className=" left w-full md:w-1/2 lg:w-1/2 py-5 md:py-5 md:mb-0  relative hidden md:block h-full bg-slate-400 rounded-tl-[60px] rounded-bl-[60px]" style={{'backgroundImage': 'url(/images/LoginHero.png)', 'backgroundPosition': 'center center', 'backgroundSize': 'cover', 'backgroundRepeat': 'no-repeat'}}>
                    {/* <div className="overlay"></div> */}
                    
                </div>
                
            </div>
            </div>
        </section>

    </>
  )
}

export default Login