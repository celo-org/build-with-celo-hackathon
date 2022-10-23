import Link from 'next/link'
import React from 'react'
import { Tabs } from 'react-tabs'
import Tab from 'react-tabs/lib/components/Tab'
import TabList from 'react-tabs/lib/components/TabList'
import TabPanel from 'react-tabs/lib/components/TabPanel'
import UserLayout from '../../components/UserLayout/Layout'

const transactions = () => {
  return (
    <>
    

        <UserLayout>
        <section className='individual__orders'>
            <div className='container mx-auto px-6'>

                <div className='h-full pb-24 px-4 md:px-12 py-12'>
                        



                            <Tabs>
                            <div className='flex items-center py-4 mb-3 flex-col lg:flex-row'>
                                <div className='flex-1 w-full'>
                                    <h3 className='h2'>Transactions</h3>
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


                                <div className=' py-6'>
                                    <TabPanel>
                                    <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full fade-in">
                                        <div className='absolute h-full border border-[#E4E7EC] inset-0 z-0 mx-auto w-[0.25px] hidden md:block'></div>

                                            <div className=" py-6 w-full relative">

                                                <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-x-12 gap-y-4">
                                                    <div className="flex items-start gap-4 mb-7 px-4">
                                                        <div className='h-2 w-2 bg-[#DD7D37] rounded-full mt-2'></div>

                                                        <div className='flex items-start justify-between gap-9 w-full md:w-2/3 '>
                                                            <div className=' flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1] text-base'>Received <span className='font-bold text-[#3D4044]'>$250 </span></h3>

                                                                <span className='text-[#3D4044] text-sm font-medium underline'>25kg of PET Bottles</span>
                                                            </div>
                                                            <div className='text-base flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1]'>20th Oct. 2022</h3>

                                                                <Link href="">
                                                                    <a className='text-[#DD7D37] text-xs underline italic'>View on etherscan</a>
                                                                </Link>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4 mb-7 px-4">
                                                        <div className='h-2 w-2 bg-[#DD7D37] rounded-full mt-2'></div>

                                                        <div className='flex items-start justify-between gap-9 w-full md:w-2/3 '>
                                                            <div className=' flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1] text-base'>Received <span className='font-bold text-[#3D4044]'>$250 </span></h3>

                                                                <span className='text-[#3D4044] text-sm font-medium underline'>25kg of PET Bottles</span>
                                                            </div>
                                                            <div className='text-base flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1]'>20th Oct. 2022</h3>

                                                                <Link href="">
                                                                    <a className='text-[#DD7D37] text-xs underline italic'>View on etherscan</a>
                                                                </Link>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4 mb-7 px-4">
                                                        <div className='h-2 w-2 bg-[#DD7D37] rounded-full mt-2'></div>

                                                        <div className='flex items-start justify-between gap-9 w-full md:w-2/3 '>
                                                            <div className=' flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1] text-base'>Received <span className='font-bold text-[#3D4044]'>$250 </span></h3>

                                                                <span className='text-[#3D4044] text-sm font-medium underline'>25kg of PET Bottles</span>
                                                            </div>
                                                            <div className='text-base flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1]'>20th Oct. 2022</h3>

                                                                <Link href="">
                                                                    <a className='text-[#DD7D37] text-xs underline italic'>View on etherscan</a>
                                                                </Link>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4 mb-7 px-4">
                                                        <div className='h-2 w-2 bg-[#DD7D37] rounded-full mt-2'></div>

                                                        <div className='flex items-start justify-between gap-9 w-full md:w-2/3 '>
                                                            <div className=' flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1] text-base'>Received <span className='font-bold text-[#3D4044]'>$250 </span></h3>

                                                                <span className='text-[#3D4044] text-sm font-medium underline'>25kg of PET Bottles</span>
                                                            </div>
                                                            <div className='text-base flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1]'>20th Oct. 2022</h3>

                                                                <Link href="">
                                                                    <a className='text-[#DD7D37] text-xs underline italic'>View on etherscan</a>
                                                                </Link>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4 mb-7 px-4">
                                                        <div className='h-2 w-2 bg-[#DD7D37] rounded-full mt-2'></div>

                                                        <div className='flex items-start justify-between gap-9 w-full md:w-2/3 '>
                                                            <div className=' flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1] text-base'>Received <span className='font-bold text-[#3D4044]'>$250 </span></h3>

                                                                <span className='text-[#3D4044] text-sm font-medium underline'>25kg of PET Bottles</span>
                                                            </div>
                                                            <div className='text-base flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1]'>20th Oct. 2022</h3>

                                                                <Link href="">
                                                                    <a className='text-[#DD7D37] text-xs underline italic'>View on etherscan</a>
                                                                </Link>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4 mb-7 px-4">
                                                        <div className='h-2 w-2 bg-[#DD7D37] rounded-full mt-2'></div>

                                                        <div className='flex items-start justify-between gap-9 w-full md:w-2/3 '>
                                                            <div className=' flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1] text-base'>Received <span className='font-bold text-[#3D4044]'>$250 </span></h3>

                                                                <span className='text-[#3D4044] text-sm font-medium underline'>25kg of PET Bottles</span>
                                                            </div>
                                                            <div className='text-base flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1]'>20th Oct. 2022</h3>

                                                                <Link href="">
                                                                    <a className='text-[#DD7D37] text-xs underline italic'>View on etherscan</a>
                                                                </Link>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4 mb-7 px-4">
                                                        <div className='h-2 w-2 bg-[#DD7D37] rounded-full mt-2'></div>

                                                        <div className='flex items-start justify-between gap-9 w-full md:w-2/3 '>
                                                            <div className=' flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1] text-base'>Received <span className='font-bold text-[#3D4044]'>$250 </span></h3>

                                                                <span className='text-[#3D4044] text-sm font-medium underline'>25kg of PET Bottles</span>
                                                            </div>
                                                            <div className='text-base flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1]'>20th Oct. 2022</h3>

                                                                <Link href="">
                                                                    <a className='text-[#DD7D37] text-xs underline italic'>View on etherscan</a>
                                                                </Link>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4 mb-7 px-4">
                                                        <div className='h-2 w-2 bg-[#DD7D37] rounded-full mt-2'></div>

                                                        <div className='flex items-start justify-between gap-9 w-full md:w-2/3 '>
                                                            <div className=' flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1] text-base'>Received <span className='font-bold text-[#3D4044]'>$250 </span></h3>

                                                                <span className='text-[#3D4044] text-sm font-medium underline'>25kg of PET Bottles</span>
                                                            </div>
                                                            <div className='text-base flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1]'>20th Oct. 2022</h3>

                                                                <Link href="">
                                                                    <a className='text-[#DD7D37] text-xs underline italic'>View on etherscan</a>
                                                                </Link>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4 mb-7 px-4">
                                                        <div className='h-2 w-2 bg-[#DD7D37] rounded-full mt-2'></div>

                                                        <div className='flex items-start justify-between gap-9 w-full md:w-2/3 '>
                                                            <div className=' flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1] text-base'>Received <span className='font-bold text-[#3D4044]'>$250 </span></h3>

                                                                <span className='text-[#3D4044] text-sm font-medium underline'>25kg of PET Bottles</span>
                                                            </div>
                                                            <div className='text-base flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1]'>20th Oct. 2022</h3>

                                                                <Link href="">
                                                                    <a className='text-[#DD7D37] text-xs underline italic'>View on etherscan</a>
                                                                </Link>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                    </div>
                                                    <div className="flex items-start gap-4 mb-7 px-4">
                                                        <div className='h-2 w-2 bg-[#DD7D37] rounded-full mt-2'></div>

                                                        <div className='flex items-start justify-between gap-9 w-full md:w-2/3 '>
                                                            <div className=' flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1] text-base'>Received <span className='font-bold text-[#3D4044]'>$250 </span></h3>

                                                                <span className='text-[#3D4044] text-sm font-medium underline'>25kg of PET Bottles</span>
                                                            </div>
                                                            <div className='text-base flex items-start flex-col gap-3'>
                                                                <h3 className='text-[#9C9EA1]'>20th Oct. 2022</h3>

                                                                <Link href="">
                                                                    <a className='text-[#DD7D37] text-xs underline italic'>View on etherscan</a>
                                                                </Link>
                                                                
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
                                                You have no completed transactions yet.
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

export default transactions