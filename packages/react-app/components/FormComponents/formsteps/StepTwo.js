import React from 'react'

const StepTwo = ({handleClick, currentStep, steps}) => {
  return (
    <>
         <div className='fade-in'>
            {/* <div className='flex flex-col gap-3 px-4 pb-4'> */}
                {/* <div className='flex items-center justify-around gap-3 py-3'>
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

                </div> */}
                <div className='py-4 px-3'>
                    <p className='text-sm text-[#DD7D37] font-semibold text-left'>Once you've gathered enough plastics, click on “Complete Request” to signal that you're ready to deliver the plastic items in the dropoff center. Make sure to deliver before the expiry date!</p>
                </div>

            {/* </div> */}

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

                    <div className='flex items-center justify-center flex-col md:flex-row gap-4 mt-5 mx-auto w-full'>
                        
                        <button className='px-9 py-3  border border-gray-300 bg-white text-gray-700  rounded-full w-full md:w-1/2 ' onClick={() => handleClick()}>Cancel Request</button>
                        <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-full md:w-1/2 ' onClick={() => handleClick("next")}>Deliver Plastics</button>
                    </div>
                </div>
            </div>
        </div>

    </>
  )
}

export default StepTwo