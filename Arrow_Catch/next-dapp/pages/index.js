import Head from 'next/head'

import Navbar from '../components/Navbar'
import Arrow from '../components/Arrow'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className=" flex min-h-screen flex-col items-center justify-center  text-gray-500 bg-white rounded-lg shadow dark:bg-gray-800 dark:text-gray-400">
      <Head>
        <title>Arrow Catch</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar/>
      <Arrow />
      <Footer/>
    </div>
  )
}

export default Home
