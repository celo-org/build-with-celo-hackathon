import Link from 'next/link'
import React, {useState} from 'react'
import CompanyLayout from '../../components/CompanyLayout/Layout'
import DropdownIcon from '../../components/Icons/DropdownIcon'
import ExpandMoreVertical from '../../components/Icons/ExpandMoreVertical'
import UpwardIcon from '../../components/Icons/UpwardIcon'

const Dashboard = () => {
    const [createOffer, setCreateOffer] = useState();
    const [catDropdown, setCatDropdown] = useState();
    const [typeDropdown, setypeDropdown] = useState();
    const [alertModal, setAlertModal] = useState();
    const [approveOfferModal, setApproveOfferModal] = useState();

    const handleCat = () =>{
        setCatDropdown(!catDropdown)
    }
    const handleType = () =>{
        setypeDropdown(!typeDropdown)
    }
    const handleCreateOffer = () =>{
        setCreateOffer(!createOffer)
    }
    const verifyOffer = () =>{
        setAlertModal(!alertModal)
    }
    const submitOffer = () =>{
        setCreateOffer(false)

        setAlertModal(false)
        setApproveOfferModal(!approveOfferModal)
    }
  return (
    <>
        <CompanyLayout>
            <section>

                <div className='container mx-auto px-6'>

                    <div className='h-full pb-24 px-4 md:px-12 py-12'>
                        <div className='grow py-4 flex items-center justify-between mb-3 '> 
                            <h1 className="text-3xl font-bold text-gray-800 ">
                                Dashboard
                            </h1>
                            <div>
                                <button className='px-8 py-3 rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg text-white transition duration-150 ease-in-out border-0' onClick={handleCreateOffer}>Create Offer</button>
                            </div>
                        </div>

                        <div className="w-full mb-6 py-6 h-full">
                            <div className='grid grids-cols-1 md:grid-cols-2 gap-5'>

                                <div className="shadow w-full bg-white relative  py-6 rounded flex flex-col justify-between">
                                        <div className="flex items-center justify-between flex-row w-full px-6">
                                            <h5 className="text-gray-600 text-lg">Your Offers</h5>
                                            <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                                                <ExpandMoreVertical/>
                                            </button>
                                        </div>
                                        <div className='py-4 px-6'>
                                            <div className="flex items-center py-2 mb-2 text-sm w-full border-gray-200">
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
                                                    
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>
                                            <div className="flex items-center py-2 mb-2 text-sm w-full border-gray-200">
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
                                                    
                                                    </div>
                                                    
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    <div className='pt-4 border-t border-gray-100 flex items-center justify-end w-full'>
                                        <Link href='/company/offers'>
                                            <a className="text-[#DD7D37] text-base px-6">view offers</a>
                                        </Link>
                                        
                                    </div>
                                </div>
                                <div className="shadow w-full bg-white relative  py-6 rounded flex flex-col justify-between">
                                    <div className="flex items-center justify-between flex-row w-full px-6">
                                    <h5 className="text-gray-600 text-lg">Today's Deliveries</h5>
                                    <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                                        <ExpandMoreVertical/>
                                    </button>
                                    </div>
                                    <div className='py-4 px-6 flex items-center justify-between'>
                                            <div>
                                                <h4>14</h4>
                                                <div className='inline-flex items-center gap-1 py-4 '>
                                                    <span className='text-[#45CD85] inline-flex items-center gap-1'><UpwardIcon/> 10%</span> yesterday
                                                </div>
                                            </div>

                                            <div>
                                                <img src='/images/_Chart.svg' />
                                            </div>

                                            
                                    </div>
                                    <div className='pt-4 border-t border-gray-100 flex items-center justify-end w-full'>
                                        <Link href='/company/offers'>
                                            <a className="text-[#DD7D37] text-base px-6">view offers</a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                        <div>
                            <div className="flex items-center justify-between flex-row w-full  pb-4 ">
                                    <div>
                                        <h5 className="text-gray-700">Recent activity</h5>
                                    </div>
                                    <div className='inline-flex gap-4 items-center'>
                                        <button className="text-gray-500 border-gray-400 border text-sm px-5 py-3 bg-white rounded-full">Download</button>
                                        <Link href='/'>
                                            <a className="text-white text-sm  px-5 py-3 bg-[#DD7D37] border border-[#DD7D37] rounded-full">View All</a>
                                        </Link>
                                        
                                    </div>
                            </div>
                            <div className=" mt-5 w-full bg-white  border-t border-gray-200 relative overflow-hidden">
                                <div className=" py-6 w-full relative">

                                    <div className=" grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-x-12 gap-y-4">
                                        <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
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
                                        <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
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
                                        <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
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
                                        <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
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
                                        <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
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
                                        <div className="flex items-center py-3 mb-2 text-sm w-full border-b border-gray-200">
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
                                </div>
                            </div>

                        </div>

                    </div>
                </div>

            </section>

            <div  className={`modal__box ${createOffer ? 'show' : ''}`}>
                <div className="modal__box-wrapper shadow-lg rounded-2xl">
        
                <div className="flex items-start justify-between mb-6">

                    <div className="grow">
                        <h1 className="text-2xl font-semibold mb-3">Create an Offer</h1>

                        <p className='text-base text-gray-500'>Kindly create an offer to place on the marketplace</p>
                    </div>

                    
                    <button className=" flex items-center rounded-full border-2 border-gray-700  " onClick={()=>setCreateOffer(false)}>
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
                                <label className="text-gray-700 font-medium" htmlFor="token">Category of Scrap</label>
                            </div>
                            <div className="dropdown relative grow mb-4 w-full" >
                                <button className="w-full bg-white h-12 focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" id="token"  type="button" onClick={handleCat} >
                                    <span className="pointer-events-none flex items-center gap-2 text-gray-400">
                                    Select the Scrap category
                                    </span>
                                    <span className="pointer-events-none ">
                                        <DropdownIcon />
                                    </span>
                                </button>

                                

                                    <div className={` absolute border bg-white cat-menu ${catDropdown ? 'show' : ''} large-dropdown px-3 shadow-md rounded-md w-full h-40 max-w-full overflow-y-auto scrollbar-change fade-in z-10`}>
                                                
                                        
                                        <div className=" py-4 divide-y">
                                            
                                            <button className="flex items-center py-3 px-2 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <div className="flex items-center justify-center gap-2 pr-2">
                                                    <img src="/images/plastics.svg" className='h-8 w-8'/>
                                                </div>
                                                <div className="flex grow flex-col justify-center items-start text-left">
                                                        <p className="text-gray-700 font-normal text-base">Plastics</p>
                                                </div>
                                            </button>
                                            <button className="flex items-center py-3 px-2 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <div className="flex items-center justify-center gap-2 pr-2">
                                                    <img src="/images/steel-square.svg" className='h-8 w-8'/>
                                                </div>
                                                <div className="flex grow flex-col justify-center items-start text-left">
                                                        <p className="text-gray-700 font-normal text-base">Metals</p>
                                                </div>
                                            </button>
                                            <button className="flex items-center py-3 px-2 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <div className="flex items-center justify-center gap-2 pr-2">
                                                    <img src="/images/tyre.svg" className='h-8 w-8'/>
                                                </div>
                                                <div className="flex grow flex-col justify-center items-start text-left">
                                                        <p className="text-gray-700 font-normal text-base">Rubber</p>
                                                </div>
                                            </button>
                                        
                                        </div>
                                </div>
                            
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-between items-center">                                
                                <label className="text-gray-700 font-medium" htmlFor="token">Type of Scrap</label>
                            </div>
                            <div className="dropdown relative grow mb-4 w-full">
                                <button className="w-full bg-white h-12 focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" id="token" type="button" onClick={handleType}>
                                    <span className="pointer-events-none flex items-center gap-2 text-gray-400">
                                        Select the Scrap type   
                                    </span>
                                    <span className="pointer-events-none ">
                                        <DropdownIcon />
                                    </span>
                                </button>

                                

                                    <div className={` absolute border bg-white type-menu  ${typeDropdown ? 'show' : ''} large-dropdown px-3 shadow-md rounded-md w-full h-40 max-w-full overflow-y-auto scrollbar-change fade-in z-10`}>
                                                
                                        
                                        <div className=" py-4">
                                            
                                            <button className="flex items-center py-3 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <p className="text-gray-700 font-normal text-base px-2">Polyethylene Terephthalate (PET)</p>
                                            </button>
                                            <button className="flex items-center py-3 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <p className="text-gray-700 font-normal text-base px-2">High-Density Polyethylene (HDPE)</p>
                                            </button>
                                            <button className="flex items-center py-3 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <p className="text-gray-700 font-normal text-base px-2">Polyvinyl Chloride (PVC or Vinyl)</p>
                                            </button>
                                            <button className="flex items-center py-3 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <p className="text-gray-700 font-normal text-base px-2">Low-Density Polyethylene (LDPE)</p>
                                            </button>
                                        
                                        </div>
                                </div>
                            
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-between items-center">                                
                                <label className="text-gray-700 font-medium" htmlFor="token">Quantity Required</label>
                            </div>
                            <div className="dropdown relative grow  w-full" data-large-dropdown="">
                                <button className="w-full bg-white h-12 focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" id="token" data-large-dropdown-btn="" type="button" >
                                    <span className="pointer-events-none flex items-center gap-2 text-gray-400">
                                        What's the quantity you need
                                    </span>
                                    <span className="pointer-events-none ">
                                        <DropdownIcon />
                                    </span>
                                </button>

                                

                                    <div className={` absolute border bg-white form-submenu large-dropdown px-3 py-3 shadow-md rounded-md w-full h-40 max-w-full overflow-y-auto scrollbar-change fade-in`}>
                                                
                                        
                                        <div className=" py-4">
                                            
                                            <button className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <div className="flex items-center justify-center gap-2 pr-2">
                                                    <img src="/images/metamask.png" className='h-8 w-8'/>
                                                </div>
                                                <div className="flex grow flex-col justify-center items-start text-left">
                                                        <p className="text-neutral700 font-normal text-base">MetaMask</p>
                                                </div>
                                            </button>
                                            <button className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <div className="flex items-center justify-center gap-2 pr-2">
                                                    <img src="/images/metamask.png" className='h-8 w-8'/>
                                                </div>
                                                <div className="flex grow flex-col justify-center items-start text-left">
                                                        <p className="text-neutral700 font-normal text-base">MetaMask</p>
                                                </div>
                                            </button>
                                            <button className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <div className="flex items-center justify-center gap-2 pr-2">
                                                    <img src="/images/metamask.png" className='h-8 w-8'/>
                                                </div>
                                                <div className="flex grow flex-col justify-center items-start text-left">
                                                        <p className="text-neutral700 font-normal text-base">MetaMask</p>
                                                </div>
                                            </button>
                                        
                                        </div>
                                </div>
                            
                            </div>
                            <div className='flex items-center justify-between'>
                                <p className='text-sm text-gray-500'>1kg = $50</p>
                                <p className='text-gray-700'>150kg = $7,500</p>
                            </div>
                        </div>
                        <div className="mb-3">
                            <div className="flex justify-between items-center">                                
                                <label className="text-gray-700 font-medium" htmlFor="token">Collection Center</label>
                            </div>
                            <div className="dropdown relative grow mb-4 w-full" data-large-dropdown="">
                                <button className="w-full bg-white h-12 focus:outline-none active:outline-none  flex items-center justify-between border border-gray-300 focus:border-gray-400 active:border-gray-400 px-4 py-3 mt-2 rounded-lg transition duration-300 ease" id="token" data-large-dropdown-btn="" type="button" >
                                    <span className="pointer-events-none flex items-center gap-2 text-gray-400">
                                        Select where your collection center would be
                                    </span>
                                    <span className="pointer-events-none ">
                                        <DropdownIcon />
                                    </span>
                                </button>

                                

                                    <div className={` absolute border bg-white form-submenu large-dropdown px-3 py-3 shadow-md rounded-md w-full h-40 max-w-full overflow-y-auto scrollbar-change fade-in`}>
                                                
                                        
                                        <div className=" py-4">
                                            
                                            <button className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <div className="flex items-center justify-center gap-2 pr-2">
                                                    <img src="/images/metamask.png" className='h-8 w-8'/>
                                                </div>
                                                <div className="flex grow flex-col justify-center items-start text-left">
                                                        <p className="text-neutral700 font-normal text-base">MetaMask</p>
                                                </div>
                                            </button>
                                            <button className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <div className="flex items-center justify-center gap-2 pr-2">
                                                    <img src="/images/metamask.png" className='h-8 w-8'/>
                                                </div>
                                                <div className="flex grow flex-col justify-center items-start text-left">
                                                        <p className="text-neutral700 font-normal text-base">MetaMask</p>
                                                </div>
                                            </button>
                                            <button className="flex items-center py-2 px-1 hover:bg-gray-100 text-sm justify-between bg-white border-0 rounded-lg w-full " type="button">
                                                <div className="flex items-center justify-center gap-2 pr-2">
                                                    <img src="/images/metamask.png" className='h-8 w-8'/>
                                                </div>
                                                <div className="flex grow flex-col justify-center items-start text-left">
                                                        <p className="text-neutral700 font-normal text-base">MetaMask</p>
                                                </div>
                                            </button>
                                        
                                        </div>
                                </div>
                            
                            </div>
                        </div>
                        
                    {/* // border-l border-[#E6E3E3] border-r */}


                           
                    </div>

                    <div className='flex justify-center items-center mx-auto w-1/2'>
                        <button className='px-8 py-3 rounded-full shadow-md bg-[#DD7D37] hover:shadow-lg text-white transition duration-150 ease-in-out border-0 w-full' type='button' onClick={verifyOffer}>Create Offer</button>
                    </div>
                </form>
                </div>
            </div>

            <div  className={`modal__box ${alertModal ? 'show' : ''}`}>
                <div className="modal__box-wrapper alert--bx shadow-lg rounded-2xl">
        
                <div className="flex items-start justify-between mb-6">

                    <div className="grow">
                        <h1 className="text-2xl font-semibold mb-3">Are you sure of this offer?</h1>

                        <p className='text-base text-gray-500'>Please note that this offer cannot be edited once it has been created and placed on the market</p>
                        
                    </div>

                    
                    <button className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  " onClick={()=>setAlertModal(false)}>
                           <span className="pointer-events-none flex items-center p-1">
                               <svg className='h-3 w-3 ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                           </span>             
                        
                    </button>

                </div>

                    <div className='flex items-center justify-center gap-4 mt-5 mx-auto'>
                        <button className='px-4 py-2 border border-gray-300 bg-white text-gray-700 rounded-full' type='button'  onClick={()=>setAlertModal(false)}>Go back to offer</button>
                        <button className='px-4 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full' onClick={submitOffer}>Yes, I'm sure</button>
                        
                    </div>
                </div>
            </div>



            <div  className={`modal__box ${approveOfferModal ? 'show' : ''}`}>
                <div className="modal__box-wrapper shadow-lg rounded-2xl relative">

                    <button className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  " onClick={()=>setApproveOfferModal(false)}>
                           <span className="pointer-events-none flex items-center p-1">
                               <svg className='h-3 w-3 ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                           </span>             
                        
                    </button>

                    <div className='px-2 py-6   '>

                        <div className='flex items-center justify-around py-4'>
                            <div className='h-16'>
                                <img src='/images/metamask2.svg' className='h-full object-cover'/>
                            </div>
                            <div className='h-12'>
                                <img src='/images/wood.svg' className='h-full object-cover'/>
                            </div>

                        </div>

                        <div className="flex items-center justify-center text-center mb-6 w-full">

                            <div className="grow w-full">
                                <h1 className="text-2xl font-semibold mb-2">Approve transfer to escrow wallet </h1>

                                <p className='text-sm text-[#878A90] font-normal'>This is to enable gidiscrap deduct the exact amount you're being charged</p>
                                
                            </div>

                        </div>
                        <div className="flex items-center justify-center flex-col gap-2 text-center my-6 py-4 w-full">

                                <p className='text-sm text-gray-700'>You're about to approve this amount to gidiscrap escrow wallet</p>
                                <h1 className="text-3xl font-semibold mb-2">cUSD7,500</h1>
                                

                        </div>

                        <div className='flex items-center justify-center gap-4 mt-5 mx-auto w-full'>
                            <button className='px-9 w-1/2 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full' onClick={submitOffer}>Approve</button>

                        </div>

                    </div>
        
                    
                </div>
            </div>
        </CompanyLayout>
    </>
  )
}

export default Dashboard