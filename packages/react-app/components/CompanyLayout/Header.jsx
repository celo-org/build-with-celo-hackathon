import Link from 'next/link'
import React, {useState} from 'react'
import DropdownIcon from '../Icons/DropdownIcon'
import NotificationIcon from '../Icons/NotificationIcon'
import {useRouter} from 'next/router'
import SettingsIcon from '../Icons/SettingsIcon'
import ExpandMoreHorizontal from '../Icons/ExpandMoreHorizontal'

const Header = () => {
    const [showMobile, setShowMobile] = useState()
    const [showUserMenu, setShowUserMenu] = useState()
    const router = useRouter()

    const ToggleMobileMenu = () =>{
        setShowMobile(!showMobile);
    }

    const ToggleUserMenu = () =>{
        setShowUserMenu(!showUserMenu);
    }
  return (
    <>

        <header className='bg-white shadow-header sticky top-0 z-10'>
            <div className='container mx-auto'>
                <nav className="flex items-center justify-between flex-wrap  px-6 py-4 ">
                    <div className="flex items-center flex-shrink-0 text-white mr-6">
                        <Link href="/">
                            <a className="text-xl text-gray-800 font-semibold font-heading" >
                                <img src='/images/logo.svg'/>
                            </a>
                        </Link>
                    </div>
                    <div className="block lg:hidden">
                        <div className='flex gap-5'>
                            <span className=" px-3 py-2 text-[#DF9E05] bg-[#FEF9ED] transition duration-150 ease-in-out flex items-center justify-center h-9 w-9  rounded-full focus:outline-none focus:ring-0 relative ">
                                RW 
                                <span className='absolute h-2 w-2 bg-[#45CD85] right-0 bottom-0 rounded-full'></span>
                            </span>

                            <button className="flex items-center  px-3 py-2 border rounded text-[#45CD85] border-[#45CD85] " onClick={ToggleMobileMenu}>
                            <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                            </button>
                        </div>
                        
                    </div>
                    <div className="w-full hidden  flex-grow lg:flex lg:items-center lg:w-auto">
                        <div className="text-sm lg:flex-grow">
                            <Link href="/company/dashboard">
                                <a className={`block mt-4 lg:inline-block lg:mt-0 text-[#5B5B5B]  hover:bg-[#FEF0E6] px-3 py-3 mr-4 rounded-md transition-all duration-200 ease-in-out ${router.asPath === "/company/dashboard" && 'bg-[#FEF0E6]'}`}>
                                    Dashboard
                                </a>
                            </Link>
                            
                            <Link href="/company/offers">
                                <a className={`block mt-4 lg:inline-block lg:mt-0 text-[#5B5B5B]  hover:bg-[#FEF0E6] px-3 py-3 mr-4 rounded-md transition-all duration-200 ease-in-out ${(router.asPath === "/company/offers" || router.asPath === "/company/dropoffs") && 'bg-[#FEF0E6]'}`}>
                                    Offers
                                </a>
                            </Link>
                            <Link href="/company/dashboard">
                                <a className={`block mt-4 lg:inline-block lg:mt-0 text-[#5B5B5B]  hover:bg-[#FEF0E6] px-3 py-3 mr-4 rounded-md transition-all duration-200 ease-in-out ${router.asPath === "/transfer" && 'bg-[#FEF0E6]'}`}>
                                    Disputes
                                </a>
                            </Link>
                            
                            
                        </div>
                        <div className='lg:flex lg:items-center lg:w-auto'>
                            <div className="flex items-center justify-center relative gap-4 px-4 border-r border-r-border-border_cl">
                                <div className=' relative' >
                                    <button className='flex items-center gap-2 bg-gray-100 py-3 px-5 rounded-full' onClick={ToggleUserMenu}>
                                        <div className="flex items-start justify-start flex-col">
                                            <span className="text-sm">0x346932...gq382nk</span>
                                        </div>
                                        <ExpandMoreHorizontal/>
                                    </button>
                                    
                                    

                                    <div className={`absolute user-menu ${showUserMenu ? 'show' : ''} dropdown-menu large-dropdown shadow-md rounded-md w-full border-0 fade-in transition duration-300 ease bg-white`} >
                                        
                                            <div className=" py-2">
                                                <button className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 ">
                                                    <span className="mr-3">

                                                        
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.89844 7.55999C9.20844 3.95999 11.0584 2.48999 15.1084 2.48999H15.2384C19.7084 2.48999 21.4984 4.27999 21.4984 8.74999V15.27C21.4984 19.74 19.7084 21.53 15.2384 21.53H15.1084C11.0884 21.53 9.23844 20.08 8.90844 16.54" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M15.0011 12H3.62109" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                            
                                                    </span>
                                                    Sign Out
                                                </button>
                                            </div>
                                    </div>
                                </div>
                                

                            </div>
                            <a href="#" className="inline-block text-sm ml-4 px-2  py-2 leading-none rounded text-[#667085] hover:bg-white lg:mt-0 mr-2"><SettingsIcon/></a>
                            <a href="#" className="inline-block text-sm mr-2 px-2 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white lg:mt-0"><NotificationIcon/></a>
                            <span className="inline-block text-sm leading-none rounded-full border-[#FDEFE5] border-4 lg:mt-0 w-12 h-12 ml-2"><img src='/images/avatar-1.png' className='w-full h-full object-cover rounded-full'/></span>
                        </div>
                    </div>
                </nav>
            </div>
        </header>


    </>
  )
}

export default Header