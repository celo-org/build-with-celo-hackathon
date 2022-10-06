import React from 'react'

const Header = () => {
  return (
    <>

    <header className='bg-indigo-400 shadow-header'>
        <div className='container mx-auto'>
                <nav class="flex  flex-wrap items-center justify-between p-4">
                <div class="lg:order-1 w-auto lg:w-1/5 lg:text-center">
                    <a class="text-xl text-gray-800 font-semibold font-heading" href="#">
                        <img src='/images/logo.svg'/>
                    </a>
                </div>
                {/* <div class="block lg:hidden">
                    <button class="navbar-burger flex items-center py-2 px-3 text-indigo-500 rounded border border-indigo-500">
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>
                                Menu
                            </title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z">
                            </path>
                        </svg>
                    </button>
                </div> */}
                <div className='hidden lg:order-2 lg:block w-full lg:w-1/2 lg:text-center'>

                    <div class="navbar-menu   ">
                        <a class="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" href="#">
                            MarketPlace
                        </a>
                        <a class="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" href="#">
                        Features
                        </a>
                        <a class="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" href="#">
                        How it works
                        </a>

                        <a class="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" href="#">
                        Log In
                        </a>
                        <a class="block lg:inline-block mt-4 lg:mt-0 text-blue-900 hover:text-indigo-600 border rounded-full px-5 py-4" href="#">
                        Sign Up for Free
                        </a>
                    </div>

                </div>
               
            </nav>
        </div>
        
    </header>
    </>
  )
}

export default Header