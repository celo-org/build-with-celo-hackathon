import React from 'react'
import Layout from '../components/layout/Layout';

const Home = () => {
  return (
    <>
        <Layout>

            <section className='bg-white py-14'>
                <div className='container mx-auto px-6'>
                     <div className='grid grid-cols-1 md:grid-cols-2 items-center '>
                        <div className='w-5/6'>
                            <div>
                                <h1 className='text-4xl '>
                                Open Marketplace for Recycled Plastics
                                </h1>
                            </div>
                            <div className='mb-10 mt-5'>
                                <p className='text-md'>
                                    In order to fight plastic pollution, GidiScrap is an open marketplace that connects buyers of used and recycled plastics with individuals and businesses who want to donate or sell them.

                                </p>
                            
                            </div>

                            <div>
                                <a href='' className='rounded-full px-5 py-4 text-md bg-[#DD7D37] text-white' >Sign up for free</a>
                            </div>
                        </div>
                        <div className='hidden md:block'>
                            <div>
                                <img src='/images/hero_image.svg' />
                            </div>
                        </div>

                    </div>
                </div>
               
            </section>  

            <section className='py-4 bg-[#FFFBF9]'>
                <div className='container mx-auto px-6'>
                    <div className='py-14'>
                        <div className='mb-9'>
                            <h3 className='text-center text-xl'>How it Works</h3>
                        </div>
                        
                        <div>
                            <div className='flex items-center justify-center gap-10 mb-9'>
                                <button className="p-6 border-b-4 border-[#DD7D37]">Company</button>
                                <button className="p-6">Individual</button>
                            </div>

                            <div className='tab-content py-10'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-y-8'>
                                    <div className='px-5'>
                                        <div className='flex items-center justify-center mb-5'>
                                            <div className='circle border-4 border-[#E2DFDD] w-24 h-24 rounded-full relative '>
                                                <span className='absolute top-0 left-0 text-white rounded-full bg-[#DD7D37] p-3 w-3 h-3 z-10 flex items-center justify-center text-sm'>6</span>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <h4>Create Account</h4>
                                            <p className='text-sm'>Company Staff creates an account on GidiScrap with MetaMask (or Valora)</p>
                                        </div>
                                    </div>
                                    <div className='px-5'>
                                        <div className='flex items-center justify-center mb-5'>
                                            <div className='circle border-4 border-[#E2DFDD] w-24 h-24 rounded-full relative '>
                                                <span className='absolute top-0 left-0 text-white rounded-full bg-[#DD7D37] p-3 w-3 h-3 z-10 flex items-center justify-center text-sm'>7</span>
                                            </div>
                                        </div>
                                        
                                        <div className='text-center'>
                                            <h4>Create Account</h4>
                                            <p className='text-sm'>Company Staff creates an account on GidiScrap with MetaMask (or Valora)</p>
                                        </div>
                                    </div>
                                    <div className='px-5'>
                                        <div className='flex items-center justify-center mb-5'>

                                            <div className='circle border-4 border-[#E2DFDD] w-24 h-24 rounded-full relative '>
                                                <span className='absolute top-0 left-0 text-white rounded-full bg-[#DD7D37] p-3 w-3 h-3 z-10 flex items-center justify-center text-sm'>8</span>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <h4>Create Account</h4>
                                            <p className='text-sm'>Company Staff creates an account on GidiScrap with MetaMask (or Valora)</p>
                                        </div>
                                    </div>
                                    <div className='px-5'>
                                        <div className='flex items-center justify-center mb-5'>

                                            <div className='circle border-4 border-[#E2DFDD] w-24 h-24 rounded-full relative '>
                                                <span className='absolute top-0 left-0 text-white rounded-full bg-[#DD7D37] p-3 w-3 h-3 z-10 flex items-center justify-center text-sm'>9</span>
                                            </div>
                                        </div>
                                        <div className='text-center'>
                                            <h4>Create Account</h4>
                                            <p className='text-sm'>Company Staff creates an account on GidiScrap with MetaMask (or Valora)</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    
                </div>
            </section>

            <section className='py-4 bg-white'>
                <div className='container mx-auto px-6'>
                    <div className='py-14'>
                        <div className='mb-9'>
                            <h3 className='text-center text-xl'>Recent Requests</h3>
                        </div>
                        
                        <div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-9'>
                                <div className='px-5 shadow-sm py-3'>
                                    <div className='rounded-md'>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full object-cover rounded-md'/>
                                        </div>
                                    </div>
                                    <div className=' flex items-start justify-between mt-3'>
                                       <div>
                                            <h4 className='mb-2'>PET Bottles</h4>
                                            <div className='flex items-start justify-start gap-2'>
                                                <img src='/images/location.svg' className=''/>
                                                <div>
                                                    <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                    <p className='text-sm text-[#6D747D]'>20 mins away from you</p>
                                                </div>
                                            
                                            </div> 
                                            
                                       </div>
                                        <div>
                                            circle
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='px-5 shadow-sm py-3'>
                                    <div className='rounded-md'>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full object-cover rounded-md'/>
                                        </div>
                                    </div>
                                    <div className=' flex items-start justify-between mt-3'>
                                       <div>
                                            <h4 className='mb-2'>PET Bottles</h4>
                                            <div className='flex items-start justify-start gap-2'>
                                                <img src='/images/location.svg'/>
                                                <div>
                                                    <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                    <p className='text-sm text-[#6D747D]'>20 mins away from you</p>
                                                </div>
                                            
                                            </div> 
                                            
                                       </div>
                                        <div>
                                            circle
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='px-5 shadow-sm py-3'>
                                    <div className='rounded-md'>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full object-cover rounded-md'/>
                                        </div>
                                    </div>
                                    <div className=' flex items-start justify-between mt-3'>
                                       <div>
                                            <h4 className='mb-2'>PET Bottles</h4>
                                            <div className='flex items-start justify-start gap-2'>
                                                <img src='/images/location.svg'/>
                                                <div>
                                                    <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                    <p className='text-sm text-[#6D747D]'>20 mins away from you</p>
                                                </div>
                                            
                                            </div> 
                                            
                                       </div>
                                        <div>
                                            circle
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='px-5 shadow-sm py-3'>
                                    <div className='rounded-md'>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full object-cover rounded-md'/>
                                        </div>
                                    </div>
                                    <div className=' flex items-start justify-between mt-3'>
                                       <div>
                                            <h4 className='mb-2'>PET Bottles</h4>
                                            <div className='flex items-start justify-start gap-2'>
                                                <img src='/images/location.svg'/>
                                                <div>
                                                    <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                    <p className='text-sm text-[#6D747D]'>20 mins away from you</p>
                                                </div>
                                            
                                            </div> 
                                            
                                       </div>
                                        <div>
                                            circle
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='px-5 shadow-sm py-3'>
                                    <div className='rounded-md'>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full object-cover rounded-md'/>
                                        </div>
                                    </div>
                                    <div className=' flex items-start justify-between mt-3'>
                                       <div>
                                            <h4 className='mb-2'>PET Bottles</h4>
                                            <div className='flex items-start justify-start gap-2'>
                                                <img src='/images/location.svg'/>
                                                <div>
                                                    <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                    <p className='text-sm text-[#6D747D]'>20 mins away from you</p>
                                                </div>
                                            
                                            </div> 
                                            
                                       </div>
                                        <div>
                                            circle
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='px-5 shadow-sm py-3'>
                                    <div className='rounded-md'>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full object-cover rounded-md'/>
                                        </div>
                                    </div>
                                    <div className=' flex items-start justify-between mt-3'>
                                       <div>
                                            <h4 className='mb-2'>PET Bottles</h4>
                                            <div className='flex items-start justify-start gap-2'>
                                                <img src='/images/location.svg'/>
                                                <div>
                                                    <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                    <p className='text-sm text-[#6D747D]'>20 mins away from you</p>
                                                </div>
                                            
                                            </div> 
                                            
                                       </div>
                                        <div>
                                            circle
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='px-5 shadow-sm py-3'>
                                    <div className='rounded-md'>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full object-cover rounded-md'/>
                                        </div>
                                    </div>
                                    <div className=' flex items-start justify-between mt-3'>
                                       <div>
                                            <h4 className='mb-2'>PET Bottles</h4>
                                            <div className='flex items-start justify-start gap-2'>
                                                <img src='/images/location.svg'/>
                                                <div>
                                                    <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                    <p className='text-sm text-[#6D747D]'>20 mins away from you</p>
                                                </div>
                                            
                                            </div> 
                                            
                                       </div>
                                        <div>
                                            circle
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className='px-5 shadow-sm py-3'>
                                    <div className='rounded-md'>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full object-cover rounded-md'/>
                                        </div>
                                    </div>
                                    <div className=' flex items-start justify-between mt-3'>
                                       <div>
                                            <h4 className='mb-2'>PET Bottles</h4>
                                            <div className='flex items-start justify-start gap-2'>
                                                <img src='/images/location.svg'/>
                                                <div>
                                                    <p className='text-base text-[#6D747D]'>Ikeja, Lagos</p>
                                                    <p className='text-sm text-[#6D747D]'>20 mins away from you</p>
                                                </div>
                                            
                                            </div> 
                                            
                                       </div>
                                        <div>
                                            circle
                                        </div>
                                        
                                    </div>
                                </div>
                                
                            </div>

                            <div className='flex items-center justify-center mt-8'>
                                <a href='' className='text-[#DD7D37] px-12 py-2 text-sm border border-[#DD7D37] rounded-full'>View all Requests</a>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </section>

            <section className='bg-[#F8F7F7] py-20'>
                <div className='container mx-auto px-6'>
                    <div>
                        <div className='mb-9'>
                            <h3 className='text-center text-xl '>Features</h3>
                        </div>
                        <div className='grid grid-cols-1 py-14 gap-10 md:grid-cols-2'>
                            <div className='order-last md:order-first'>
                                <div className='pr-0 lg:pr-16'>
                                    <h3 className='mb-4 text-[#351F0F]'>
                                    GidiScrap Credit
                                    </h3>
                                    <p>Tempor cursus nec orci pharetra. Est velit dictum sed lacus. Arcu maecenas pretium arcu nunc condimentum augue diam. Tortor nulla in quis senectus facilisi quam nibh vulputate. Lectus cursus maecenas nibh sit pellentesque auctor elementum. Adipiscing ipsum in nulla ultrices eget. Cursus porta in mauris mi dui placerat mi. Mauris tincidunt vulputate tincidunt eget congue.</p>
                                </div>
                                
                            </div>

                            <div className='flex items-center justify-end'>
                                <div className='features-img'></div>
                            </div>

                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 py-14 gap-10'>
                            <div className='flex items-center justify-start'>
                                <div className='features-img'></div>
                            </div>
                            <div>
                                <div className='pl-0 md:pl-0 lg:pl-16'>
                                    <h3 className='mb-4 text-[#351F0F]'>
                                    GidiScrap Credit
                                    </h3>
                                    <p>Tempor cursus nec orci pharetra. Est velit dictum sed lacus. Arcu maecenas pretium arcu nunc condimentum augue diam. Tortor nulla in quis senectus facilisi quam nibh vulputate. Lectus cursus maecenas nibh sit pellentesque auctor elementum. Adipiscing ipsum in nulla ultrices eget. Cursus porta in mauris mi dui placerat mi. Mauris tincidunt vulputate tincidunt eget congue.</p>
                                </div>
                                
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 py-14 gap-10'>
                            <div className='order-last md:order-first'>
                                <div className='pr-0 lg:pr-16'>
                                    <h3 className='mb-4 text-[#351F0F]'>
                                    GidiScrap Credit
                                    </h3>
                                    <p>Tempor cursus nec orci pharetra. Est velit dictum sed lacus. Arcu maecenas pretium arcu nunc condimentum augue diam. Tortor nulla in quis senectus facilisi quam nibh vulputate. Lectus cursus maecenas nibh sit pellentesque auctor elementum. Adipiscing ipsum in nulla ultrices eget. Cursus porta in mauris mi dui placerat mi. Mauris tincidunt vulputate tincidunt eget congue.</p>
                                </div>
                                
                            </div>

                            <div className='flex items-center justify-end'>
                                <div className='features-img'></div>
                            </div>

                        </div>
                    </div>
                </div>
            </section>


            

            <section className='antialised bg-[#FFFBF9] py-12'>


                <div className="container mx-auto px-6">

                    <div className='mb-9'>
                        <h3 className='text-center text-xl '>Future Roadmap</h3>
                    </div>

                    <div className='flex items-center justify-center mx-auto max-w-3xl'>

                    
                        <div
                            className="flex flex-col md:grid grid-cols-9 mx-auto p-2 text-[#3F3F3F]"
                        >
                            
                            <div className="flex md:contents">
                            <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                                </div>
                                <div
                                className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"
                                ></div>
                            </div>
                            <div
                                className="bg-white col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md"
                            >
                                
                                <p className="leading-tight text-justify">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Vitae, facilis.
                                </p>
                            </div>
                            </div>
                            <div className="flex flex-row-reverse md:contents">
                            <div
                                className="bg-white col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md"
                            >
                                
                                <p className="leading-tight text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                                quaerat?
                                </p>
                            </div>
                            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                                </div>
                                <div
                                className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"
                                ></div>
                            </div>
                            </div>


                            <div className="flex md:contents">
                            <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                                </div>
                                <div
                                className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"
                                ></div>
                            </div>
                            <div
                                className="bg-white col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md"
                            >
                                
                                <p className="leading-tight text-justify">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Vitae, facilis.
                                </p>
                            </div>
                            </div>

                            <div className="flex flex-row-reverse md:contents">
                            <div
                                className="bg-white col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md"
                            >
                                
                                <p className="leading-tight text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                                quaerat heyy herfe?
                                </p>
                            </div>
                            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                                </div>
                                <div
                                className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"
                                ></div>
                            </div>
                            </div>


                            <div className="flex md:contents">
                            <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                                </div>
                                <div
                                className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"
                                ></div>
                            </div>
                            <div
                                className="bg-white col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md"
                            >
                                
                                <p className="leading-tight text-justify">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Vitae, facilis.
                                </p>
                            </div>
                            </div>



                            <div className="flex flex-row-reverse md:contents">
                            <div
                                className="bg-white col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md"
                            >
                                
                                <p className="leading-tight text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                                quaerat heyy herfe?
                                </p>
                            </div>
                            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                                </div>
                                <div
                                className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"
                                ></div>
                            </div>
                            </div>


                            <div className="flex md:contents">
                            <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                                </div>
                                <div
                                className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"
                                ></div>
                            </div>
                            <div
                                className="bg-white col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md"
                            >
                                
                                <p className="leading-tight text-justify">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Vitae, facilis.
                                </p>
                            </div>
                            </div>

                            <div className="flex flex-row-reverse md:contents">
                            <div
                                className="bg-white col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md"
                            >
                                
                                <p className="leading-tight text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                                quaerat heyy herfe?
                                </p>
                            </div>
                            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                                </div>
                                <div
                                className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"
                                ></div>
                            </div>
                            </div>

                            <div className="flex md:contents">
                            <div className="col-start-5 col-end-6 mr-10 md:mx-auto relative">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                                </div>
                                <div
                                className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"
                                ></div>
                            </div>
                            <div
                                className="bg-white col-start-6 col-end-10 p-4 rounded-xl my-4 mr-auto shadow-md"
                            >
                                
                                <p className="leading-tight text-justify">
                                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                                Vitae, facilis.
                                </p>
                            </div>
                            </div>


                            <div className="flex flex-row-reverse md:contents">
                            <div
                                className="bg-white col-start-1 col-end-5 p-4 rounded-xl my-4 ml-auto shadow-md"
                            >
                                
                                <p className="leading-tight text-justify">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                                quaerat heyy herfe?
                                </p>
                            </div>
                            <div className="col-start-5 col-end-6 md:mx-auto relative mr-10">
                                <div className="h-full w-6 flex items-center justify-center">
                                <div className="h-full w-1 bg-[#D9D9D9] pointer-events-none"></div>
                                </div>
                                <div
                                className="w-6 h-6 absolute top-1/2 -mt-3 rounded-full bg-[#9D8778] shadow"
                                ></div>
                            </div>
                            </div>


                        </div>
                    </div>
                </div>

            </section>

            <section className='py-4'>
                <div className='container mx-auto px-6'>
                    <div className='py-14'>
                        <div className='mb-9'>
                            <h3 className='text-center text-xl'>Meet the team</h3>
                        </div>

                        <div>
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-7'>
                                <div className=''>
                                    <div className='mb-4 flex items-center justify-center'>
                                        <div className='square'></div>
                                    </div>
                                    <h5 className='text-center'>Paul Oladimeji</h5>
                                </div>
                                <div className=''>
                                    <div className='mb-4 flex items-center justify-center'>
                                        <div className='square'></div>
                                    </div>
                                    <h5 className='text-center'>Paul Oladimeji</h5>
                                </div>
                                <div className=''>
                                    <div className='mb-4 flex items-center justify-center'>
                                        <div className='square'></div>
                                    </div>
                                    <h5 className='text-center'>Paul Oladimeji</h5>
                                </div>
                                
                                

                            </div>
                        </div>
                    </div>

                </div>
            </section>
        
        </Layout>
    </>
  )
}

export default Home;