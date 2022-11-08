import Link from 'next/link'
import React, {useEffect, useState} from 'react'
import CompanyLayout from '../../../components/CompanyLayout/Layout'
import DropdownIcon from '../../../components/Icons/DropdownIcon'
import {useQuery} from 'react-query'
import axios from 'axios'

const Offers = () => {

    // const [requests, setRequests] = useState()
    const id = '63668c437e1caa4f18ae319f'

    const fetchRequests = async ()=>{
        try{
            const res = await axios.get( `http://127.0.0.1:8080/api/companies/${id}/requests` );
            return res.json()
            // setRequests(res.data.data)
            // console.log(res)
        }catch(err){
           console.log(err)
        }
    };

    const {data, status} = useQuery("requests", fetchRequests)


    if(status === "loading"){
        return <div>loading</div>
    }

    if(status === "error"){
        return <div>Error</div>
    }


    // useEffect(() => {
    //     const CancelToken = axios.CancelToken;
    //     const source = CancelToken.source();

    //     const getCategories = async ()=>{
    //         try{
    //             const res = await axios.get( "http://127.0.0.1:8080/api/categories", { cancelToken: source.token } );
    //             setCategories(res.data.data)
    //             // console.log(res)
    //         }catch(err){
    //             if(axios.isCancel(err)){
    //                 console.log("cancelled");
    //             } else{
    //                 throw err
    //             }
    //         }
    //     };
    //     getCategories();
    //     return () => {
    //         source.cancel();
    //     }
    // }, [])   
  return (
    <>
        <CompanyLayout>

        <section>
            <div className='container mx-auto px-6'>

                <div className='h-full pb-24 px-4 md:px-12 py-12'>
                        <div className='flex items-center py-4 mb-6 flex-col lg:flex-row'>
                            <div className='flex-1 w-full'>
                                <h3 className='h2'>Offers</h3>
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
                                        <input type="text" name="price" id="price" className="border border-gray-300 py-2 px-4  block w-full pl-12 pr-12 sm:text-sm rounded-full h-full focus:outline-none focus:border-gray-400" placeholder="Search for offers"/>
                                        
                                    </div>

                            
                        </div>

                        <div className=" w-full bg-white mt-3 md:mt-0  relative overflow-hidden rounded h-full">
                            <div className='absolute h-full border border-[#E4E7EC] inset-0 z-0 mx-auto w-[0.5px] hidden md:block'></div>
                            <div className=" grid grid-cols-2 py-6 w-full gap-6 relative">

                                <div className=" flex flex-col px-4 justify-between">
                                    <div className=" flex flex-col px-4 ">
                                        <div className="flex items-center py-4 px-4  text-sm w-full border-b bg-gray-100 border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
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
                                        <div className="flex items-center py-4 px-4 text-sm w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
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
                                        <div className="flex items-center py-4 px-4 text-sm w-full border-b border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
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
                                        <div className="flex items-center py-4 px-4 text-sm w-full border-gray-200 hover:bg-gray-100 transition duration-200 ease-in-out">
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

                                    <div className='py-4 border-t border-gray-300 flex items-center justify-between'>
                                        <div>
                                            Showing 1 to 10 of 20 results
                                        </div>

                                        <div className='flex items-center justify-between gap-2'>
                                            <button className='px-4 py-2 border border-gray-300 bg-white text-gray-600 rounded-md'>Previous</button>
                                            <button className='px-4 py-2 border border-gray-300 bg-white text-gray-600 rounded-md'>Next</button>
                                        </div>
                                    </div>
                                </div>

                                <div className=''>
                                    <div className='py-2 px-10 sticky top-0'>
                                            <div className='flex items-center justify-between mb-6'>
                                                <div>
                                                    <h2 className='text-3xl mb-2'>120kg of PET Bottles</h2>

                                                    <p className='font-thin text-[#667085]'>Ikeja, Lagos</p>
                                                </div>

                                                <div>
                                                    <div className="radial-progress text-sm text-center text-[#DD7D37]" style={{'--value':25, '--size': '5rem'}}>
                                                        
                                                        <span className='text-[#6D747D]'><span className='font-semibold text-[#3D4044]'>25% <br/></span> provided</span> 
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        <div>
                                        {/* flex items-center justify-between w-full */}
                                            <div className='grid grid-cols-2 gap-4 gap-y-12 py-3'>
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
                                                    <span className="text-gray-700 font-base mb-3">Date Created</span>
                                                    <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center gap-3 text-sm">
                                                        <span className='text-xs'>12:32pm</span> <span>20/10/2022</span>
                                                    </div>
                                                    
                                                </div>
                                                <div className="flex-1">
                                                    <span className="text-gray-700 font-base mb-3">Expiry Date</span>
                                                    <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm">
                                                    30/10/2022
                                                    </div>
                                                    
                                                </div>
                                                <div className="flex-1">
                                                    <span className="text-gray-700 font-base mb-3">Amount Paid</span>
                                                    <div className="w-full h-12 px-4 py-2 mt-2 text-[#6B7280] bg-gray-100  border-0 border-gray-200 focus:border-gray-300 rounded-md focus:outline-none flex items-center text-sm justify-between">
                                                        $7,500

                                                        <span className='text-xs'>1kg = $50</span>
                                                    </div>
                                                    
                                                </div>
                                                <div className="flex-1">
                                                    <span className="text-gray-700 font-base mb-3">Days Left</span>
                                                    <div className="w-full h-12 px-4 py-2 mt-2 text-[#12B76A]   border-0 border-gray-200  rounded-md flex items-center text-sm">
                                                    10d : 24h : 15m : 32s
                                                    </div>
                                                    
                                                </div>
                                            </div>
                                        </div>

                                        <div className='border-t border-gray-200 pt-6 pb-3 mt-9'>
                                            <div className='mb-4'>
                                                <h3 className='text-lg'>Dropoffs</h3>
                                            </div>
                                            <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
                                                <div className="flex items-start gap-4 w-full">

                                                    <div className='h-14 w-14'>
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
                                            <div className="flex items-center py-3 mb-2 text-sm w-full ">
                                                <div className="flex items-start gap-4 w-full">

                                                    <div className='h-14 w-14'>
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

                                            <div className='mx-auto w-full flex items-center justify-center mt-6'>
                                                <Link href='/company/offers/1/dropoffs'>
                                                    <a className='px-4 py-2 border border-gray-300 bg-white text-gray-600 rounded-md'>View all Dropoffs</a>
                                                </Link>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>
                        </div>
                </div>
            </div>
        </section>
        </CompanyLayout>

    </>
  )
}

export default Offers