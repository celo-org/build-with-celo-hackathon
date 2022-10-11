import Link from 'next/link'
import React from 'react'
import ExpandMoreVertical from '../../components/Icons/ExpandMoreVertical'
import UpwardIcon from '../../components/Icons/UpwardIcon'
import UserLayout from '../../components/UserLayout/Layout'

const Dashboard = () => {
  return (
    <>
        <UserLayout>
            <div className='container mx-auto px-6'>
                <section>
                    <div className='h-full pb-24 px-4 md:px-12 py-12'>
                        <div className='grow py-4'> 
                            <h1 className="text-3xl font-bold text-gray-800 mb-3 ">
                                Dashboard
                            </h1>
                        </div>
                        <div className="flex my-6 items-stretch w-full space-y-4 md:space-x-4 md:space-y-0 flex-col lg:flex-row">
                          <div className="w-full md:w-full lg:w-8/12 flex-col flex-1 md:space-y-4 h-full">
                            <div className='grid grids-cols-1 md:grid-cols-2 gap-5'>

                                <div className="shadow w-full bg-white relative px-6 py-6 rounded">
                                    <div className="flex items-center justify-between flex-row w-full">
                                      <h5 className="text-gray-600">Wallet Balance</h5>
                                      <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                                        <ExpandMoreVertical/>
                                      </button>
                                    </div>
                                    <div className='py-4'>
                                        <div className='py-4'>

                                            <h3 className="text-neutral800 text-4xl	">$ 2,000.00</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="shadow w-full bg-white relative px-6 py-6 rounded">
                                    <div className="flex items-center justify-between flex-row w-full">
                                      <h5 className="text-gray-600">Total Offers taken</h5>
                                      <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                                        <ExpandMoreVertical/>
                                        
                                      </button>
                                    </div>
                                    <div className='py-4'>
                                        <div className='py-4'>
                                            <h3 className="text-neutral800 text-4xl	">242</h3>
                                        </div>

                                        <div>
                                            <div className='inline-flex items-center gap-1'>
                                                <span className='text-[#45CD85] inline-flex items-center gap-1'><UpwardIcon/> 40%</span> vs last month
                                            </div>
                                            

                                        </div>
                                        
                                        
                                    </div>
                                </div>

                                

                            </div>
                              


                              <div className="shadow w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded">
                                <div className="px-3 md:px-6 py-6 w-full relative">
                                    
                                  <div className="flex items-center justify-between flex-row w-full border-b border-gray-200 pb-4 ">
                                      <h5 className="text-gray-700">Orders based on your location</h5>
                                      <button className="text-gray-400 text-xs">Hide</button>
                                  </div>


                                    <div className=" flex flex-col">
                                        <div className="flex items-center py-4 mb-2 text-sm w-full border-b border-gray-200">
                                            <div className="flex items-start gap-3 w-full">
                                          
                                                <div  className='w-full'>
                                                  <div className="flex gap-1 items-center flex-row justify-between w-full">
                                                    <p className="text-lg text-[#5B5B5B] font-semibold">120kg of PET Bottles</p>

                                                    <p className="text-xs font-normal">Expires: 20/10/22</p>
                                                  </div>
                                                  <div className="flex gap-1 flex-row justify-between items-center w-full">
                                                      <p className="text-sm text-[#5B5B5B] font-normal">$500</p>
                                                      <p className="text-sm text-[#12B76A]">25% Provided</p>
                                                  </div>
                                                  <div className="flex gap-1 flex-row justify-between items-end w-full">
                                                      <p className="text-sm">Ikeja, Lagos</p>
                                                  </div>
                                                
                                                </div>
                                                
                                                
                                            </div>
                                        </div>
                                        <div className="flex items-center py-4 mb-2 text-sm w-full border-b border-gray-200">
                                            <div className="flex items-start gap-3 w-full">
                                          
                                                <div  className='w-full'>
                                                  <div className="flex gap-1 items-center flex-row justify-between w-full">
                                                    <p className="text-lg text-[#5B5B5B] font-semibold">120kg of PET Bottles</p>

                                                    <p className="text-xs font-normal">Expires: 20/10/22</p>
                                                  </div>
                                                  <div className="flex gap-1 flex-row justify-between items-center w-full">
                                                      <p className="text-sm text-[#5B5B5B] font-normal">$500</p>
                                                      <p className="text-sm text-[#12B76A]">25% Provided</p>
                                                  </div>
                                                  <div className="flex gap-1 flex-row justify-between items-end w-full">
                                                      <p className="text-sm">Ikeja, Lagos</p>
                                                  </div>
                                                
                                                </div>
                                                
                                                
                                            </div>
                                        </div>
                                        <div className="flex items-center py-4 mb-2 text-sm w-full border-b border-gray-200">
                                            <div className="flex items-start gap-3 w-full">
                                          
                                                <div  className='w-full'>
                                                  <div className="flex gap-1 items-center flex-row justify-between w-full">
                                                    <p className="text-lg text-[#5B5B5B] font-semibold">120kg of PET Bottles</p>

                                                    <p className="text-xs font-normal">Expires: 20/10/22</p>
                                                  </div>
                                                  <div className="flex gap-1 flex-row justify-between items-center w-full">
                                                      <p className="text-sm text-[#5B5B5B] font-normal">$500</p>
                                                      <p className="text-sm text-[#12B76A]">25% Provided</p>
                                                  </div>
                                                  <div className="flex gap-1 flex-row justify-between items-end w-full">
                                                      <p className="text-sm">Ikeja, Lagos</p>
                                                  </div>
                                                
                                                </div>
                                                
                                                
                                            </div>
                                        </div>
                                        <div className="flex items-center py-4 mb-2 text-sm w-full border-gray-200">
                                            <div className="flex items-start gap-3 w-full">
                                          
                                                <div  className='w-full'>
                                                  <div className="flex gap-1 items-center flex-row justify-between w-full">
                                                    <p className="text-lg text-[#5B5B5B] font-semibold">120kg of PET Bottles</p>

                                                    <p className="text-xs font-normal">Expires: 20/10/22</p>
                                                  </div>
                                                  <div className="flex gap-1 flex-row justify-between items-center w-full">
                                                      <p className="text-sm text-[#5B5B5B] font-normal">$500</p>
                                                      <p className="text-sm text-[#12B76A]">25% Provided</p>
                                                  </div>
                                                  <div className="flex gap-1 flex-row justify-between items-end w-full">
                                                      <p className="text-sm">Ikeja, Lagos</p>
                                                  </div>
                                                
                                                </div>
                                                
                                                
                                            </div>
                                        </div>


                                    </div>
                                </div>
                              </div>
                          </div>
                          <div className="w-full md:w-full lg:w-4/12 space-x-4 rounded h-full shadow px-4 py-6 bg-white">
                              <div className="  relative">
                                  <div className="w-full  flex items-center justify-between pb-2">
                                      <h4 className="text-md  text-[#5B5B5B]   font-normal	 ">
                                        Activities  
                                      </h4>

                                      <Link href='/'>
                                        <a className='text-sm'>view all</a>
                                      </Link>

                                  </div>
                                  <div className='h-full flex-1 grow'>
                                    <div className='flex items-center justify-center h-full flex-col gap-9 py-14'>
                                      <div>
                                        <img src='/images/pic.svg'/>
                                      </div>
                                      <div>No recent activities</div>
                                      
                                    </div>
                                      
                                  </div>
                              </div>
                          </div>
                        </div>
                    </div>
                </section>

            </div>
            
        </UserLayout>
        
    </>
  )
}

export default Dashboard