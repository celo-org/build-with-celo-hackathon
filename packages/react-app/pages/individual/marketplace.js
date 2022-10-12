import React from 'react'
import DropdownIcon from '../../components/Icons/DropdownIcon'
import UserLayout from '../../components/UserLayout/Layout'

const UserMarketPlace = () => {
    
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
                                    
                                    <button className="flex items-center text-neutral700 bg-white text-sm border-gray-300 border px-5 py-2 rounded-full h-12">
                                        Select country 
                                        <span className='text-sm'>
                                        <DropdownIcon className="text-sm  "/>
                                        </span>
                                    </button>
                                    <button className="flex items-center text-neutral700 bg-white text-sm border-gray-300 border px-5 py-2 rounded-full h-12">
                                        Sort By
                                        <span className='text-sm'>
                                        <DropdownIcon className="text-sm  "/>
                                        </span>
                                    </button>
                                </div>
                        </div>


                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 gap-y-9 '>
                            <div className='card shadow-lg py-3 rounded-md'>
                                <div className=''>
                                    <div className='w-full h-56'>
                                        <img src='/images/marketimage.png' className='w-full h-full object-cover rounded-md'/>
                                    </div>
                                </div>
                                <div className=' flex items-start justify-between mt-3 px-5'>
                                    <div>
                                        <h4 className='mb-2'>PET Bottles</h4>
                                        <div className='flex items-start justify-start gap-2'>
                                            <img src='/images/location.svg' className=''/>
                                            <div>
                                                <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                <p className='text-sm text-[#6D747D]'>20 mins away from you</p>
                                            </div>
                                        
                                        </div> 
                                    
                                    </div>
                                    <div>
                                        <div className="radial-progress text-sm text-center text-[#DD7D37]" style={{'--value':25, '--size': '4rem'}}>
                                            
                                            <span className='text-[#6D747D]'><span className='font-semibold text-[#3D4044]'>25%</span> gotten</span> 
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
                                <div className=' flex items-start justify-between mt-3 px-5'>
                                    <div>
                                        <h4 className='mb-2'>PET Bottles</h4>
                                        <div className='flex items-start justify-start gap-2'>
                                            <img src='/images/location.svg' className=''/>
                                            <div>
                                                <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                <p className='text-sm text-[#6D747D]'>20 mins away from you</p>
                                            </div>
                                        
                                        </div> 
                                    
                                    </div>
                                    <div>
                                        <div className="radial-progress text-sm text-center text-[#DD7D37]" style={{'--value':25, '--size': '4rem'}}>
                                            
                                            <span className='text-[#6D747D]'><span className='font-semibold text-[#3D4044]'>25%</span> gotten</span> 
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
                                <div className=' flex items-start justify-between mt-3 px-5'>
                                    <div>
                                        <h4 className='mb-2'>PET Bottles</h4>
                                        <div className='flex items-start justify-start gap-2'>
                                            <img src='/images/location.svg' className=''/>
                                            <div>
                                                <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                <p className='text-sm text-[#6D747D]'>20 mins away from you</p>
                                            </div>
                                        
                                        </div> 
                                    
                                    </div>
                                    <div>
                                        <div className="radial-progress text-sm text-center text-[#DD7D37]" style={{'--value':25, '--size': '4rem'}}>
                                            
                                            <span className='text-[#6D747D]'><span className='font-semibold text-[#3D4044]'>25%</span> gotten</span> 
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
                                <div className=' flex items-start justify-between mt-3 px-5'>
                                    <div>
                                        <h4 className='mb-2'>PET Bottles</h4>
                                        <div className='flex items-start justify-start gap-2'>
                                            <img src='/images/location.svg' className=''/>
                                            <div>
                                                <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                <p className='text-sm text-[#6D747D]'>20 mins away from you</p>
                                            </div>
                                        
                                        </div> 
                                    
                                    </div>
                                    <div>
                                        <div className="radial-progress text-sm text-center text-[#DD7D37]" style={{'--value':25, '--size': '4rem'}}>
                                            
                                            <span className='text-[#6D747D]'><span className='font-semibold text-[#3D4044]'>25%</span> gotten</span> 
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

export default UserMarketPlace