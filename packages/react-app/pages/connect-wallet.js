import React, {useState} from 'react'
import Link from 'next/link'
import DropdownIcon from '../components/Icons/DropdownIcon';



const ConnectWallet = () => {
    const [showFormDropdown, setShowFormDropdown] = useState();

    const toggleFormDropdown = () =>{
        setShowFormDropdown(!showFormDropdown);
    }

    const currentYear = new Date().getFullYear();

  return (
    <>
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
                            <div className='max-w-[500px] mx-auto flex items-center h-full my-8'>

                                <div className='w-full'>
                                        <div className="mb-10 text-left">
                                        <h2 className="text-4xl font-semibold text-gray-700 capitalize  mb-3">Connect Wallet</h2>
                                        <p className="mt-3 text-gray-500 ">Kindly connect wallet in order to place offer on the marketplace</p>
                                    </div>
                                    <form>
                                        {/* <div className="mb-6">
                                            <label className="text-gray-700 font-medium mb-3" for="email">Wallet Type<span>*</span></label>
                                            <input id="email" type="email" placeholder="Enter your email" className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 focus:border-gray-300 rounded-md focus:outline-none" name="email" min="3" autocomplete="off"/>
                                            
                                        </div> */}
                                        <div className="mb-6">
                                            <div className="flex justify-between items-center">                                
                                                <label className="text-gray-700 font-medium" htmlFor="token">Wallet Type<span>*</span></label>
                                            </div>
                                            <div className="dropdown relative grow mb-4 w-full" data-large-dropdown="">
                                                <button className="w-full bg-white h-12 focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" id="token" data-large-dropdown-btn="" type="button" onClick={toggleFormDropdown}>
                                                    <span className="pointer-events-none flex items-center gap-2 text-gray-600">
                                                        <img src="/images/metamask.png" className='h-8 w-8'/>

                                                        Metamask
                                                    </span>
                                                    <span className="pointer-events-none ">
                                                        <DropdownIcon />
                                                    </span>
                                                </button>

                                                

                                                    <div className={` absolute border bg-white form-submenu ${showFormDropdown ? 'show' : ''} large-dropdown px-3 py-3 shadow-md rounded-md w-full h-40 max-w-full overflow-y-auto scrollbar-change fade-in`}>
                                                                
                                                        
                                                        <div className=" py-4">
                                                            
                                                            <button className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                                <div className="flex items-center justify-center gap-2 pr-2">
                                                                    <img src="/images/metamask.png" className='h-8 w-8'/>
                                                                </div>
                                                                <div className="flex grow flex-col justify-center items-start text-left">
                                                                        <p className="text-neutral700 font-normal text-base">MetaMask</p>
                                                                </div>
                                                            </button>
                                                            <button className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                                <div className="flex items-center justify-center gap-2 pr-2">
                                                                    <img src="/images/metamask.png" className='h-8 w-8'/>
                                                                </div>
                                                                <div className="flex grow flex-col justify-center items-start text-left">
                                                                        <p className="text-neutral700 font-normal text-base">MetaMask</p>
                                                                </div>
                                                            </button>
                                                            <button className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                                <div className="flex items-center justify-center gap-2 pr-2">
                                                                    <img src="/images/metamask.png" className='h-8 w-8'/>
                                                                </div>
                                                                <div className="flex grow flex-col justify-center items-start text-left">
                                                                        <p className="text-neutral700 font-normal text-base">MetaMask</p>
                                                                </div>
                                                            </button>
                                                        
                                                        </div>
                                                </div>
                                            
                                            </div>
                                        </div>

                                        <button type="submit" className="inline-block px-7 py-3 text-white font-medium text-sm leading-snug uppercase rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-0  active:shadow-lg transition duration-150 ease-in-out w-full">
                                        Create Account
                                        </button>
                                
                                        
                                
                                        <div className="flex items-center justify-center mt-5">
                                            <span className="">Don't have any wallet?</span>
                                            <Link href="/signup">
                                                <a className=" text-[#DD7D37] ml-2 underline">Find out how</a>

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

                    <div className=" left w-full md:w-1/2 lg:w-1/2 py-5 md:py-5 md:mb-0  relative hidden md:block h-full bg-slate-400 rounded-tl-[60px] rounded-bl-[60px]" style={{'backgroundImage': 'url(/images/SignUpHero.png)', 'backgroundPosition': 'center center', 'backgroundSize': 'cover', 'backgroundRepeat': 'no-repeat'}}>
                        <div className="overlay"></div>
                        
                    </div>
                    
                </div>
            </div>
        </section>
    </>
  )
}

export default ConnectWallet