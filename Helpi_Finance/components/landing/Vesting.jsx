/* eslint-disable react/no-unescaped-entities */
import React from 'react'

function Vesting() {
  return (
    <div className="md:flex xl:px-16 px-12 py-12 2xl:mx-auto 2xl:container relative z-40">
      <div className="md:w-1/2 xl:mr-32 md:mr-20 my-auto flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-semibold xl:leading-loose text-gray-300">
            What is Vesting?
          </h1>
          <p className="text-base font-medium leading-6 my-4 text-gray-400">
            Vesting protocol allows user to claim their rewards in a periodic
            manner rather than allowing a massive cash-out in order to prevent
            big players (aka "Whales") from crashing the Native Helpi token
            through massive token dumps. This protects the value of the token
            and provide stability to the users.
          </p>
        </div>
        {/* <div className="md:mt-4 mt-8">
          <p className="text-base font-medium leading-4 text-secondary">
            Felipe Montoya
          </p>
          <p className="text-base leading-4 mt-2 mb-4 text-gray-400">
            CEO and Business Developer
          </p>
        </div> */}
      </div>
      <div className="lg:w-1/2 sm:w-full xl:h-96 h-80">
        <img
          src="https://images.unsplash.com/photo-1510146758428-e5e4b17b8b6a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
          alt="profile"
          className="w-full h-full flex-shrink-0 object-fit object-cover shadow-lg rounded"
        />
      </div>
    </div>
  );
}

export default Vesting