import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link'
import React from 'react'
import Layout from '../components/layout/Layout';
import DropdownIcon from '../components/Icons/DropdownIcon';
import { useQuery, useInfiniteQuery } from 'react-query'
import LoadingState from '../components/LoadingState'



// export const getStaticProps = async () => {
//     try{
//       const res = await fetch('http://127.0.0.1:8080/api/requests')
//       if(res){
//         console.log(res);
//         const data = await res.json();
  
//         return {
//           props: {requests: data}
//         }
//       }
//     }catch(err){
  
//     }
    
//   }

const MarketPlace = () => {


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

    if (isError) {
        return <h2>{error.message}</h2>
    }
    
  return (
    <>

      <Layout>
            <section className='bg-white py-24' style={{'backgroundImage': 'url(/images/marketplace_bg.png)', 'backgroundPosition': 'center center', 'backgroundSize': 'cover', 'backgroundRepeat': 'no-repeat'}}>
                <div className='container mx-auto px-6 w-full'>
                     <div className='flex items-center justify-center max-w-2xl mx-auto'>
                        <div className='text-center'>
                            <div>
                                <h1 className='text-5xl font-extrabold text-white'>
                                Purchase Certified Recycled Scraps
                                </h1>
                            </div>
                            <div className='mb-10 mt-5'>
                                <p className='text-md text-white'>
                                Every piece of plastic sold on Gidiscrap Marketplace is fully certified, comes with documentation of its provenance and information about its social and environmental impact.
                                </p>
                            
                            </div>

                            <div>
                                <Link href='/marketplace'>
                                    <a  className='rounded-full px-5 py-4 text-md bg-[#DD7D37] text-white' >Sign Up for Free</a>
                                </Link>
                                
                            </div>
                        </div>
                      

                    </div>
                </div>
               
            </section>    


            <section className='py-12'>
              <div className='container mx-auto px-6'>

                <div className='px-6 '>

                  <div className='flex items-center py-4 mb-6'>
                    <div className='flex-1'>
                      <h3 className='h2'>Requests</h3>
                    </div>

                    <div className="mt-1 relative rounded-full flex-1  items-center grow flex h-12 ">
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

                    <div className=" font-normal flex items-center justify-end flex-row gap-3 flex-1">
                            
                            <button className="flex items-center text-neutral700 bg-white text-sm border-gray-300 border px-5 py-2 rounded-full h-12">
                                Select country 
                                <span className='text-sm'>
                                  <DropdownIcon className="text-sm  "/>
                                </span>
                            </button>
                            <button className="flex items-center text-neutral700 bg-white text-sm border-gray-300 border px-5 py-2 rounded-full h-12">
                                Sort By
                                <span className='text-sm'>
                                  <DropdownIcon className="text-sm  "/>
                                </span>
                            </button>
                        </div>
                  </div>


                                    {isLoading 

                                        ? 
                                        
                                        <div className='flex items-center justify-center'>
                                            <LoadingState />
                                        </div> : 

                                        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-9 gap-y-9 '>
                                        {data.pages.map(page =>
                                                    page.data.map((request, index) => (
                                                        <>
                                                            <Link href={`/individual/requests/${request.id}`} key={index}>
                                                            
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
                                                        </>
                                                    ))
                                                )}
                                            

                                            
                                                        
                                        </div>

                                    }

                                    <div className='flex items-center justify-center mt-8'>
                                        <button className='text-[#DD7D37] px-12 py-2 text-sm border border-[#DD7D37] rounded-full' onClick={fetchNextPage}>Load More {isFetching && !isFetchingNextPage ? <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div> : null}
                                        
                                        </button>
                                    </div>

                </div>                
              </div>  
            
            </section>   

            <section className='py-12'>
              <div className="container mx-auto px-6">
                <div>
                  <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div>
                      <h3 className='h2'>Top Sellers this week</h3>
                      <div>

                      </div>
                    </div>
                    <div>
                      <h3 className='h2'>Top Buyers this week</h3>
                    </div>

                  </div>
                </div>
              </div>

            </section>

  
      </Layout>
    </>
  )
}

export default MarketPlace