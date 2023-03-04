import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import FirstPage from './components/CELO-HACK/FirstPage';

const Home: NextPage = () => {
  return (
    <div className="app">
      <FirstPage />
    </div>
  )
}

export default Home