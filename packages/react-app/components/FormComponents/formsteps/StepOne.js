import React, {useState} from 'react'

const StepOne = ({handleClick, currentStep, steps, data}) => {
    const [fulfillRequest, setfulfillRequest] = useState();

    const handlefulfillRequest = () => {
        setfulfillRequest(!fulfillRequest)
    }
  return (
    <>
        <div className='fade-in'>
                {/* <div className='flex items-center justify-around gap-3 py-3'>
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

                </div> */}
                <div className='py-4 px-3'>
                    <p className='text-sm text-[#DD7D37] font-semibold text-left'>By clicking on “Fulfill Request”, you confirm that you can fulfill some or all of the quantity required for this request before its expiry date. Once you've clicked on Fulfill Request, you can proceed to start gathering plastics.</p>
                </div>


            <div className='px-6 py-6  border border-gray-300 rounded-lg'>

                <div>
                    
                    <div className='grid grid-cols-2 gap-4 gap-y-9 py-3'>
                        <div className="flex-1 w-full col-span-2">
                            <span className="text-gray-700 font-base mb-3">Location</span>
                            <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                {data && data.location.name}
                            </div>
                            
                        </div>
                        <div className="flex-1">
                            <span className="text-gray-700 font-base mb-3">Category of Scrap</span>
                            <div className="w-full h-12 px-4 py-2 mt-2 text-gray-700 bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                {data && data.scrap_category.name}    
                            </div>
                            
                        </div>
                        <div className="flex-1">
                            <span className="text-gray-700 font-base mb-3">Type of Scrap</span>
                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                            {data && data.scrap_subcategory.name}    

                                {/* Polyethylene Terephthalate (PET) */}
                            </div>
                            
                        </div>
                        
                        <div className="flex-1">
                            <span className="text-gray-700 font-base mb-3">Quantity Provided</span>
                            <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center gap-3 text-sm">
                                {data && data.quantity_required}    

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
                                {data && data.description}    
                                
                            </div>
                            
                        </div>

                        <div className="flex-1 w-full col-span-2">
                            <span className="text-gray-700 font-base mb-3">Dropoff Center</span>
                            <div className="w-full px-4 py-4 mt-2 text-[#6B7280] bg-gray-100   focus:border-gray-300 rounded-md focus:outline-none flex items-start text-sm h-24">
                                <span> {data && data?.collection_center?.title}  </span>
                                
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
                        
                        <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-full md:w-1/2 ' onClick={handlefulfillRequest}>Fulfill Request</button>
                    </div>


                </div>
            </div>
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
                        <button className='px-9 py-3 border border-gray-300 bg-white text-gray-700 rounded-full w-1/2' type='button'  onClick={()=>setfulfillRequest(false)}>Cancel</button>
                        <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-1/2' onClick={() => handleClick("next")} >Proceed</button>
                    </div>
                </div>
            </div>


    </>
  )
}

export default StepOne