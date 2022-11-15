import Link from 'next/link'
import React, {useState, useEffect} from 'react'
import DropdownIcon from '../../components/Icons/DropdownIcon'
import ExpandMoreVertical from '../../components/Icons/ExpandMoreVertical'
import UpwardIcon from '../../components/Icons/UpwardIcon'
import UserLayout from '../../components/UserLayout/Layout'
import { useQuery, useInfiniteQuery } from 'react-query'
import LoadingState from '../../components/LoadingState'
import axios from 'axios'
import { Toaster } from 'react-hot-toast'

const Dashboard = () => {
    const [location, setLocations] = useState();
    const [locationName, setLocationName] = useState("all");
    const [searchvalue, setSearchValue] = useState('');
    const fetchRequests = async ({ pageParam = 1 }) => {
        const res = await fetch(`http://127.0.0.1:8080/api/requests?page=${pageParam}&size=6&filter=location&location=${locationName}`);
        return res.json();
    }

    // , locationName = 'Mushin' 
    const {
        isLoading,
        isError,
        error,
        isSuccess,
        data,
        fetchNextPage,
        isFetching,
        isFetchingNextPage
    } = useInfiniteQuery(['requests', locationName], fetchRequests, {
        getNextPageParam: (lastPage, pages) => {
            return lastPage.page + 1
        },
        keepPreviousData: true,
    })

    useEffect(() => {
        const CancelToken = axios.CancelToken;
        const source = CancelToken.source();

        const getLocations = async ()=>{
            try{
                const res = await axios.get( "http://127.0.0.1:8080/api/locations", { cancelToken: source.token } );
                console.log(res.data)

                setLocations(res.data.locations)
            }catch(err){
                if(axios.isCancel(err)){
                    console.log("cancelled");
                } else{
                    throw err
                }
            }
        };
        getLocations();
        return () => {
            source.cancel();
        }
    }, [])   


    const onChange = (value) => {
        setLocationName(value)
      }
    
  return (
    <>
    <Toaster/>
        <UserLayout>
                <section>
                    <div className='container mx-auto px-6'>

                        <div className='h-full pb-24 px-4 md:px-12 py-12'>
                            <div className='grow py-4'> 
                                <h1 className="text-3xl font-bold text-gray-800 mb-3 ">
                                    Dashboard
                                </h1>
                            </div>


                            <div className='mb-12'>

                                <div className='grid grids-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>

                                    <div className="shadow w-full bg-white relative py-6 rounded border border-[#E4E7EC] flex flex-col justify-between">
                                        <div className='px-6'>
                                            <div className="flex items-center justify-between flex-row w-full">
                                                <h5 className="text-gray-600">Wallet Balance</h5>
                                                <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                                                    <ExpandMoreVertical/>
                                                </button>
                                            </div>
                                            <div className='py-4'>

                                                    <h3 className="text-neutral800 text-4xl	">$ 2,000.00</h3>
                                                
                                            </div>
                                        </div>
                                        <div className='pt-4 border-t border-gray-100 flex items-center justify-end px-6  w-full'>
                                            <Link href='/individual/transactions'>
                                                <a className="text-[#DD7D37] text-base " >View Transactions</a>
                                            </Link>
                                            
                                        </div>
                                    </div>
                                    <div className="shadow w-full bg-white relative  py-6 rounded border border-[#E4E7EC] flex flex-col justify-between">
                                        <div className='px-6'>
                                            <div className="flex items-center justify-between flex-row w-full">
                                                <h5 className="text-gray-600">Total Offers Pending</h5> 
                                                <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                                                    <ExpandMoreVertical/>
                                                </button>
                                            </div>
                                            <div className='py-4'>

                                                    <h3 className="text-neutral800 text-4xl	">5</h3>
                                            </div>
                                        </div>
                                        <div className='pt-4 border-t border-gray-100 flex items-center justify-end px-6  w-full'>
                                            <Link href='/individual/orders'>
                                                <a className="text-[#DD7D37] text-base " >Complete Offers</a>
                                            </Link>
                                        </div>
                                        
                                    </div>
                                    <div className="shadow w-full bg-white relative px-6 py-6 rounded border border-[#E4E7EC">
                                        <div className="flex items-center justify-between flex-row w-full">
                                        <h5 className="text-gray-600">Total Offers Completed</h5>
                                        <button className="text-gray-400 text-xs rounded-full hover:bg-gray-200 p-2 transition duration-200 ease">
                                            <ExpandMoreVertical/>
                                            
                                        </button>
                                        </div>
                                        <div className='py-4 flex items-center justify-between'>
                                            <div>
                                                <div className='py-4'>
                                                    <h3 className="text-neutral800 text-4xl	">10</h3>
                                                </div>

                                                <div className=''>
                                                    <div className='inline-flex items-center gap-1'>
                                                        <span className='text-[#45CD85] inline-flex items-center gap-1'><UpwardIcon/> 40%</span> vs last month
                                                    </div>

                                                </div>
                                            </div>
                                           


                                            <div>
                                                <img src='/images/_Chart.svg'/>
                                            </div>
                                            
                                            
                                        </div>
                                    </div>
                                    </div>
                            </div>
                            <div className="flex my-6 items-stretch w-full space-y-4 md:space-x-4 md:space-y-0 gap-4 flex-col lg:flex-row">
                                <div className="w-full md:w-full lg:w-8/12 flex-col flex-1 md:space-y-4 h-full">
                                    


                                    <div className=" bg-white mt-3 md:mt-0  py-6 w-full  relative overflow-hidden rounded">
                                            
                                        <div className="flex items-center justify-between flex-row w-full border-b border-gray-200 pb-4 flex-wrap">
                                            <h5 className=" text-2xl text-gray-700">Requests in your location</h5>
                                                <span className='flex items-center text-gray-400 bg-white text-sm border-gray-300 border px-5 rounded-full h-12 gap-5 mt-3 md:mt-0'>
                                                    Filter By:
                                                    {/* <button className="flex items-center text-gray-600 ">
                                                    Ikeja, Lagos
                                                        <span className='text-sm'>
                                                        <DropdownIcon className="text-sm  "/>
                                                        </span>
                                                    </button> */}
                                                    {/* locations */}
                                                    {/* <select value={this.state.fruit} onChange={this.handleChange}
                                                        
                                                    >
                                                        
                                                    </select> */}
                                                    <select  style={{'background': 'transparent'}} className="focus:outline-none h-full border-none cursor-pointer text-gray-600 w-auto py-2 " onChange={(e)=>setLocationName(e.target.value)}  >
                                                        <option value="all">All</option>
                                                        {location && location.map((option) => (
                                                            <option value={option.name} key={option.id}>{option.name} {option.state}</option>
                                                        ))}
                                                    </select>
                                                </span>
                                        </div>


                                        {isLoading ? 
                        
                                            <div className='flex items-center justify-center mt-7 '>
                                                <LoadingState/>
                                            </div> : 

                                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-9 gap-y-9 mt-7 relative'>

                                                {
                                                data && data.pages.map(page => (
                                                    page.data.length > 1 ? page.data.map((request, index) => (
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
                                                    )) : 
                                                    <div className='flex items-center justify-center flex-col gap-4 absolute top-0'>
                                                        {/* <img src="/images/file-not-found.svg" /> */}
                                                        <p>
                                                            No Request from {locationName}.
                                                        </p>
                                                    </div>
                                                )
                                                    
                                                )
                                                
                                                }
                                            </div>
                                        }

                                            {/* {isError && isFetching&& <div className='flex items-center justify-center mt-7 '>
                                                <LoadingState/>
                                            </div> } */}


                                            <div className='flex items-center justify-center mt-8'>
                                                <Link href='/individual/requests'>
                                                    <a className='text-[#DD7D37] px-12 py-2 mt-7 text-sm border border-[#DD7D37] rounded-full'>View All Requests                                       
                                                </a>
                                                </Link>
                                                
                                            </div>

                                            
                                    </div>
                                </div>
                                <div className="w-full md:w-full lg:w-4/12 space-x-4 rounded h-full shadow px-4 py-6 bg-white">
                                    <div className="  relative">
                                        <div className="w-full  flex items-center justify-between pb-2">
                                            <h4 className="text-md  text-[#5B5B5B]   font-normal	 ">
                                                Activities  
                                            </h4>

                                            <Link href='/'>
                                                <a className='text-sm'>view all</a>
                                            </Link>

                                        </div>
                                        <div className='h-full flex-1 grow px-5 py-4'>

                                                <ul className="list-disc activities__list">
                                                    <li>
                                                        <div className='flex items-start gap-3'>
                                                            <div className='text-base'>
                                                                <h3 className='text-[#667085] font-medium'>25kg of PET Bottles</h3>
                                                                <p className='text-[#9C9EA1]'>Received $250 </p>
                                                            </div>
                                                            
                                                            <div>
                                                                <span className='text-xs text-[#667085]'>2 mins ago</span>
                                                            </div>
                                                            
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='flex items-start gap-3'>
                                                            <div className='text-base'>
                                                                <h3 className='text-[#667085] font-medium'>25kg of PET Bottles</h3>
                                                                <p className='text-[#9C9EA1]'>Received $250 </p>
                                                            </div>
                                                            
                                                            <div>
                                                                <span className='text-xs text-[#667085]'>2 mins ago</span>
                                                            </div>
                                                            
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='flex items-start gap-3'>
                                                            <div className='text-base'>
                                                                <h3 className='text-[#667085] font-medium'>25kg of PET Bottles</h3>
                                                                <p className='text-[#9C9EA1]'>Received $250 </p>
                                                            </div>
                                                            
                                                            <div>
                                                                <span className='text-xs text-[#667085]'>2 mins ago</span>
                                                            </div>
                                                            
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='flex items-start gap-3'>
                                                            <div className='text-base'>
                                                                <h3 className='text-[#667085] font-medium'>25kg of PET Bottles</h3>
                                                                <p className='text-[#9C9EA1]'>Received $250 </p>
                                                            </div>
                                                            
                                                            <div>
                                                                <span className='text-xs text-[#667085]'>2 mins ago</span>
                                                            </div>
                                                            
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div className='flex items-start gap-3'>
                                                            <div className='text-base'>
                                                                <h3 className='text-[#667085] font-medium'>25kg of PET Bottles</h3>
                                                                <p className='text-[#9C9EA1]'>Received $250 </p>
                                                            </div>
                                                            
                                                            <div>
                                                                <span className='text-xs text-[#667085]'>2 mins ago</span>
                                                            </div>
                                                            
                                                        </div>
                                                    </li>
                                                </ul>
                                        


                                            {/* <div className='flex items-center justify-center h-full flex-col gap-9 py-14'>
                                                <div>
                                                    <img src='/images/file-not-found.svg'/>
                                                </div>
                                                <div>No recent activities</div>
                                            
                                            </div> */}
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </section>

            
        </UserLayout>
        
    </>
  )
}

export default Dashboard