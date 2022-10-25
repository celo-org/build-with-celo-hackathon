import React from 'react'
import { Tabs } from 'react-tabs'
import Tab from 'react-tabs/lib/components/Tab'
import TabList from 'react-tabs/lib/components/TabList'
import TabPanel from 'react-tabs/lib/components/TabPanel'
import UserLayout from '../../components/UserLayout/Layout'

const Orders = () => {
  return (
    <>
        <UserLayout>
        <section className='individual__orders'>
            <div className='container mx-auto px-6'>

                <div className='h-full pb-24 px-4 md:px-12 py-12'>
                        



                            <Tabs>
                            <div className='flex items-center py-4 mb-3 flex-col lg:flex-row'>
                                <div className='flex-1 w-full'>
                                    <h3 className='h2'>Orders</h3>
                                </div>

                                <TabList className='flex flex-row items-center justify-end  tabs-header rounded-md gap-3'>
                                    <Tab className=''>
                                        <button className="flex items-center text-sm border-white border-1 px-5 py-2 rounded h-12">
                                        Pending
                                    </button>
                                    </Tab>
                                    <Tab className=''>
                                    <button className="flex items-center text-sm border-white border-1 px-5 py-2 rounded h-12">
                                        Completed
                                    </button>
                                    </Tab>
                                </TabList>
                        </div>


                                <div className='py-6'>
                                    <TabPanel>
                                    <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                                            <div className=" py-6 w-full relative">

                                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-x-12 gap-y-4">
                                                    <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
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
                                                    <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
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
                                                    <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
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
                                                    <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
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
                                                    <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
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
                                                    <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
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
                                            </div>
                                    </div>

                                    </TabPanel>
                                    <TabPanel>

                                    <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                                        <div className='flex items-center justify-center flex-col gap-4'>
                                            <img src="/images/file-not-found.svg" />
                                            <p>
                                                You have no completed orders yet.
                                            </p>
                                        </div>
                                        
                                    </div>
                                    </TabPanel>

                                </div>

                                    
                            </Tabs>

                            {/* <div className="mt-1 relative rounded-full flex-1  items-center grow flex h-12 w-full ">
                                <div className=" font-normal flex items-center justify-end flex-row gap-3 flex-1">
                            
                                    
                                    
                                </div>
                            </div> */}

                            

                        
                </div>
            </div>
        </section>
        </UserLayout>
    </>
  )
}

export default Orders


                            