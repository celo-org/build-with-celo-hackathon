import Link from 'next/link'
import React, {useState} from 'react'
import CompanyLayout from '../../../../components/CompanyLayout/Layout'
import DropdownIcon from '../../../../components/Icons/DropdownIcon'


import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';


const DropOffs = () => {
    const [createDispute, setCreateDispute] = useState();
    const [requestSuccessModal, setRequestSuccessModal] = useState();

    const handleDispute = () =>{
        setCreateDispute(!createDispute)
    }
    const submitDispute = () =>{

        setCreateDispute(false)
        setRequestSuccessModal(!requestSuccessModal)
    }

  return (
    <>
        <CompanyLayout>

        <section>
            <div className='container mx-auto px-6'>

                <div className='h-full pb-24 md:px-4 py-12'>
                        <div className='flex items-center py-6 mb-8 flex-col lg:flex-row border-b border-gray-300'>
                            <div className='flex-1 w-full flex-col items-start'>
                                <h3 className='h2'>120kg of PET Bottles</h3>
                                <p>Ikeja, Lagos</p>
                            </div>

                            <div className="mt-1 relative rounded-full flex-1  items-center grow flex w-full ">

                                {/* <div className='h-15 grow'>
                                    <progress className="progress w-full" value="40" max="100"></progress>
                                </div> */}


                                

                                <div class="rounded-full w-full bg-gray-200 h-2">
                                    
                                    <div class="bg-[#DD7D37] h-2 rounded-full wrapper relative " style={{'width' : '55%'}}>
                                    {/* <span class="tooltipper text-[10px]">Celo explorer</span> */}

                                    </div>
                                </div>

                                

                                <div className='h-12 w-12'>
                                    <img src="/images/plastics.svg " className='h-full w-full object-cover'/>
                                </div>

                            </div>

                            
                        </div>

                        <div className=" w-full bg-white mt-3 py-6 md:mt-0  relative overflow-hidden rounded h-full">
                        <div className='absolute h-full border border-[#E4E7EC] inset-0 z-0 mx-auto w-[0.5px] hidden md:block'></div>

                            <div className=" grid grid-cols-1 md:grid-cols-2  w-full gap-6 relative">

                                <div className="px-4 flex flex-col">
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

                                <div className='px-4'>
                                    <div className='py-6 px-6 sticky top-0 border border-gray-300 rounded-lg'>
                                            <div className='flex items-start justify-start gap-4 mb-6'>
                                                <div className='h-24 w-24'>
                                                    <img src='/images/Avatar-lg.png' className='w-full object-cover rounded-full'/>
                                                </div>
                                                <div className='flex items-start justify-between'>

                                                
                                                    <div>
                                                
                                                        <h2 className='text-xl mb-2'>120kg of PET Bottles</h2>

                                                        <p className='font-thin text-[#667085] text-sm mb-2'>Ikeja, Lagos</p>
                                                        <p className='font-thin text-[#667085] text-sm'>Dropoff Time: 10 October 2022. 10:10:22</p>
                                                    </div>

                                                    <div>
                                                        <p className='text-xs text-[#6D747D]'>Dropoff center: <span className='text-[#344054] text-base'>Lekki, Lagos</span></p>
                                                    </div>
                                                </div>
                                                
                                                
                                            </div>
                                        <div>
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

                                            <div className='text-center text-sm py-7 max-w-md mx-auto px-4'>
                                                <div>
                                                    <p className='text-[#6D747D] font-medium'>Cool down Period:  <span className='text-xl font-semibold'>48hrs : 59mins : 32secs</span></p>
                                                </div>
                                                <div className='text-[#A4A5A8] font-thin py-3'>
                                                    <p>Cooldown period is the time you can get to raise a complaint on a product.</p>
                                                    <p>Want to read more on cooldown Period? <a href="" className='text-[#DD7D37]'>Read Here</a></p>
                                                </div>
                                            </div>

                                            <div className='flex items-center justify-center gap-4 mt-5 mx-auto w-full'>
                                                <button className='px-9 py-3 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-1/2' onClick={handleDispute}>Raise Dispute</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                </div>
            </div>
        </section>


        <div  className={`modal__box ${createDispute ? 'show' : ''}`}>
                <div className="modal__box-wrapper shadow-lg rounded-2xl">
        
                <div className="flex items-start justify-between mb-6">

                    <div className="grow">
                        <h1 className="text-2xl font-semibold mb-3">Dispute</h1>

                        <ul className='list-disc px-4'>
                            <li className='text-sm text-gray-500'>Reasons for dispute would be both visible to both parties.  </li>
                            <li className='text-sm text-gray-500'>Baseless disputes would result to banning of account</li>
                        </ul>
                    </div>

                    
                    <button className=" flex items-center rounded-full border-2 border-gray-700  " onClick={()=>setCreateDispute(false)}>
                           <span className="pointer-events-none flex items-center p-2">
                               <svg className='h-5 w-5 ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                           </span>             
                        
                    </button>

                </div>
                <form>

                
                    
                    <div>
                        
                        <div className="mb-3">
                            <div className="flex justify-between items-center">                                
                                <label className="text-gray-700 font-medium">Reasons for Dispute (Compulsory)</label>
                            </div>
                            <div className=" relative grow mb-4 w-full" >
                                <input className="w-full bg-white h-12 focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease"  />
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-between items-center">                                
                                <label className="text-gray-700 font-medium" >Description</label>
                            </div>
                            <div className=" relative grow mb-4 w-full h-full" >
                                <textarea className="w-full bg-white focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" placeholder='Kindly provide as much information as possible' rows="5" ></textarea>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="">                                
                                <label className="text-gray-700 font-medium">Upload Proof (Compulsory)</label>
                                <p className='text-sm text-gray-500'>Upload pictures, screenshots less than 3mb</p>

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


                           
                    </div>

                    <div className='flex items-center justify-center gap-4 mt-5 mx-auto'>
                        <button className='px-9 py-2 border border-gray-300 bg-white text-gray-700 rounded-full' type='button' onClick={handleDispute}>Cancel</button>
                        <button className='px-9 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full ' type='button' onClick={submitDispute}>Send dispute</button>
                    </div>
                </form>
                </div>
            </div>

            <div  className={`modal__box ${requestSuccessModal ? 'show' : ''}`}>
                <div className="modal__box-wrapper shadow-lg rounded-2xl">
        
                <div className="flex items-start justify-between mb-6">

                    <div className="grow">
                        <h1 className="text-2xl font-semibold mb-3">Dispute has been sent</h1>
                        
                        <ul className='list-disc px-4'>
                            <li className='text-sm text-gray-500'>The Individual would not be able to get his pay unless dispute is resolved.</li>
                        </ul>
                    </div>

                    
                    <button className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  " onClick={()=>setRequestSuccessModal(false)}>
                           <span className="pointer-events-none flex items-center p-2">
                               <svg className='h-5 w-5 ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                           </span>             
                        
                    </button>

                </div>

                    <div className='flex items-center justify-center gap-4 mt-5 mx-auto'>
                        <button className='px-9 py-2 border border-gray-300 bg-white text-gray-700 rounded-full' type='button' >Cancel</button>
                        <Link href="/company/offers">
                            <a className='px-9 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full '>Back to Offers</a>
                        </Link>
                        
                    </div>
                </div>
            </div>


        </CompanyLayout>

    </>
  )
}

export default DropOffs