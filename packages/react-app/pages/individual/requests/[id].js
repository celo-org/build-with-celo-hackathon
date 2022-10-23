import Link from 'next/link';
import React, {useState, useEffect} from 'react'
import DropdownIcon from '../../../components/Icons/DropdownIcon';
import UserLayout from '../../../components/UserLayout/Layout'


const RequestDetail = () => {
    const [fulfillRequest, setfulfillRequest] = useState();
    const [confirmTransfer, setConfirmTransfer] = useState();
    const [successTransfer, setSuccessTransfer] = useState();

    const handlefulfillRequest = () => {
        setfulfillRequest(!fulfillRequest)
    }
    const handleconfirmTransfer = () => {
        setConfirmTransfer(!confirmTransfer)
    }
    const handleSuccessTransfer = () => {
        setConfirmTransfer(false)
        setSuccessTransfer(!successTransfer)
    }

    return (
        <>
        <UserLayout>

            <div>
                
                <section className='py-12'>
                    <div className='container mx-auto px-6'>

                        <div className='md:px-6 '>




                            <div className='flex items-start w-full py-6 gap-9 flex-col lg:flex-row'>

                                <div className='w-full lg:w-4/12'>
                                    <div className='px-4 py-3 '>
                                            <div className='flex w-full py-4 pb-10 mb-8 items-center'>
                                                <h3 className='h2  mt-3'>Request Details</h3>
                                            </div>

                                        <div className='card shadow-lg rounded-md'>
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

                                        <div className="mt-5 py-4 relative rounded-full flex-1  items-center grow flex w-full ">



                                            

                                            <div class="rounded-full w-full bg-gray-200 h-2">
                                                
                                                <div class="bg-[#DD7D37] h-2 rounded-full wrapper relative " style={{'width' : '55%'}}>

                                                </div>
                                            </div>

                                            

                                            <div className='h-10 w-10'>
                                                <img src="/images/plastics.svg " className='h-full w-full object-cover'/>
                                            </div>

                                        </div>
                                    </div>
                                </div>

                                <div className='w-full lg:w-8/12'>



                                    <div className='px-4 py-3 '>

                                        {/* First Step */}
                                        <div>
                                            <div className='flex flex-col gap-3 px-4 pb-4'>
                                                <div className='flex items-center justify-around gap-3 py-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#DD7D37]  flex items-center justify-center w-8 h-8 text-white border border-[#DD7D37]'>1</span>
                                                        <span className='text-[#DD7D37]'>
                                                            Fulfill request
                                                        </span>
                                                        
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-white  flex items-center justify-center w-8 h-8 text-gray-500 border border-gray-500'>2</span>
                                                        <span className='text-gray-500 '>
                                                        Gather Plastics
                                                        </span>
                                                        
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-white  flex items-center justify-center w-8 h-8 text-gray-500 border border-gray-500'>3</span>
                                                        <span className='text-gray-500 '>
                                                            Deliver Plastics
                                                        </span>
                                                        
                                                    </div>

                                                </div>
                                                <div>
                                                    <p className='text-sm text-[#DD7D37] font-semibold text-left'>By clicking on “Fulfill Request”, you confirm that you can fulfill some or all of the quantity required for this request before its expiry date. Once you've clicked on Fulfill Request, you can proceed to start gathering plastics.</p>
                                                </div>

                                            </div>

                                            <div className='px-6 py-6  border border-gray-300 rounded-lg'>

                                                <div>
                                                    
                                                    <div className='grid grid-cols-2 gap-4 gap-y-9 py-3'>
                                                        <div className="flex-1 w-full col-span-2">
                                                            <span className="text-gray-700 font-base mb-3">Location</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                Ikeja
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Category of Scrap</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                Plastics
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Type of Scrap</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                Polyethylene Terephthalate (PET)
                                                            </div>
                                                            
                                                        </div>
                                                        
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Quantity Provided</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center gap-3 text-sm">
                                                                15kg
                                                            </div>
                                                            <small className='text-xs font-thin'>This quantity updates as collectors deliver </small>
                                                            
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Amount to be disbursed</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                $250
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flex-1 w-full col-span-2">
                                                            <span className="text-gray-700 font-base mb-3">Description</span>
                                                            <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100   focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm h-24">
                                                                
                                                            </div>
                                                            
                                                        </div>

                                                        <div className="flex-1 w-full col-span-2">
                                                            <span className="text-gray-700 font-base mb-3">Dropoff Center</span>
                                                            <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100   focus:border-gray-300 rounded-md focus:outline-none flex items-start text-sm h-24">
                                                                <span>Polyethylene Terephthalate (PET)</span>
                                                                
                                                            </div>
                                                            
                                                        </div>
                                                        {/* <div className="flex-1 w-full col-span-2">
                                                            <span className="text-gray-700 font-base mb-3">Image</span>
                                                            <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100  border border-[#D1D5DB] border-dashed focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                <div className='flex items-center justify-between w-full'>

                                                                
                                                                    <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                                                        <div className='p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center border-4 border-[#FEF8F3]'>
                                                                            <img src="/images/Icon.png" alt="" />
                                                                        </div>
                                                                        <div className="flex gap-1 flex-col items-start w-full">
                                                                            <p className="text-base  text-[#344054] font-normal"> 10kg 0f PET Bottles</p>
                                                                            <p className="text-sm  text-[#667085] font-normal">720KB</p>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <button className='text-[#DD7D37] text-base'>Download</button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            
                                                        </div> */}
                                                    </div>

                                                    <div className='flex items-center justify-center gap-4 mt-5 mx-auto w-full'>
                                                        
                                                        <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full  w-1/2' onClick={handlefulfillRequest}>Fulfill Request</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>





                                        {/* Second Step */}
                                        
                                        <div>
                                            <div className='flex flex-col gap-3 px-4 pb-4'>
                                                <div className='flex items-center justify-around gap-3 py-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>1</span>
                                                        <span className='text-[#5B2D0B]'>
                                                            Fulfill request
                                                        </span>
                                                        
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full  flex items-center justify-center w-8 h-8 bg-[#DD7D37] border border-[#DD7D37] text-white'>2</span>
                                                        <span className='text-[#DD7D37] '>
                                                        Gather Plastics
                                                        </span>
                                                        
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-white  flex items-center justify-center w-8 h-8 text-gray-500 border border-gray-500'>3</span>
                                                        <span className='text-gray-500 '>
                                                            Deliver Plastics
                                                        </span>
                                                        
                                                    </div>

                                                </div>
                                                <div>
                                                    <p className='text-sm text-[#DD7D37] font-semibold text-left'>Once you've gathered enough plastics, click on “Complete Request” to signal that you're ready to deliver the plastic items in the dropoff center. Make sure to deliver before the expiry date!</p>
                                                </div>

                                            </div>

                                            <div className='px-6 py-6  border border-gray-300 rounded-lg'>

                                                <div>
                                                    
                                                    <div className='grid grid-cols-2 gap-4 gap-y-9 py-3'>
                                                        <div className="flex-1 w-full col-span-2">
                                                            <span className="text-gray-700 font-base mb-3">Location</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                Ikeja
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Category of Scrap</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                Plastics
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Type of Scrap</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                Polyethylene Terephthalate (PET)
                                                            </div>
                                                            
                                                        </div>
                                                        
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Quantity Provided</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center gap-3 text-sm">
                                                                15kg
                                                            </div>
                                                            <small className='text-xs font-thin'>This quantity updates as collectors deliver </small>
                                                            
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Amount to be disbursed</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                $250
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flex-1 w-full col-span-2">
                                                            <span className="text-gray-700 font-base mb-3">Description</span>
                                                            <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100   focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm h-24">
                                                                
                                                            </div>
                                                            
                                                        </div>

                                                        <div className="flex-1 w-full col-span-2">
                                                            <span className="text-gray-700 font-base mb-3">Dropoff Center</span>
                                                            <div className="w-full py-2 mt-2 text-[#6B7280] rounded-md  flex items-start text-sm gap-2">
                                                                <div>
                                                                    <img src='/images/gps.svg'/>
                                                                </div>
                                                                <span>9.0820° N, 8.6753° E</span>
                                                                
                                                            </div>
                                                            
                                                            
                                                        </div>
                                                        
                                                    </div>

                                                    <div className='flex items-center justify-center gap-4 mt-5 mx-auto w-full'>
                                                        
                                                        <button className='px-9 py-3  border border-gray-300 bg-white text-gray-700  rounded-full  w-1/2'>Cancel Request</button>
                                                        <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full  w-1/2'>Deliver Plastics</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>








                                        {/* Third Step */}
                                        
                                        <div>
                                            <div className='flex flex-col gap-3 px-4 pb-4'>
                                                <div className='flex items-center justify-around gap-3 py-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>1</span>
                                                        <span className='text-[#5B2D0B]'>
                                                            Fulfill request
                                                        </span>
                                                        
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>2</span>
                                                        <span className='text-[#5B2D0B]'>
                                                        Gather Plastics
                                                        </span>
                                                        
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full  flex items-center justify-center w-8 h-8 bg-[#DD7D37] border border-[#DD7D37] text-white'>3</span>
                                                        <span className='text-[#DD7D37] '>
                                                            Deliver Plastics
                                                        </span>
                                                        
                                                    </div>

                                                </div>

                                            </div>

                                            <div className='px-6 py-6  border border-gray-300 rounded-lg'>

                                                <div>
                                                    
                                                    <div className="dropdown relative grow mb-4 w-full border-b pb-8 border-gray-300">
                                                        <button className="w-full bg-gray-100 h-12 focus:outline-none active:outline-none  flex items-center justify-between border-0 border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" type="button" >
                                                            <span className="pointer-events-none flex items-center gap-2 text-[#6B7280]">
                                                                Show Request Details  
                                                            </span>
                                                            <span className="pointer-events-none ">
                                                                <DropdownIcon />
                                                            </span>
                                                        </button>

                                                    
                                                    </div>


                                                    <div className='py-4'>
                                                        <div className='my-4 pb-3'>
                                                            <h3 className='text-2xl'>Delivery Details</h3>
                                                        </div>
                        
                                                        <div className="mb-6">
                                                            <div className="flex justify-between items-center">                                
                                                                <label className="text-gray-700 font-medium text-base" htmlFor="">How much Kg are you dropping off?</label>
                                                            </div>
                                                            <div className=" relative grow mb-4 w-full" >
                                                                <input className="w-full bg-white h-12 focus:outline-none active:outline-none text-sm  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" defaultValue="5kg" />
                                                                <div className='flex items-center justify-start mt-1 text-sm text-[#878A90] gap-1'>
                                                                    <small className='text-sm'>You would receive <span className='font-bold text-gray-700 text-base'>$70 </span></small>
                                                                    <small className='text-xs'> ----  Gidiscrap would collect <span className='font-bold text-gray-700'>2%</span></small>
                                                                </div>
                                                                
                                                            </div>
                                                        </div>
                                                        <div className="mb-6">
                                                            <div className="">                                
                                                                <label className="text-gray-700 text-base  font-medium" htmlFor="">Upload Proof (Compulsory)</label>
                                                                <p className='text-sm text-[#878A90]'>Upload proof of delivery less than 3mb (see <a className='underline'>instructions</a>)</p>

                                                            </div>
                                                            <div className="relative grow w-full">
                                                                <button className=" bg-white focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease text-[#6D747D]" type="button" >
                                                                    <span>
                                                                        <svg className='h-12 w-12' viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                            <path d="M10.5 4.16675V15.8334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                            <path d="M4.66406 10H16.3307" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                                        </svg>
                                                                    </span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="mb-6">
                                                            <div className="flex justify-between items-center">                                
                                                                <label className="text-gray-700 font-medium text-base">Description</label>
                                                            </div>
                                                            <div className=" relative grow mb-4 w-full h-full" >
                                                                <textarea className="w-full bg-white focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" rows="4" ></textarea>
                                                            </div>
                                                        </div>
                                                        


                                                        
                                                    </div>

                                                    <div className='flex items-center justify-center gap-4 mt-5 mx-auto w-full'>
                                                        
                                                        <button className='px-9 py-3  border border-gray-300 bg-white text-gray-700  rounded-full  w-1/2'>Cancel Request</button>
                                                        <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full  w-1/2'>Upload Proof of Delivery</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>






                                        {/* Fourth Step */}
                                        
                                        <div>
                                            <div className='flex flex-col gap-3 px-4 pb-4'>
                                                <div className='flex items-center justify-around gap-3 py-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>1</span>
                                                        <span className='text-[#5B2D0B]'>
                                                            Fulfill request
                                                        </span>
                                                        
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>2</span>
                                                        <span className='text-[#5B2D0B]'>
                                                        Gather Plastics
                                                        </span>
                                                        
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>3</span>
                                                        <span className='text-[#5B2D0B]'>
                                                        Deliver Plastics
                                                        </span>
                                                        
                                                    </div>

                                                </div>

                                            </div>

                                            <div className='px-6 py-6  border border-gray-300 rounded-lg'>

                                                <div>
                                                    
                                                    <div className="dropdown relative grow mb-4 w-full border-b pb-8 border-gray-300">
                                                        <button className="w-full bg-gray-100 h-12 focus:outline-none active:outline-none  flex items-center justify-between border-0 border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" type="button" >
                                                            <span className="pointer-events-none flex items-center gap-2 text-[#6B7280]">
                                                                Show Request Details  
                                                            </span>
                                                            <span className="pointer-events-none ">
                                                                <DropdownIcon />
                                                            </span>
                                                        </button>

                                                    
                                                    </div>


                                                    <div className='py-4'>
                                                        <div className='my-4 pb-3'>
                                                            <h3 className='text-2xl'>Your Delivery Details</h3>
                                                        </div>
                        
                                                        <div className='grid grid-cols-2 gap-4 gap-y-9 py-3'>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Category of Scrap</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                Plastics
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Type of Scrap</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                Polyethylene Terephthalate (PET)
                                                            </div>
                                                            
                                                        </div>
                                                        
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Quantity Provided</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center gap-3 text-sm">
                                                                15kg
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Amount expected</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                $70
                                                            </div>
                                                            
                                                        </div>

                                                        <div className="flex-1 w-full col-span-2">
                                                            <span className="text-gray-700 font-base mb-3">Images</span>
                                                            <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100  border border-[#D1D5DB] border-dashed focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                <div className='flex items-center justify-between w-full'>

                                                                
                                                                    <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                                                        <div className='p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center border-4 border-[#FEF8F3]'>
                                                                            <img src="/images/Icon.png" alt="" />
                                                                        </div>
                                                                        <div className="flex gap-1 flex-col items-start w-full">
                                                                            <p className="text-base  text-[#344054] font-normal">Pictures of the PET bottles.png</p>
                                                                            <p className="text-sm  text-[#667085] font-normal">720KB</p>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <button className='text-[#DD7D37] text-base'>view</button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>


                                                        
                                                    </div>


                                                    <div className='text-center text-sm py-3 mt-6 max-w-md mx-auto px-4'>
                                                        <div>
                                                            <p className='text-[#6D747D] font-medium'>Cool down Period:  <span className='text-xl font-semibold'>48hrs : 59mins : 32secs</span></p>
                                                        </div>
                                                        <div className='text-[#A4A5A8] font-thin py-3'>
                                                            <p>You can only claim your rewards for this delivery after the cool-off period has elapssed. </p>
                                                            <p className='mt-5'>What is a cool-off period? <a href="" className='text-[#DD7D37]'>Learn More</a></p>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center justify-center flex-col gap-4 mt-4 mx-auto w-full'>
                                                        
                                                        <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full  w-1/2 disabled' disabled="true">Claim $70</button>
                                                        <small className='text-xs font-thin mt-2 text-[#6D747D]'>Gidiscrap would collect <span className='text-gray-700 font-bold'>2.5% </span></small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>








                                        {/* Fifth Step */}
                                        
                                        <div>
                                            <div className='flex flex-col gap-3 px-4 pb-4'>
                                                <div className='flex items-center justify-around gap-3 py-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>1</span>
                                                        <span className='text-[#5B2D0B]'>
                                                            Fulfill request
                                                        </span>
                                                        
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>2</span>
                                                        <span className='text-[#5B2D0B]'>
                                                        Gather Plastics
                                                        </span>
                                                        
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>3</span>
                                                        <span className='text-[#5B2D0B]'>
                                                        Deliver Plastics
                                                        </span>
                                                        
                                                    </div>

                                                </div>

                                            </div>

                                            <div className='px-6 py-6  border border-gray-300 rounded-lg'>

                                                <div>
                                                    
                                                    <div className="dropdown relative grow mb-4 w-full border-b pb-8 border-gray-300">
                                                        <button className="w-full bg-gray-100 h-12 focus:outline-none active:outline-none  flex items-center justify-between border-0 border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" type="button" >
                                                            <span className="pointer-events-none flex items-center gap-2 text-[#6B7280]">
                                                                Show Request Details  
                                                            </span>
                                                            <span className="pointer-events-none ">
                                                                <DropdownIcon />
                                                            </span>
                                                        </button>

                                                    
                                                    </div>


                                                    <div className='py-4'>
                                                        <div className='my-4 pb-3'>
                                                            <h3 className='text-2xl'>Your Delivery Details</h3>
                                                        </div>
                        
                                                        <div className='grid grid-cols-2 gap-4 gap-y-9 py-3'>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Category of Scrap</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                Plastics
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Type of Scrap</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                Polyethylene Terephthalate (PET)
                                                            </div>
                                                            
                                                        </div>
                                                        
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Quantity Provided</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center gap-3 text-sm">
                                                                15kg
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Amount expected</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                $70
                                                            </div>
                                                            
                                                        </div>

                                                        <div className="flex-1 w-full col-span-2">
                                                            <span className="text-gray-700 font-base mb-3">Images</span>
                                                            <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100  border border-[#D1D5DB] border-dashed focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                <div className='flex items-center justify-between w-full'>

                                                                
                                                                    <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                                                        <div className='p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center border-4 border-[#FEF8F3]'>
                                                                            <img src="/images/Icon.png" alt="" />
                                                                        </div>
                                                                        <div className="flex gap-1 flex-col items-start w-full">
                                                                            <p className="text-base  text-[#344054] font-normal">Pictures of the PET bottles.png</p>
                                                                            <p className="text-sm  text-[#667085] font-normal">720KB</p>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <button className='text-[#DD7D37] text-base'>view</button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>


                                                        
                                                    </div>


                                                    <div className='text-center text-sm py-3 mt-6 max-w-md mx-auto px-4'>
                                                        <div>
                                                            <p className='text-[#6D747D] font-medium'>Cool down Period:  <span className='text-xl font-semibold'>00hrs : 00mins : 00secs</span></p>
                                                        </div>
                                                        <div className='text-[#A4A5A8] font-thin py-3'>
                                                            <p>You can only claim your rewards for this delivery after the cool-off period has elapssed. </p>
                                                            <p className='mt-5'>What is a cool-off period? <a href="" className='text-[#DD7D37]'>Learn More</a></p>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center justify-center flex-col gap-4 mt-4 mx-auto w-full'>
                                                        
                                                        <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full  w-1/2 ' onClick={handleconfirmTransfer}>Claim $70</button>
                                                        <small className='text-xs font-thin mt-2 text-[#6D747D]'>Gidiscrap would collect <span className='text-gray-700 font-bold'>2.5% </span></small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>








                                        {/* Sixth Step */}
                                        
                                        <div>
                                            <div className='flex flex-col gap-3 px-4 pb-4'>
                                                <div className='flex items-center justify-around gap-3 py-3'>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>1</span>
                                                        <span className='text-[#5B2D0B]'>
                                                            Fulfill request
                                                        </span>
                                                        
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>2</span>
                                                        <span className='text-[#5B2D0B]'>
                                                        Gather Plastics
                                                        </span>
                                                        
                                                    </div>
                                                    <div className='flex items-center gap-3'>
                                                        <span className='p-2 rounded-full bg-[#5B2D0B]  flex items-center justify-center w-8 h-8 text-white'>3</span>
                                                        <span className='text-[#5B2D0B]'>
                                                        Deliver Plastics
                                                        </span>
                                                        
                                                    </div>

                                                </div>

                                            </div>

                                            <div className='px-6 py-6  border border-gray-300 rounded-lg'>

                                                <div>
                                                    
                                                    <div className="dropdown relative grow mb-4 w-full border-b pb-8 border-gray-300">
                                                        <button className="w-full bg-gray-100 h-12 focus:outline-none active:outline-none  flex items-center justify-between border-0 border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" type="button" >
                                                            <span className="pointer-events-none flex items-center gap-2 text-[#6B7280]">
                                                                Show Request Details  
                                                            </span>
                                                            <span className="pointer-events-none ">
                                                                <DropdownIcon />
                                                            </span>
                                                        </button>

                                                    
                                                    </div>


                                                    <div className='py-4'>
                                                        <div className='my-4 pb-3'>
                                                            <h3 className='text-2xl'>Your Delivery Details</h3>
                                                        </div>
                        
                                                        <div className='grid grid-cols-2 gap-4 gap-y-9 py-3'>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Category of Scrap</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                Plastics
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Type of Scrap</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                Polyethylene Terephthalate (PET)
                                                            </div>
                                                            
                                                        </div>
                                                        
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Quantity Provided</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center gap-3 text-sm">
                                                                15kg
                                                            </div>
                                                            
                                                        </div>
                                                        <div className="flex-1">
                                                            <span className="text-gray-700 font-base mb-3">Amount expected</span>
                                                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                $70
                                                            </div>
                                                            
                                                        </div>

                                                        <div className="flex-1 w-full col-span-2">
                                                            <span className="text-gray-700 font-base mb-3">Images</span>
                                                            <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100  border border-[#D1D5DB] border-dashed focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                                <div className='flex items-center justify-between w-full'>

                                                                
                                                                    <div className="flex gap-2 flex-row justify-start items-start w-full mt-2">
                                                                        <div className='p-2 bg-[#FEF8F3] rounded-full flex items-center justify-center border-4 border-[#FEF8F3]'>
                                                                            <img src="/images/Icon.png" alt="" />
                                                                        </div>
                                                                        <div className="flex gap-1 flex-col items-start w-full">
                                                                            <p className="text-base  text-[#344054] font-normal">Pictures of the PET bottles.png</p>
                                                                            <p className="text-sm  text-[#667085] font-normal">720KB</p>
                                                                        </div>
                                                                    </div>

                                                                    <div>
                                                                        <button className='text-[#DD7D37] text-base'>view</button>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            
                                                        </div>
                                                    </div>


                                                        
                                                    </div>


                                                    <div className='text-center text-sm py-3 mt-6 max-w-md mx-auto px-4'>
                                                        <div>
                                                            <p className='text-[#6D747D] font-medium'>Cool down Period:  <span className='text-xl font-semibold'>00hrs : 00mins : 00secs</span></p>
                                                        </div>
                                                        <div className='text-[#A4A5A8] font-thin py-3'>
                                                            <p>You can only claim your rewards for this delivery after the cool-off period has elapssed. </p>
                                                            <p className='mt-5'>What is a cool-off period? <a href="" className='text-[#DD7D37]'>Learn More</a></p>
                                                        </div>
                                                    </div>

                                                    <div className='flex items-center justify-center flex-col gap-4 mt-4 mx-auto w-full'>
                                                        
                                                        <h3 className='font-semibold text-2xl py-6'>Money has been claimed</h3>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>









                                    </div>





                                </div>
                            </div>
                    




                        </div>                
                    </div>  
                
                </section>

            </div>



            {/* fULFILL REQUEST MODAL */}
            <div  className={`modal__box ${fulfillRequest ? 'show' : ''}`}>
                <div className="modal__box-wrapper shadow-lg rounded-2xl">
        
                <div className="flex items-start justify-between mb-6">

                    <div className="grow">
                        <h1 className="text-2xl font-semibold mb-3">You're are about to fulfill this request</h1>

                        <p className="mb-3">Kindly note the following before starting this request</p>
                        
                        <ul className='list-disc px-4'>
                            <li className='text-sm text-gray-500'>Make sure you have the ability to fulfill the requirements of this request. </li>
                            <li className='text-sm text-gray-500'>If request is not fulfilled within the particular period, your ratings would reduce, and this will affect your future orders.</li>
                        </ul>
                    </div>

                    
                    <button className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  " onClick={()=>setfulfillRequest(false)}>
                           <span className="pointer-events-none flex items-center p-1">
                               <svg className='h-3 w-3 ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                           </span>             
                        
                    </button>

                </div>

                    <div className='flex items-center justify-center gap-4 mt-5 mx-auto w-full'>
                        <button className='px-9 py-3 border border-gray-300 bg-white text-gray-700 rounded-full w-1/2' type='button'  onC lick={()=>setfulfillRequest(false)}>Cancel</button>
                        <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-1/2'>Proceed</button>
                    </div>
                </div>
            </div>




            {/* Transfer Confirmation MOdal */}
            <div  className={`modal__box ${confirmTransfer ? 'show' : ''}`}>
                <div className="modal__box-wrapper shadow-lg rounded-2xl">
        
                <div className=" mb-6">

                    <div className="grow mb-3">
                        <h1 className="text-2xl font-semibold ">Claim your money</h1>

                        
                    </div>

                    <div>
                        <h3 className="mb-3">$70 would be transferred to your wallet</h3>
                        <small className='text-xs font-thin  text-[#6D747D]'>Gidiscrap would collect <span className='text-gray-700 font-bold'>2.5% </span></small>
                        <h3 className="my-3">Wallet Address: 0x346932...gq382nk</h3>

                    </div>

                    
                    <button className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  " onClick={()=>setConfirmTransfer(false)}>
                           <span className="pointer-events-none flex items-center p-1">
                               <svg className='h-3 w-3 ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                           </span>             
                        
                    </button>

                </div>

                    <div className='flex items-center justify-center gap-4 mt-7 mx-auto w-full'>
                        <button className='px-9 py-3 border border-gray-300 bg-white text-gray-700 rounded-full w-1/2' type='button'  onClick={()=>setConfirmTransfer(false)}>Cancel</button>
                        <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-1/2' onClick={handleSuccessTransfer}>Transfer</button>
                    </div>
                </div>
            </div>



            {/* Transfer Success Modal */}
            <div className={`modal__box ${successTransfer ? 'show' : ''}`}>
                <div className="modal__box-wrapper shadow-lg rounded-2xl">
        
                <div className=" mb-6">

                    <div className="grow mb-3">
                        <h1 className="text-2xl font-semibold ">Transfer Success</h1>

                        
                    </div>

                    <div>
                        <p className="mb-3">Kindly note the following before starting this request</p>

                        <Link href="">
                            <a className='mb-3 underline text-sm font-thin  text-[#6D747D]'>View transaction on etherscan</a>
                                                        
                        </Link>


                    </div>

                    
                    <button className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  " onClick={()=>setSuccessTransfer(false)}>
                           <span className="pointer-events-none flex items-center p-1">
                               <svg className='h-3 w-3 ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                           </span>             
                        
                    </button>

                </div>

                    <div className='flex items-center justify-center gap-4 mt-7 mx-auto w-full'>
                        <Link href="/individual/transactions">
                            <a className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-1/2'>View transactions</a>
                        </Link>
                        
                    </div>
                </div>
            </div>


            </UserLayout>
        </>

    )
}

export default RequestDetail