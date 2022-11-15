import Link from 'next/link';
import React, { useEffect, useState} from 'react'
import DropdownIcon from '../../Icons/DropdownIcon'

const Final = () => {
    const [collectClaim, setCollectClaim ] = useState(false);
    const [confirmTransfer, setConfirmTransfer] = useState();
    const [successTransfer, setSuccessTransfer] = useState();
    const [moneyClaimed, setMoneyClaimed] = useState();


    const handleconfirmTransfer = () => {
        setConfirmTransfer(!confirmTransfer);
    }

    const handleSuccessTransfer = () => {
        setConfirmTransfer(false)
        setSuccessTransfer(!successTransfer);

        const moneyClaimInterval = setInterval(() => {
            setMoneyClaimed(true);
          }, 1000);
        return () => clearInterval(moneyClaimInterval);
    }


    useEffect(()=>{
        const interval = setInterval(() => {
            setCollectClaim(true);
          }, 8000);
        return () => clearInterval(interval);
    })
  return (
    <>

        {/* Fourth Step */}
        <div>
            <div className='flex flex-col gap-3 px-4 py-4'>
                {/* <div className='flex items-center justify-around gap-3 py-3'>
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

                </div> */}

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
                            <p className='text-[#6D747D] font-medium'>Cool down Period:  
                            
                            {collectClaim ===false ? <span className='text-xl font-semibold'> 48hrs : 59mins : 32secs</span> : <span className='text-xl font-semibold'> 00hrs : 00mins : 00secs</span>}
                            
                            </p>
                        </div>
                        <div className='text-[#A4A5A8] font-thin py-3'>
                            <p>You can only claim your rewards for this delivery after the cool-off period has elapssed. </p>
                            <p className='mt-5'>What is a cool-off period? <a href="" className='text-[#DD7D37]'>Learn More</a></p>
                        </div>
                    </div>

                    <div className='flex items-center justify-center flex-col gap-4 mt-4 mx-auto w-full'>
                        

                        {moneyClaimed ? 
                            <h3 className='font-semibold text-2xl py-6'>Money has been claimed</h3>
                            :
                            <>
                                <button className={`px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-full md:w-1/2 ${collectClaim ===false ? "disabled" : ""}`} disabled={collectClaim === false  ? "true" : ""} onClick={handleconfirmTransfer}>Claim $70</button>
                                <small className='text-xs font-thin mt-2 text-[#6D747D]'>Gidiscrap would collect <span className='text-gray-700 font-bold'>2.5% </span></small>

                            </>

                        }

                    </div>
                </div>
            </div>
        </div>





        {/* Fifth Step */}
                                        
        {/* <div>
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
                        
                        <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-full md:w-1/2  ' onClick={handleconfirmTransfer}>Claim $70</button>
                        <small className='text-xs font-thin mt-2 text-[#6D747D]'>Gidiscrap would collect <span className='text-gray-700 font-bold'>2.5% </span></small>
                    </div>
                </div>
            </div>
        </div> */}




        {/* Sixth Step */}
                                        
        {/* <div>
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
        </div> */}



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
                        {/* <Link href="/individual/transactions">
                            <a className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-1/2'>View transactions</a>
                        </Link> */}
                        {/* <Link href="/individual/transactions"> */}
                            <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-1/2' onClick={()=>setSuccessTransfer(false)}>View transactions</button>
                        {/* </Link> */}
                        
                    </div>
                </div>
            </div>

    </>
  )
}

export default Final