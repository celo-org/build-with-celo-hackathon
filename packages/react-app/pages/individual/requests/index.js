import Link from 'next/link'
import React from 'react'
import DropdownIcon from '../../../components/Icons/DropdownIcon'
import UserLayout from '../../../components/UserLayout/Layout'

const Requests = () => {
    
  return (
        <>
        <UserLayout>

            <div>
                
                <section className='py-12'>
                    <div className='container mx-auto px-6'>

                        <div className='px-6 '>

                        <div className='flex items-center py-4 mb-6 flex-col lg:flex-row'>
                            <div className='flex-1 w-full'>
                                <h3 className='h2'>Requests</h3>
                            </div>

                            <div className="mt-1 relative rounded-full flex-1  items-center grow flex h-12 w-full ">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none h-full">
                                            <span className="text-gray-500 px-3">
                                                <svg width="22" height="22" viewBox="0 0 20 20" className="mr-3 pr-2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="#9998A9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    <path d="M17.5 17.5L13.875 13.875" stroke="#9998A9" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                    </svg>
                                            </span>
                                        </div>
                                        <input type="text" name="price" id="price" className="border border-gray-300 py-2 px-4  block w-full pl-12 pr-12 sm:text-sm rounded-full h-full focus:outline-none focus:border-gray-400" placeholder="Search for different scaps, company"/>
                                        
                                    </div>

                            <div className=" font-normal flex items-center justify-start lg:justify-end flex-row gap-3 flex-1 w-full">
                                    
                                    {/* <button className="flex items-center text-neutral700 bg-white text-sm border-gray-300 border px-5 py-2 rounded-full h-12">
                                        Select country 
                                        <span className='text-sm'>
                                        <DropdownIcon className="text-sm  "/>
                                        </span>
                                    </button> */}
                                    <span className='flex items-center text-gray-400 bg-white text-sm border-gray-300 border px-5 py-2 rounded-full h-12 gap-5'>
                                        Sort By:
                                        <button className="flex items-center text-gray-600 ">
                                        All
                                            <span className='text-sm'>
                                            <DropdownIcon className="text-sm  "/>
                                            </span>
                                        </button>
                                    </span>
                                    
                                </div>
                        </div>


                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-9 gap-y-9 '>
                            <Link href='/individual/requests/50'>
                            
                                <a>

                                    <div className='card shadow-lg py-3 rounded-md'>
                                        <div className=''>
                                            <div className='w-full h-56'>
                                                <img src='/images/marketimage.png' className='w-full h-full object-cover rounded-md'/>
                                            </div>
                                        </div>
                                        <div className=' flex items-start justify-between mt-3 px-5 py-4 flex-col w-full gap-2'>
                                            <div className='flex items-center justify-between w-full'>
                                                <h4 className='font-semibold text-[#3D4044] text-lg'>Jana Plasteeks LTD</h4>
                                                <p>PET Bottles</p>
                                            </div>

                                            
                                            <div  className='flex items-center justify-between w-full'>
                                                <div className='flex items-center justify-start gap-2'>
                                                    <img src='/images/location.svg' className=''/>
                                                    <div>
                                                        <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                    </div>
                                                </div> 

                                                <h4 className=''>300kg</h4>
                                            </div>
                                            <div className='flex items-start justify-between w-full gap-2'>
                                                <p className='flex-1 text-xs text-[#878A90]'>By working in partnership with local collectors and recycling...</p>
                                                    <div className='flex items-end justify-start flex-col gap-1 flex-1'>
                                                        <p className='text-xs'>Request expires in:</p>
                                                        <div>
                                                            <p className='text-base text-[#3D4044] font-semibold'>12d : 24h : 34m : 32s</p>
                                                        </div>
                                                    </div> 

                                                    
                                                </div>
                                            
                                        </div>
                                    </div>
                                </a>
                            </Link>
                            <div className='card shadow-lg py-3 rounded-md'>
                                <div className=''>
                                    <div className='w-full h-56'>
                                        <img src='/images/marketimage.png' className='w-full h-full object-cover rounded-md'/>
                                    </div>
                                </div>
                                <div className=' flex items-start justify-between mt-3 px-5 py-4 flex-col w-full gap-2'>
                                    <div className='flex items-center justify-between w-full'>
                                        <h4 className='font-semibold text-[#3D4044] text-lg'>Jana Plasteeks LTD</h4>
                                        <p>PET Bottles</p>
                                    </div>

                                    
                                    <div  className='flex items-center justify-between w-full'>
                                        <div className='flex items-center justify-start gap-2'>
                                            <img src='/images/location.svg' className=''/>
                                            <div>
                                                <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                            </div>
                                        </div> 

                                        <h4 className=''>300kg</h4>
                                    </div>
                                    <div className='flex items-start justify-between w-full gap-2'>
                                        <p className='flex-1 text-xs text-[#878A90]'>By working in partnership with local collectors and recycling...</p>
                                            <div className='flex items-end justify-start flex-col gap-1 flex-1'>
                                                <p className='text-xs'>Request expires in:</p>
                                                <div>
                                                    <p className='text-base text-[#3D4044] font-semibold'>12d : 24h : 34m : 32s</p>
                                                </div>
                                            </div> 

                                            
                                        </div>
                                    
                                </div>
                            </div>
                            <div className='card shadow-lg py-3 rounded-md'>
                                <div className=''>
                                    <div className='w-full h-56'>
                                        <img src='/images/marketimage.png' className='w-full h-full object-cover rounded-md'/>
                                    </div>
                                </div>
                                <div className=' flex items-start justify-between mt-3 px-5 py-4 flex-col w-full gap-2'>
                                    <div className='flex items-center justify-between w-full'>
                                        <h4 className='font-semibold text-[#3D4044] text-lg'>Jana Plasteeks LTD</h4>
                                        <p>PET Bottles</p>
                                    </div>

                                    
                                    <div  className='flex items-center justify-between w-full'>
                                        <div className='flex items-center justify-start gap-2'>
                                            <img src='/images/location.svg' className=''/>
                                            <div>
                                                <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                            </div>
                                        </div> 

                                        <h4 className=''>300kg</h4>
                                    </div>
                                    <div className='flex items-start justify-between w-full gap-2'>
                                        <p className='flex-1 text-xs text-[#878A90]'>By working in partnership with local collectors and recycling...</p>
                                            <div className='flex items-end justify-start flex-col gap-1 flex-1'>
                                                <p className='text-xs'>Request expires in:</p>
                                                <div>
                                                    <p className='text-base text-[#3D4044] font-semibold'>12d : 24h : 34m : 32s</p>
                                                </div>
                                            </div> 

                                            
                                        </div>
                                    
                                </div>
                            </div>
                            <div className='card shadow-lg py-3 rounded-md'>
                                <div className=''>
                                    <div className='w-full h-56'>
                                        <img src='/images/marketimage.png' className='w-full h-full object-cover rounded-md'/>
                                    </div>
                                </div>
                                <div className=' flex items-start justify-between mt-3 px-5 py-4 flex-col w-full gap-2'>
                                    <div className='flex items-center justify-between w-full'>
                                        <h4 className='font-semibold text-[#3D4044] text-lg'>Jana Plasteeks LTD</h4>
                                        <p>PET Bottles</p>
                                    </div>

                                    
                                    <div  className='flex items-center justify-between w-full'>
                                        <div className='flex items-center justify-start gap-2'>
                                            <img src='/images/location.svg' className=''/>
                                            <div>
                                                <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                            </div>
                                        </div> 

                                        <h4 className=''>300kg</h4>
                                    </div>
                                    <div className='flex items-start justify-between w-full gap-2'>
                                        <p className='flex-1 text-xs text-[#878A90]'>By working in partnership with local collectors and recycling...</p>
                                            <div className='flex items-end justify-start flex-col gap-1 flex-1'>
                                                <p className='text-xs'>Request expires in:</p>
                                                <div>
                                                    <p className='text-base text-[#3D4044] font-semibold'>12d : 24h : 34m : 32s</p>
                                                </div>
                                            </div> 

                                            
                                        </div>
                                    
                                </div>
                            </div>
                            <div className='card shadow-lg py-3 rounded-md'>
                                <div className=''>
                                    <div className='w-full h-56'>
                                        <img src='/images/marketimage.png' className='w-full h-full object-cover rounded-md'/>
                                    </div>
                                </div>
                                <div className=' flex items-start justify-between mt-3 px-5 py-4 flex-col w-full gap-2'>
                                    <div className='flex items-center justify-between w-full'>
                                        <h4 className='font-semibold text-[#3D4044] text-lg'>Jana Plasteeks LTD</h4>
                                        <p>PET Bottles</p>
                                    </div>

                                    
                                    <div  className='flex items-center justify-between w-full'>
                                        <div className='flex items-center justify-start gap-2'>
                                            <img src='/images/location.svg' className=''/>
                                            <div>
                                                <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                            </div>
                                        </div> 

                                        <h4 className=''>300kg</h4>
                                    </div>
                                    <div className='flex items-start justify-between w-full gap-2'>
                                        <p className='flex-1 text-xs text-[#878A90]'>By working in partnership with local collectors and recycling...</p>
                                            <div className='flex items-end justify-start flex-col gap-1 flex-1'>
                                                <p className='text-xs'>Request expires in:</p>
                                                <div>
                                                    <p className='text-base text-[#3D4044] font-semibold'>12d : 24h : 34m : 32s</p>
                                                </div>
                                            </div> 

                                            
                                        </div>
                                    
                                </div>
                            </div>
                            <div className='card shadow-lg py-3 rounded-md'>
                                <div className=''>
                                    <div className='w-full h-56'>
                                        <img src='/images/marketimage.png' className='w-full h-full object-cover rounded-md'/>
                                    </div>
                                </div>
                                <div className=' flex items-start justify-between mt-3 px-5 py-4 flex-col w-full gap-2'>
                                    <div className='flex items-center justify-between w-full'>
                                        <h4 className='font-semibold text-[#3D4044] text-lg'>Jana Plasteeks LTD</h4>
                                        <p>PET Bottles</p>
                                    </div>

                                    
                                    <div  className='flex items-center justify-between w-full'>
                                        <div className='flex items-center justify-start gap-2'>
                                            <img src='/images/location.svg' className=''/>
                                            <div>
                                                <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                            </div>
                                        </div> 

                                        <h4 className=''>300kg</h4>
                                    </div>
                                    <div className='flex items-start justify-between w-full gap-2'>
                                        <p className='flex-1 text-xs text-[#878A90]'>By working in partnership with local collectors and recycling...</p>
                                            <div className='flex items-end justify-start flex-col gap-1 flex-1'>
                                                <p className='text-xs'>Request expires in:</p>
                                                <div>
                                                    <p className='text-base text-[#3D4044] font-semibold'>12d : 24h : 34m : 32s</p>
                                                </div>
                                            </div> 

                                            
                                        </div>
                                    
                                </div>
                            </div>
                                        
                        </div>

                        <div className='flex items-center justify-center mt-8'>
                                        <a href='' className='text-[#DD7D37] px-12 py-2 text-sm border border-[#DD7D37] rounded-full'>Load More</a>
                                    </div>

                        </div>                
                    </div>  
                
                </section>

            </div>


            </UserLayout>
        </>

    )
}

export default Requests