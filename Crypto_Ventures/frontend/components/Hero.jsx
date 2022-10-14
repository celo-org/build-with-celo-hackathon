import React from 'react';
//import { FaGoogle } from 'react-icons/fa';
import {FcGoogle} from 'react-icons/fc'
import {BsApple} from 'react-icons/bs';
import {BsFacebook} from 'react-icons/bs';
import {RiCheckboxCircleLine} from 'react-icons/ri';

const Hero = () => {
  return (
    <div className='flex items-center justify-start h-screen mb-12 bg-fixed bg-center bg-cover custom-img'>
      {/* Overlay */}
      <div className='absolute top-0 left-0 right-0 bottom-0 z-[2]' />
      <div className='p-5 text-[#4b006f] z-[2] mt-[-10rem]'>
        <p className='py-5 mt-60 text-xl'>a successful business strategy begins <br /> with discovering the right investors</p>
         <form class="bg-transparent shadow-sm rounded px-8 pt-6 pb-8 mb-4">
    <div className="mb-4">
      <label className="block text-black text-[30px] font-bold mb-2" for="username">
        <h2>Sign Up</h2> 
      </label> <br />
      <input className="shadow bg-white appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="Enter Email"/>
    </div>
    <div className="mb-6">
      
      <input className="shadow appearance-none border bg-white border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Enter Password"/>
      <p className="text-red-500 text-xs italic">Please choose a password.</p>
    </div>
    <button className='px-28 py-2 border text-white bg-blue-600 rounded-xl'>Sign in</button> <br />
    <div className="flex items-center justify-between">
      <div className="" >
        
      </div>
      <a className="inline-block align-baseline text-sm text-black hover:text-blue-800" href="#">
        Forgot Password?
      </a>
    </div> 
    <div className="flex flex-col justify-between">
      <div className="" >
        Already have an account ?
      </div>
      <a className="inline-block align-baseline text-sm text-black hover:text-blue-800" href="#">
        Login Here
      </a>
    </div>
    
  </form>
  <div className='flex items-center mx-20 justify-between bg-transparent'>
    <li className='block px-4 py-1 bg-white'>
        <FcGoogle size={20}/>
    </li>
    <li className='block px-4 py-1 bg-white text-black'>
      <BsApple size={20}/>
      </li>
    <li className='block px-4 py-1 bg-white text-blue-600'>
      <BsFacebook size={20}/>
    </li>
  </div> 
      <div className="flex items-center justify-between pt-3 text-black">
      <div className="block" >
        <RiCheckboxCircleLine size={40}/>
      </div>
      <p>By signing up you agree to receive <br /> updates and special offers</p>
    </div>
        
      </div>
    </div>
  );
};

export default Hero;