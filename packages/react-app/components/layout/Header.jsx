import React from 'react'
import Link from 'next/link'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const Header = () => {

  return (
    <>

    <header className='bg-indigo-400 shadow-header sticky top-0 z-50'>
        <div className='container mx-auto'>
                <nav className="flex  flex-wrap items-center justify-between px-6 py-4">
                <div className="lg:order-1 w-auto lg:w-1/5 lg:text-center">
                    <Link href="/">
                        <a className="text-xl text-gray-800 font-semibold font-heading" >
                            <img src='/images/logo.svg'/>
                        </a>
                    </Link>

                    
                </div>
                <div className="block lg:hidden">
                    <button className="navbar-burger flex items-center py-2 px-3 text-indigo-500 rounded border border-indigo-500">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>
                                Menu
                            </title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z">
                            </path>
                        </svg>
                    </button>
                </div>
                <div className='hidden lg:order-2 lg:block w-full lg:w-1/2 lg:text-center'>

                    <div className="navbar-menu   ">
                        
                        <Link href="/marketplace">
                            <a className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" >
                                MarketPlace
                            </a>
                        </Link>
                        
                        <a className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" href="#">
                        How it works
                        </a>
                        <a className="block lg:inline-block mt-4 lg:mt-0 mr-10 text-blue-900 hover:text-indigo-600" href="#">
                            Features

                            <ExpandMoreIcon/>
                        </a>

                        <a className="block lg:inline-block mt-4 lg:mt-0 text-white hover:text-[#DD7D37] hover:bg-white hover:border-[#DD7D37] border bg-[#DD7D37] rounded-full px-9 py-3 transition duration-300 ease" href="#">
                        Get Started
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