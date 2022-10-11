import Link from 'next/link'
import React from 'react'

const SignUp = () => {
  return (
    <>

    <section className="h-screen">
        <div className="  h-full">
          <div className="flex justify-between items-center h-full g-6 text-gray-800">
            <div className=" w-full md:w-1/2 lg:w-1/2  bg-white h-screen overflow-y-auto px-4 md:px-[60px] lg:px-[80px] xl:px-[100px] pt-[50px] pb-7 scrollbar">
                <div className='container mx-auto fixed top-0 right-0 left-0 w-full px-6 py-3 bg-white'>
                    <Link href="/">
                        <a>
                            <img src='/images/logo.svg'/>
                        </a>
                    </Link>
                    
                </div>
                <div className='max-w-[400px] mx-auto py-12 '>
                    <div className="mb-10 text-left">
                        <h2 className="text-4xl font-semibold text-gray-700 capitalize  mb-3">Sign Up</h2>
                        <p className="mt-3 text-gray-500 ">Get all of the plastics you need at your disposal</p>
                    </div>
                    <form>
                        <div className="mb-6">
                            <label className="text-gray-700 font-medium mb-3" for="email">Name<span>*</span></label>
                            <input id="name" type="text" placeholder="Enter your name" className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none" name="name" />
                            
                        </div>

                        <div className="mb-6">
                            <label className="text-gray-700 font-medium mb-3" for="email">Email<span>*</span></label>
                            <input id="email" type="email" placeholder="Enter your email" className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none" name="email" min="3" autocomplete="off"/>
                            
                        </div>

                        <div className="mb-6 w-full">
                            <label className="text-gray-700 font-medium mb-3" for="phone_number">Phone number<span>*</span></label>
                            <input id="phone_number" type="text" className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none transition duration-150 ease-in-out" name="phone_number" autocomplete="off"/>
                        </div>

                        <div className="mb-6 w-full">
                            <label className="text-gray-700 font-medium mb-3" for="address">Address<span>*</span></label>
                            <input id="address" type="text" className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none transition duration-150 ease-in-out" name="address" autocomplete="off"/>
                        </div>
            
                        <button type="submit" className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg  focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full">
                        Create Account
                        </button>
                
                        
                
                        <div className="flex items-center justify-center mt-5">
                            <span className="">Already have an account?</span>
                            <Link href='/login'>
                            <a className=" text-[#DD7D37] ml-2 underline">Sign In</a>
                            
                            </Link>
                        </div>
                    </form>
                </div>
              
                <div className='container mx-auto w-full px-6  mt-7'>
                    <div className='flex items-center justify-between'>
                        <div>
                            <p>&copy; gidiscrap 2022</p>
                        </div>

                        <div>
                            <a href="mailto://help@gidiscrap.com">help@gidiscrap.com</a>
                        </div>
                    </div>
                </div>
            </div>

            <div className=" left w-full md:w-1/2 lg:w-1/2 py-5 md:py-5 md:mb-0  relative hidden md:block h-full bg-slate-400">
              <div className="overlay"></div>
              <div className="flex items-center justify-center w-full h-full">
                
                <div className="flex items-center justify-center relative text-center mx-auto flex-col gap-10">
                    <img src="images/Logo_main.png" alt="Logo" className=" "/>
                    <img src="images/rafiki.png" alt="Logo" className=""/>

                </div>
              </div>
                
            </div>
            
          </div>
        </div>
    </section>

    </>
  )
}

export default SignUp