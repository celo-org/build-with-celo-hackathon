import React, {useState, useEffect, useRef} from 'react'
import Link from 'next/link'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dropdown from '../Dropdown'
const Header = () => {

        const [dropdown, setDropdown] = useState(false);
        const [getStartedBtn, setGetStartedBtn] = useState(false);
        const [getstarted, setGetStarted] = useState(0);
        const ref = useRef();
        const testref= useRef();
    
        const depthLevel = 0 ;
        const dropdownClass = depthLevel > 1 ? "inner-menu" : "";


      useEffect(()=>{
        const handler = (e) => {
          if (dropdown && ref.current && !ref.current.contains(e.target)){
            setDropdown(false);
            
          }else if (dropdown && testref.current && !testref.current.contains(e.target)){
            setDropdown(false);

    
          }
        };
    
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return() => {
          document.removeEventListener("mousedown", handler);
          document.removeEventListener("touchstart", handler);
        };
      }, [dropdown]);
    
    
      const onClickGetStarted = () =>{
        setGetStarted(!getstarted);

        
      }
      const onMouseEnter = () =>{
        window.innerWidth > 960 && setDropdown(true);
        
      }
    
      const onMouseLeave = () =>{
        window.innerWidth > 960 && setDropdown(false);
    
      }




      const handleClickGetStarted = (type) =>{
        if (type == "company"){
            console.log("company clicked");
            setGetStartedBtn(1);
        }else if(type == "collector"){
            console.log("collector clicked");
            setGetStartedBtn(2);
        }
      }

  return (
    <>

    <header className='bg-indigo-400 shadow-header sticky top-0 z-50'>
        <div className='container mx-auto'>
                <nav className="flex  flex-wrap items-center justify-between px-6 py-4">
                <div className="lg:order-1 w-auto lg:w-1/4 lg:text-center">
                    <Link href="/">
                        <a className="text-xl text-gray-800 font-semibold font-heading" >
                            <img src='/images/logo.svg'/>
                        </a>
                    </Link>

                    
                </div>
                <div className="block lg:hidden">
                    <button className="navbar-burger flex items-center py-2 px-3 text-indigo-500 rounded border border-indigo-500">
                        <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>
                                Menu
                            </title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z">
                            </path>
                        </svg>
                    </button>
                </div>
                <div className='hidden lg:order-2 lg:block w-full lg:w-auto lg:text-center'>

                    <div className="navbar-menu flex items-center justify-end gap-6  ">
                        
                        <Link href="/marketplace">
                            <a className="block lg:inline-block mt-4 lg:mt-0 text-blue-900 hover:text-indigo-600 px-5" >
                                MarketPlace
                            </a>
                        </Link>
                        
                        <a className="block lg:inline-block mt-4 lg:mt-0 text-blue-900 hover:text-indigo-600 px-5 " href="#">
                        How it works
                        </a>

                        <div className='block lg:inline-block relative cursor-pointer' ref={ref} >
                            <a className=" mt-4 lg:mt-0  text-blue-900 hover:text-indigo-600 px-5 cursor-pointer" onMouseEnter={onMouseEnter}  >
                            Features

                            <ExpandMoreIcon/>
                            </a>

                            <div className={`absolute user-menu ${depthLevel = 3} ${dropdownClass} ${dropdown ? 'show' : ''} dropdown-menu large-dropdown shadow-md rounded-md w-full border-0 fade-in transition duration-300 ease bg-white`} >
                                        
                                            <div className=" py-2">
                                                <button className="flex items-center py-2 px-4 text-sm justify-start bg-white border-0 w-full hover:bg-gray-100 ">
                                                    <span className="mr-3">

                                                        
                                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.89844 7.55999C9.20844 3.95999 11.0584 2.48999 15.1084 2.48999H15.2384C19.7084 2.48999 21.4984 4.27999 21.4984 8.74999V15.27C21.4984 19.74 19.7084 21.53 15.2384 21.53H15.1084C11.0884 21.53 9.23844 20.08 8.90844 16.54" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M15.0011 12H3.62109" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            <path d="M5.85 8.6499L2.5 11.9999L5.85 15.3499" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                                                        </svg>
                                                            
                                                    </span>
                                                    Sign Out
                                                </button>
                                            </div>
                                    </div>

                            {/* <Dropdown/> */}
                            {/* <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel}/> */}
                        </div>


                        <button className="block lg:inline-block mt-4 lg:mt-0 text-white hover:text-[#DD7D37] hover:bg-white hover:border-[#DD7D37] border bg-[#DD7D37] rounded-full px-9 py-3 transition duration-300 ease" onClick={onClickGetStarted}>
                        Get Started
                        </button>
                    </div>

                </div>
               
            </nav>
        </div>
        
    </header>

    <div  className={`modal__box ${getstarted ? 'show' : ''}`}>
                <div className="modal__box-wrapper get__started__modal shadow-lg rounded-2xl">
        
                <div className=" mb-6">

                    <div className="flex items-center justify-center flex-col gap-3 grow">
                        <div><img src="/images/logo.svg"/></div>

                        <p className="mb-3">Kindly Select your role</p>
                    </div>

                    
                    <button className=" flex items-center rounded-full border-2 border-gray-700 absolute top-3 right-2  " onClick={()=>(setGetStarted(false), setGetStartedBtn(0))}>
                           <span className="pointer-events-none flex items-center p-1">
                               <svg className='h-3 w-3 ' viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round"></path>
                                </svg>
                           </span>             
                        
                    </button>

                </div>


                <div className='flex items-center justify-around py-8 my-6 get-started__btns'>
                    <button className={`flex items-center flex-col gap-4 com__btn px-7 py-4 rounded-lg border  hover:border hover:border-[#DD7D37] transition duration-150 ease-in-out ${getStartedBtn == 1 ? 'border-[#DD7D37]' : 'border-white'}`} onClick={()=>handleClickGetStarted("company")}>
                        <div>
                            <img src='/images/company.svg'/>
                        </div>
                        <span>Company</span>
                    </button>
                    <button className={`flex items-center flex-col gap-4 col__btn px-7 py-4 rounded-lg border  hover:border hover:border-[#DD7D37] transition duration-150 ease-in-out ${getStartedBtn == 2 ? 'border-[#DD7D37]' : 'border-white'}`} onClick={()=>handleClickGetStarted("collector")}>

                        <div className='p-4'>
                            <img src='/images/users.svg'/>
                        </div>
                        
                        <span>Collector</span>

                    </button>
                    

                </div>

                    <div className='flex items-center justify-center gap-4 mt-5 mx-auto w-full'>
                        <button className='px-9 py-2 border border-[#DD7D37] bg-[#DD7D37] text-white rounded-full w-1/2 '  disabled={getStartedBtn == 0 ? true : false} >Continue</button>
                    </div>
                </div>
            </div>
    </>
  )
}

export default Header