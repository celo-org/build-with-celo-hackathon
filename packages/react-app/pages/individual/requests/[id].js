import React, {useState, useEffect} from 'react'
import UserLayout from '../../../components/UserLayout/Layout'


const RequestDetail = () => {
    const [fulfillRequest, setfulfillRequest] = useState();

    const handlefulfillRequest = () => {
        setfulfillRequest(!fulfillRequest)
    }

    return (
        <>
        <UserLayout>

            <div>
                
                <section className='py-12'>
                    <div className='container mx-auto px-6'>

                        <div className='px-6 '>

                        <div className='flex items-center py-4 mb-6 flex-col lg:flex-row'>
                            <div className='flex-1 w-full'>
                                <h3 className='h2'>Request Details</h3>
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


                    <div className='flex items-start w-full py-6 mt-6 gap-6'>

                        <div className='w-4/12'>
                            <div className='card shadow-lg py-3  rounded-md'>
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

                        <div className='w-8/12'>
                            <div className='px-4 py-3 '>
                                <div className='px-6 py-6 sticky top-0 border border-gray-300 rounded-lg'>

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
                                                
                                            </div>
                                            <div className="flex-1">
                                                <span className="text-gray-700 font-base mb-3">Amount to be disbursed</span>
                                                <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                    $250
                                                </div>
                                                
                                            </div>
                                            <div className="flex-1 w-full col-span-2">
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
                                                
                                            </div>
                                        </div>

                                        <div className='flex items-center justify-center gap-4 mt-5 mx-auto w-full'>
                                            
                                            <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full  w-1/2' onClick={handlefulfillRequest}>Fulfill Request</button>
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

            <div  className={`modal__box ${fulfillRequest ? 'show' : ''}`}>
                <div className="modal__box-wrapper shadow-lg rounded-2xl">
        
                <div className="flex items-start justify-between mb-6">

                    <div className="grow">
                        <h1 className="text-2xl font-semibold mb-3">Dispute</h1>

                        <p className="mb-3">Kindly note the following before starting this request</p>
                        
                        <ul className='list-disc px-4'>
                            <li className='text-sm text-gray-500'>Make sure you have the ability to fulfill the requirements of this request. </li>
                            <li className='text-sm text-gray-500'>If request is not fulfilled within the particular period, your ratings would reduce, and this will affect your future orders.</li>
                        </ul>
                    </div>

                    
                    <button className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  " onClick={()=>setfulfillRequest(false)}>
                           <span className="pointer-events-none flex items-center p-2">
                               <svg className='h-5 w-5 ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                           </span>             
                        
                    </button>

                </div>

                    <div className='flex items-center justify-center gap-4 mt-5 mx-auto'>
                        <button className='px-9 py-3 border border-gray-300 bg-white text-gray-700 rounded-full' type='button' >Cancel</button>
                        <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full '>Proceed</button>
                    </div>
                </div>
            </div>


            </UserLayout>
        </>

    )
}

export default RequestDetail