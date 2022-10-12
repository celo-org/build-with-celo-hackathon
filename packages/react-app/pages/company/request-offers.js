import React from 'react'
import CompanyLayout from '../../components/CompanyLayout/Layout'
import DropdownIcon from '../../components/Icons/DropdownIcon'

const RequestOffers = () => {
  return (
    <>
        <CompanyLayout>

        <section>
            <div className='container mx-auto px-6'>

                <div className='h-full pb-24 px-4 md:px-12 py-12'>
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

                            
                        </div>

                        <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded">
                            <div className=" grid grid-cols-2 py-6 w-full gap-6 relative">

                                <div className=" flex flex-col">
                                    <div className="flex items-center py-4 px-4 mb-2 text-sm w-full border-b bg-gray-100 border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
                                        <div className="flex items-start gap-4 w-full">

                                            <div className='h-12 w-12 '>
                                                <img src='/images/Avatar.png' className='w-full object-cover rounded-full  '/>
                                            </div>
                                    
                                            <div  className='w-full grow'>
                                                <div className="flex gap-1 items-center flex-row justify-between w-full">
                                                    <p className="text-lg text-[#5B5B5B] font-semibold">Demi Wikinson <span className='font-thin text-graay-400 text-xs'>2 mins ago</span></p>

                                                </div>
                                                <div className="flex gap-1 flex-row justify-between items-center w-full">
                                                    <p className="text-sm  text-[#5B2D0B] font-normal"><span className='font-thin text-[#5B5B5B] text-xs'>Deposited</span> 10kg 0f PET Bottles</p>
                                                </div>
                                                <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                                    <div className='p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center'>
                                                        <img src="/images/Icon.png" alt="" />
                                                    </div>
                                                    <div className="flex gap-1 flex-col items-start w-full">
                                                        <p className="text-base  text-[#344054] font-normal"> 10kg 0f PET Bottles</p>
                                                        <p className="text-sm  text-[#667085] font-normal">720KB</p>
                                                    </div>
                                                </div>
                                            
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    <div className="flex items-center py-4 px-4 mb-2 text-sm w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
                                        <div className="flex items-start gap-4 w-full">

                                            <div className='h-12 w-12 '>
                                                <img src='/images/Avatar.png' className='w-full object-cover rounded-full  '/>
                                            </div>
                                    
                                            <div  className='w-full grow'>
                                                <div className="flex gap-1 items-center flex-row justify-between w-full">
                                                    <p className="text-lg text-[#5B5B5B] font-semibold">Demi Wikinson <span className='font-thin text-graay-400 text-xs'>2 mins ago</span></p>

                                                </div>
                                                <div className="flex gap-1 flex-row justify-between items-center w-full">
                                                    <p className="text-sm  text-[#5B2D0B] font-normal"><span className='font-thin text-[#5B5B5B] text-xs'>Deposited</span> 10kg 0f PET Bottles</p>
                                                </div>
                                                <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                                    <div className='p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center'>
                                                        <img src="/images/Icon.png" alt="" />
                                                    </div>
                                                    <div className="flex gap-1 flex-col items-start w-full">
                                                        <p className="text-base  text-[#344054] font-normal"> 10kg 0f PET Bottles</p>
                                                        <p className="text-sm  text-[#667085] font-normal">720KB</p>
                                                    </div>
                                                </div>
                                            
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    <div className="flex items-center py-4 px-4 mb-2 text-sm w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
                                        <div className="flex items-start gap-4 w-full">

                                            <div className='h-12 w-12 '>
                                                <img src='/images/Avatar.png' className='w-full object-cover rounded-full  '/>
                                            </div>
                                    
                                            <div  className='w-full grow'>
                                                <div className="flex gap-1 items-center flex-row justify-between w-full">
                                                    <p className="text-lg text-[#5B5B5B] font-semibold">Demi Wikinson <span className='font-thin text-graay-400 text-xs'>2 mins ago</span></p>

                                                </div>
                                                <div className="flex gap-1 flex-row justify-between items-center w-full">
                                                    <p className="text-sm  text-[#5B2D0B] font-normal"><span className='font-thin text-[#5B5B5B] text-xs'>Deposited</span> 10kg 0f PET Bottles</p>
                                                </div>
                                                <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                                    <div className='p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center'>
                                                        <img src="/images/Icon.png" alt="" />
                                                    </div>
                                                    <div className="flex gap-1 flex-col items-start w-full">
                                                        <p className="text-base  text-[#344054] font-normal"> 10kg 0f PET Bottles</p>
                                                        <p className="text-sm  text-[#667085] font-normal">720KB</p>
                                                    </div>
                                                </div>
                                            
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    <div className="flex items-center py-4 px-4 mb-2 text-sm w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
                                        <div className="flex items-start gap-4 w-full">

                                            <div className='h-12 w-12 '>
                                                <img src='/images/Avatar.png' className='w-full object-cover rounded-full  '/>
                                            </div>
                                    
                                            <div  className='w-full grow'>
                                                <div className="flex gap-1 items-center flex-row justify-between w-full">
                                                    <p className="text-lg text-[#5B5B5B] font-semibold">Demi Wikinson <span className='font-thin text-graay-400 text-xs'>2 mins ago</span></p>

                                                </div>
                                                <div className="flex gap-1 flex-row justify-between items-center w-full">
                                                    <p className="text-sm  text-[#5B2D0B] font-normal"><span className='font-thin text-[#5B5B5B] text-xs'>Deposited</span> 10kg 0f PET Bottles</p>
                                                </div>
                                                <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                                    <div className='p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center'>
                                                        <img src="/images/Icon.png" alt="" />
                                                    </div>
                                                    <div className="flex gap-1 flex-col items-start w-full">
                                                        <p className="text-base  text-[#344054] font-normal"> 10kg 0f PET Bottles</p>
                                                        <p className="text-sm  text-[#667085] font-normal">720KB</p>
                                                    </div>
                                                </div>
                                            
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    <div className="flex items-center py-4 px-4 mb-2 text-sm w-full hover:bg-gray-100 transition duration-200 ease-in-out">
                                        <div className="flex items-start gap-4 w-full">

                                            <div className='h-12 w-12 '>
                                                <img src='/images/Avatar.png' className='w-full object-cover rounded-full  '/>
                                            </div>
                                    
                                            <div  className='w-full grow'>
                                                <div className="flex gap-1 items-center flex-row justify-between w-full">
                                                    <p className="text-lg text-[#5B5B5B] font-semibold">Demi Wikinson <span className='font-thin text-graay-400 text-xs'>2 mins ago</span></p>

                                                </div>
                                                <div className="flex gap-1 flex-row justify-between items-center w-full">
                                                    <p className="text-sm  text-[#5B2D0B] font-normal"><span className='font-thin text-[#5B5B5B] text-xs'>Deposited</span> 10kg 0f PET Bottles</p>
                                                </div>
                                                <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                                    <div className='p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center'>
                                                        <img src="/images/Icon.png" alt="" />
                                                    </div>
                                                    <div className="flex gap-1 flex-col items-start w-full">
                                                        <p className="text-base  text-[#344054] font-normal"> 10kg 0f PET Bottles</p>
                                                        <p className="text-sm  text-[#667085] font-normal">720KB</p>
                                                    </div>
                                                </div>
                                            
                                            </div>
                                            
                                            
                                        </div>
                                    </div>


                                </div>

                                <div>
                                    <div className='py-4'>
                                        lvelvm
                                    </div>
                                </div>


                            </div>
                        </div>
                </div>
            </div>
        </section>
        </CompanyLayout>

    </>
  )
}

export default RequestOffers