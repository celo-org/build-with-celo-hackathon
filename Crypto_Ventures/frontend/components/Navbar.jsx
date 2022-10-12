import React from 'react'
import Link from 'next/link';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';


function Navbar() {
  return (
    <div className='fixed left-0 top-0 w-full z-10 ease-in duration-300'>
      <div className='max-w-[1240px] m-auto flex justify-between items-center p-4 text-[#4b006f]'>
        <Link href='/'>
          <h1 className='font-bold text-4xl'>Crypto ventures</h1>    
        </Link>
        <ul className='hidden sm:flex'>
          <li className='p-4'>
            <Link href='/'>Home</Link>
          </li>
          <li className='p-4'>
            <Link href='/startups'>Startups</Link>
          </li>
          <li className='p-4'>
            <Link href='/funding'>Funding</Link>
          </li>
        </ul>

        
        <div className='block sm:hidden z-10'>
          <AiOutlineMenu size={20} />
          </div>
        <div className='
              sm:hidden absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300'>
           <ul>
          <li>
            <Link href='/'>Home</Link>
          </li>
          <li>
            <Link href='/startups'>Startups</Link>
          </li>
          <li>
            <Link href='/funding'>Funding</Link>
          </li>
        </ul>
        </div>
        
      </div>
    </div>
  )
}

export default Navbar
