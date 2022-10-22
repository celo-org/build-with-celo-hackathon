import React from 'react'

function Homepage() {
  return (
    <div className='w-[1200px]'>
      
      <div className='mt-20 custom-im flex items-center justify-start h-[400px] bg-fixed bg-center bg-cover'>
         <h2 className='font-bold text-[40px] text-center text-[#ffffff]'>a successful business strategy begins with <br /> discovering the right investors</h2>
      </div>

<div className="sm:flex flex-wrap justify-center items-center text-center gap-8">
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 px-4 py-4 bg-white mt-6 rounded-lg dark:bg-gray-800">
        <div className="flex-shrink-0">
            {/* <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg width="20" height="20" fill="currentColor" className="h-6 w-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
            </div> */}
        </div>
        <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
            I want To Invest
        </h3>
        <p className="text-md  text-gray-500 dark:text-gray-300 py-4">
            Invest in the equity of <br /> hand-picked startups – powered <br /> by Blockchain
        </p>
        <button type="button" className=" inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Get Started</button>
    </div>
    
    <div className="w-full sm:w-1/2 md:w-1/2 lg:w-1/4 mt-6  px-4 py-4 bg-white rounded-lg dark:bg-gray-800">
        <div className="flex-shrink-0">
            {/* <div className="flex items-center mx-auto justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                <svg width="20" height="20" fill="currentColor" className="h-6 w-6" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                    <path d="M491 1536l91-91-235-235-91 91v107h128v128h107zm523-928q0-22-22-22-10 0-17 7l-542 542q-7 7-7 17 0 22 22 22 10 0 17-7l542-542q7-7 7-17zm-54-192l416 416-832 832h-416v-416zm683 96q0 53-37 90l-166 166-416-416 166-165q36-38 90-38 53 0 91 38l235 234q37 39 37 91z">
                    </path>
                </svg>
            </div> */}
        </div>
        <h3 className="text-2xl sm:text-xl text-gray-700 font-semibold dark:text-white py-4">
            I own A Startup
        </h3>
        <p className="text-md  text-gray-500 dark:text-gray-300 py-4">
            I am searching for investors to <br /> fund my startup
        </p>
        <button type="button" className=" inline-block px-6 py-2.5 bg-green-600 text-white font-medium text-xs leading-tight uppercase rounded hover:bg-green-700 hover:shadow-lg focus:bg-green-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-green-800 active:shadow-lg transition duration-150 ease-in-out">Get Started</button>
    </div>
</div> <br />

      <div className="flex justify-center mb-20">
  <div className="block p-16 rounded-lg bg-[#ffe6d8] max-w-lg">
    <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2 text-center">How it Works?</h5> <br />
    <p className="text-gray-700 text-base mb-4 text-center">
      We make it possible for you to unlock your financial freedom!  
We are creating a hospitable environment where creatives and investors match with no hassle.
</p>
  </div>
</div>
      
    </div>

    
  )
}

export default Homepage
