import React from 'react'
import Layout from '../components/layout/Layout';

const Home = () => {
  return (
    <>
        <Layout>

            <section className='bg-white py-14'>
                <div className='container mx-auto'>
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
                <div className='container mx-auto'>
                    <div className='py-14'>
                        <div className='mb-9'>
                            <h3 className='text-center text-xl'>How it Works</h3>
                        </div>
                        
                        <div>
                            <div className='flex items-center justify-center gap-10'>
                                <button className="">Company</button>
                                <button className="">Individual</button>
                            </div>

                            <div className='tab-content py-10'>
                                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 '>
                                    <div className='px-5'>
                                        <div>
                                            <div className='circle'></div>
                                        </div>
                                        <div className='text-center'>
                                            <h4>Create Account</h4>
                                            <p className='text-sm'>Company Staff creates an account on GidiScrap with MetaMask (or Valora)</p>
                                        </div>
                                    </div>
                                    <div className='px-5'>
                                        <div>
                                            <div className='circle'></div>
                                        </div>
                                        <div className='text-center'>
                                            <h4>Create Account</h4>
                                            <p className='text-sm'>Company Staff creates an account on GidiScrap with MetaMask (or Valora)</p>
                                        </div>
                                    </div>
                                    <div className='px-5'>
                                        <div>
                                            <div className='circle'></div>
                                        </div>
                                        <div className='text-center'>
                                            <h4>Create Account</h4>
                                            <p className='text-sm'>Company Staff creates an account on GidiScrap with MetaMask (or Valora)</p>
                                        </div>
                                    </div>
                                    <div className='px-5'>
                                        <div>
                                            <div className='circle'></div>
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

            <section className='bg-[#F8F7F7] py-20'>
                <div className='container mx-auto'>
                    <div>
                        <div className='mb-9'>
                            <h3 className='text-center text-xl '>Features</h3>
                        </div>
                        <div className='grid grid-cols-1 py-14 gap-10 md:grid-cols-2'>
                            <div className='order-last md:order-first'>
                                <div className='pr-16'>
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
                                <div className='pl-16'>
                                    <h3 className='mb-4 text-[#351F0F]'>
                                    GidiScrap Credit
                                    </h3>
                                    <p>Tempor cursus nec orci pharetra. Est velit dictum sed lacus. Arcu maecenas pretium arcu nunc condimentum augue diam. Tortor nulla in quis senectus facilisi quam nibh vulputate. Lectus cursus maecenas nibh sit pellentesque auctor elementum. Adipiscing ipsum in nulla ultrices eget. Cursus porta in mauris mi dui placerat mi. Mauris tincidunt vulputate tincidunt eget congue.</p>
                                </div>
                                
                            </div>
                        </div>
                        <div className='grid grid-cols-1 md:grid-cols-2 py-14 gap-10'>
                            <div className='order-last md:order-first'>
                                <div className='pr-16'>
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


            <section className='py-4 bg-[#FFFBF9]'>
                <div className='container mx-auto'>
                    <div className='py-14'>
                        <div className='mb-9'>
                            <h3 className='text-center text-xl'>Recent Requests</h3>
                        </div>
                        
                        <div>

                            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 gap-y-9'>
                                <div className='px-5 shadow-sm py-3'>
                                    <div>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full'/>
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
                                    <div>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full'/>
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
                                    <div>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full'/>
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
                                    <div>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full'/>
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
                                    <div>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full'/>
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
                                    <div>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full'/>
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
                                    <div>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full'/>
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
                                    <div>
                                        <div className='w-full h-56'>
                                            <img src='/images/water_bottle.png' className='w-full h-full'/>
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

            <section className='py-4'>
                <div className='container mx-auto'>
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