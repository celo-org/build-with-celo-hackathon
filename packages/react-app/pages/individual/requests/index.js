import axios from 'axios'
import Link from 'next/link'
import React from 'react'
import DropdownIcon from '../../../components/Icons/DropdownIcon'
import UserLayout from '../../../components/UserLayout/Layout'

import { useQuery, useInfiniteQuery } from 'react-query'
import LoadingState from '../../../components/LoadingState'

const Requests = () => {

    const fetchRequests = async ({ pageParam = 1 }) => {
        const res = await fetch(`http://127.0.0.1:8080/api/requests?page=${pageParam}&size=9`);
        return res.json();
    }

    const {
        isLoading,
        isError,
        error,
        data,
        fetchNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery(['requests'], fetchRequests, {
        getNextPageParam: (lastPage, pages) => {
            return lastPage.page + 1
        }
    })

    
    

    // const fetchUsers = async ({ pageParam = 1 }) => {
    //     const res = await fetch(`https://randomuser.me/api/?page=${pageParam}&results=10`);
    //     console.log(res.pages)
    //     return res.json();
    // }

    // const {
    //     isLoading,
    //     isError,
    //     error,
    //     data,
    //     fetchNextPage,
    //     isFetching,
    //     isFetchingNextPage
    // } = useInfiniteQuery(['colors'], fetchUsers, {
    //     getNextPageParam: (lastPage, pages) => {
    //         return lastPage.info.page + 1
    //     }
    // })

    // if (isLoading) {
    //     return <h2>Loading...</h2>
    // }

    if (isError) {
        return <h2>{error.message}</h2>
    }
    // const fetchRequests = async ()=>{
    //     try{
    //         const res = await axios.get( `http://127.0.0.1:8080/api/requests` );
    //         // console.log(res)
    //         return res.data
    //         // setRequests(res.data.data)
            
    //     }catch(err){
    //        console.log(err)
    //     }
    // };

    // const {data, status} = useQuery("requests", fetchRequests)


    // if(status === "loading"){
    //     return <LoadingState/>
    // }

    // if(status === "error"){
    //     return <div>Error</div>
    // }
    
  return (
        <>
        <UserLayout>

            <div>
                
                <section className='py-12'>
                    <div className='container mx-auto px-6'>

                        <div className='px-6 '>

                        <div className='flex items-center py-4 mb-6 flex-col lg:flex-row'>
                            <div className='flex-1 w-full'>
                                <h3 className='h2'>Requests</h3>

                                    
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

                            <div className=" font-normal flex items-center justify-start lg:justify-end flex-row gap-3 flex-1 w-full">
                                    
                                    {/* <button className="flex items-center text-neutral700 bg-white text-sm border-gray-300 border px-5 py-2 rounded-full h-12">
                                        Select country 
                                        <span className='text-sm'>
                                        <DropdownIcon className="text-sm  "/>
                                        </span>
                                    </button> */}
                                    <span className='flex items-center text-gray-400 bg-white text-sm border-gray-300 border px-5 py-2 rounded-full h-12 gap-5'>
                                        Sort By:

                                        {/* onChange={(e)=>setSort(e.target.value)} */}
                                        <select  style={{'background': 'transparent'}} className="focus:outline-none h-full border-none cursor-pointer text-gray-600">
                                            <option value="all">All</option>
                                            <option value="latest">Latest</option>
                                        </select>
                                        {/* <button className="flex items-center text-gray-600 ">
                                        All
                                            <span className='text-sm'>
                                            <DropdownIcon className="text-sm  "/>
                                            </span>
                                        </button> */}
                                    </span>
                                    
                                </div>
                        </div>

                        {isLoading ? 
                        
                        <div className='flex items-center justify-center'>
                            <LoadingState/>
                        </div> : 
                        
                        
                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-9 gap-y-9 '>
                        {data.pages.map(page =>
                            page.data.map((request, index) => (
                                <>
                                    <Link href={`/individual/requests/${request.id}`}>
                                    
                                        <a key={index}>

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
                                                                <p className='text-base text-[#6D747D]'>{request.location && (request.location.name)} {request.location && (request.location.state)}</p>
                                                            </div>
                                                        </div> 

                                                        <h4 className=''>300kg</h4>
                                                    </div>
                                                    <div className='flex items-start justify-between w-full gap-2'>
                                                        <p className='flex-1 text-xs text-[#878A90]'>{request.description.substring(0, 100)}</p>
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
                                </>
                            ))
                        )}
                            {/* {data.length < 1 ? 

                            : 'incomingggg'} */}
                                        
                        </div>
                        
                        
                        }

                        

                        

                                    <div className='flex items-center justify-center mt-8'>
                                        <button className='text-[#DD7D37] px-12 py-2 text-sm border border-[#DD7D37] rounded-full' onClick={fetchNextPage}>Load More {isFetching && !isFetchingNextPage ? <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div> : null}
                                        
                                        </button>
                                    </div>
                                    
                                    {/* {isFetching && !isFetchingNextPage ? <span className='load_more--loader'></span> : null} */}


                        </div>                
                    </div>  
                
                </section>

            </div>


            </UserLayout>
        </>

    )
}

export default Requests