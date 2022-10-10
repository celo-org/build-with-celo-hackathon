import Link from 'next/link'
import React from 'react'
import Layout from '../components/layout/Layout';


const MarketPlace = () => {
  return (
    <>

      <Layout>
      <section className='bg-white py-24'>
                <div className='container mx-auto px-6 w-full'>
                     <div className='flex items-center justify-center max-w-2xl mx-auto'>
                        <div className='text-center'>
                            <div>
                                <h1 className='text-4xl font-extrabold '>
                                Purchase Certified Recycled Scraps
                                </h1>
                            </div>
                            <div className='mb-10 mt-5'>
                                <p className='text-md'>
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

                  <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-9 gap-y-9 '>
                      <div className='card shadow-lg py-3 rounded-md'>
                          <div className=''>
                              <div className='w-full h-56'>
                                  <img src='/images/marketimage.png' className='w-full h-full object-cover rounded-md'/>
                              </div>
                          </div>
                          <div className=' flex items-start justify-between mt-3 px-5'>
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
                                  <div class="radial-progress text-sm text-center text-[#DD7D37]" style={{'--value':25, '--size': '4rem'}}>
                                      
                                      <span className='text-[#6D747D]'><span className='font-semibold text-[#3D4044]'>25%</span> gotten</span> 
                                  </div>
                              </div>
                              
                          </div>
                      </div>
                      <div className='card shadow-lg py-3 rounded-md'>
                          <div className=''>
                              <div className='w-full h-56'>
                                  <img src='/images/marketimage.png' className='w-full h-full object-cover rounded-md'/>
                              </div>
                          </div>
                          <div className=' flex items-start justify-between mt-3 px-5'>
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
                                  <div class="radial-progress text-sm text-center text-[#DD7D37]" style={{'--value':25, '--size': '4rem'}}>
                                      
                                      <span className='text-[#6D747D]'><span className='font-semibold text-[#3D4044]'>25%</span> gotten</span> 
                                  </div>
                              </div>
                              
                          </div>
                      </div>
                      <div className='card shadow-lg py-3 rounded-md'>
                          <div className=''>
                              <div className='w-full h-56'>
                                  <img src='/images/marketimage.png' className='w-full h-full object-cover rounded-md'/>
                              </div>
                          </div>
                          <div className=' flex items-start justify-between mt-3 px-5'>
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
                                  <div class="radial-progress text-sm text-center text-[#DD7D37]" style={{'--value':25, '--size': '4rem'}}>
                                      
                                      <span className='text-[#6D747D]'><span className='font-semibold text-[#3D4044]'>25%</span> gotten</span> 
                                  </div>
                              </div>
                              
                          </div>
                      </div>
                                
                  </div>

                  <div className='flex items-center justify-center mt-8'>
                                <a href='' className='text-[#DD7D37] px-12 py-2 text-sm border border-[#DD7D37] rounded-full'>Load More</a>
                            </div>

                </div>                
              </div>  
            
            </section>   

            {/* <section className='py-12'>
              <div className="container mx-auto px-6">
                <div>
                  <div className='grid grid-cols-1 md:grid-cols-2'>
                    <div>
                      <ol type="1">
                        <li>
                          Jana Plasteeks LTD
                        </li>
                        <li>
                          Jana Plasteeks LTD
                        </li>
                        <li>
                          Jana Plasteeks LTD
                        </li>
                      </ol>
                    </div>

                  </div>
                </div>
              </div>

            </section> */}

  
      </Layout>
    </>
  )
}

export default MarketPlace