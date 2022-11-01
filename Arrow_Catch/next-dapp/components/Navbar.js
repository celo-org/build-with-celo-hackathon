import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import Logo from '../assets/logo.svg'
import { useCelo, Alfajores, CeloProvider } from "@celo/react-celo";
const style = {
  button: 'text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800',
  headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
}

const Navbar = () => {
  const { connect, address, destroy } = useCelo();

  console.log()
  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 fixed w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <Link href="/">
          <a className="flex items-center">
            <Logo className='mr-3 h-6 sm:h-9' />
            <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Arrow Catch</span>
          </a>
        </Link>
          <Link href="/challenge">
            <div className={style.headerItem}> Challenge List</div>
          </Link>
          <Link href="/profile">
            <div className={style.headerItem}> Profile</div>
          </Link>
        <div className="flex md:order-2">
          <span className='text-gray-500 font-semibold mx-4 my-2' > {address} </span>
          <button className={style.button} onClick={() => address ? destroy() : connect()} >
            {address ? "Disconnect" : "Connect"}
          </button>

        </div>
      </div>
    </nav>
  )
}
export default Navbar