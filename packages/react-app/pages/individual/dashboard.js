import Link from 'next/link'
import React from 'react'
import DropdownIcon from '../../components/Icons/DropdownIcon'
import ExpandMoreVertical from '../../components/Icons/ExpandMoreVertical'
import UpwardIcon from '../../components/Icons/UpwardIcon'
import UserLayout from '../../components/UserLayout/Layout'

const Dashboard = () => {
  return (
    <>
        <UserLayout>
                <section>
                    <div className='container mx-auto px-6'>

                        <div className='h-full pb-24 px-4 md:px-12 py-12'>
                            <div className='grow py-4'> 
                                <h1 className="text-3xl font-bold text-gray-800 mb-3 ">
                                    Dashboard
                                </h1>
                            </div>


                            <div className='mb-6'>

                                <div className='grid grids-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

                                    <div className="shadow w-full bg-white relative py-6 rounded border border-[#E4E7EC] flex flex-col justify-between">
                                        <div className='px-6'>
                                            <div className="flex items-center justify-between flex-row w-full">
                                                <h5 className="text-gray-600">Wallet Balance</h5>
                                                <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                                                    <ExpandMoreVertical/>
                                                </button>
                                            </div>
                                            <div className='py-4'>

                                                    <h3 className="text-neutral800 text-4xl	">$ 2,000.00</h3>
                                                
                                            </div>
                                        </div>
                                        <div className='pt-4 border-t border-gray-100 flex items-center justify-end px-6  w-full'>
                                            <Link href='/individual/transactions'>
                                                <a className="text-[#DD7D37] text-base " >View Transactions</a>
                                            </Link>
                                            
                                        </div>
                                    </div>
                                    <div className="shadow w-full bg-white relative  py-6 rounded border border-[#E4E7EC] flex flex-col justify-between">
                                        <div className='px-6'>
                                            <div className="flex items-center justify-between flex-row w-full">
                                                <h5 className="text-gray-600">Total Offers Pending</h5> 
                                                <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                                                    <ExpandMoreVertical/>
                                                </button>
                                            </div>
                                            <div className='py-4'>

                                                    <h3 className="text-neutral800 text-4xl	">5</h3>
                                            </div>
                                        </div>
                                        <div className='pt-4 border-t border-gray-100 flex items-center justify-end px-6  w-full'>
                                            <Link href='/individual/orders'>
                                                <a className="text-[#DD7D37] text-base " >Complete Offers</a>
                                            </Link>
                                        </div>
                                        
                                    </div>
                                    <div className="shadow w-full bg-white relative px-6 py-6 rounded border border-[#E4E7EC">
                                        <div className="flex items-center justify-between flex-row w-full">
                                        <h5 className="text-gray-600">Total Offers Completed</h5>
                                        <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                                            <ExpandMoreVertical/>
                                            
                                        </button>
                                        </div>
                                        <div className='py-4'>
                                            <div className='py-4'>
                                                <h3 className="text-neutral800 text-4xl	">10</h3>
                                            </div>

                                            <div>
                                                <div className='inline-flex items-center gap-1'>
                                                    <span className='text-[#45CD85] inline-flex items-center gap-1'><UpwardIcon/> 40%</span> vs last month
                                                </div>
                                                

                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    </div>
                            </div>
                            <div className="flex my-6 items-stretch w-full space-y-4 md:space-x-4 md:space-y-0 gap-4 flex-col lg:flex-row">
                                <div className="w-full md:w-full lg:w-8/12 flex-col flex-1 md:space-y-4 h-full">
                                    


                                    <div className=" bg-white mt-3 md:mt-0  py-6 w-full  relative overflow-hidden rounded">
                                            
                                        <div className="flex items-center justify-between flex-row w-full border-b border-gray-200 pb-4 ">
                                            <h5 className=" text-2xl text-gray-700">Requests in your location</h5>
                                                <span className='flex items-center text-gray-400 bg-white text-sm border-gray-300 border px-5 py-2 rounded-full h-12 gap-5'>
                                                    Filter By:
                                                    <button className="flex items-center text-gray-600 ">
                                                    IKeja, Lagos
                                                        <span className='text-sm'>
                                                        <DropdownIcon className="text-sm  "/>
                                                        </span>
                                                    </button>
                                                </span>
                                        </div>

                                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-9 gap-y-9 mt-7 '>
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
                                                <img src='/images/file-not-found.svg'/>
                                            </div>
                                            <div>No recent activities</div>
                                            
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

            
        </UserLayout>
        
    </>
  )
}

export default Dashboard