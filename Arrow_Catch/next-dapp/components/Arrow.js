import React, { useEffect, useState } from 'react'
import Background from '../assets/pic1.svg'
import Image from 'next/image'
import Arrowimg from '../assets/arrow.png'
import boardimg from '../assets/board.png'
import Board from '../assets/board.svg'
import home from '../assets/home2.png'
import { Alfajores, useCelo } from "@celo/react-celo";
import ArrowCatch from '../artifacts/contracts/ArrowCatch.sol/ArrowCatch.json'
import { Transition } from "@headlessui/react";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";



const contractaddress = '0x28Adc41078A876709832D3B87eAec7138F1017F7'

const style = {
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  wrapper: `py-10 overflow-hidden flex  text-gray-500 bg-white rounded-lg  dark:bg-gray-800 dark:text-gray-400`,
  card1: ` row-span-3 w-full  rounded-lg border shadow-md sm:p-2 `,
  card2: ` w-[30vh] col-span-2 max-w-sm rounded-lg border shadow-md sm:p-2 `,
  background: `py-20 object-cover max-w-lg rounded-t-lg md:h-auto md:w-90 md:rounded-none md:rounded-l-lg`,
  image: `p-1 bg-[#3bdcf8] border-0 border-b-2 border-green-500 dark:border-green-400 `,
  title: `text-sm text-white-600 dark:text-green-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`,
  button: `inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
}
const TailwindToaster = () => {
  return (
    <Toaster >
      {(t) => (
        <Transition
          appear
          show={t.visible}
          className="transform p-4 flex bg-white rounded shadow-lg"
          enter="transition-all duration-150"
          enterFrom="opacity-0 scale-50"
          enterTo="opacity-100 scale-100"
          leave="transition-all duration-180"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-75"

        >
          <ToastIcon toast={t} />
          <div className='flex '>
            <p className="px-2">{resolveValue(t.message)}</p>

          </div>

        </Transition>
      )}
    </Toaster>
  );
};
const Arrow = () => {
  const { address, network, updateNetwork, getConnectedKit } = useCelo();
  const [loading, setLoading] = useState(false)
  const [networkname, setnetwork] = useState(network)
  const [svg, setSVG] = useState()

  useEffect(() => {
    if (updateNetwork) {
      setnetwork(network.name)
      console.log(network.chainId)
    }
  })

  async function RandomMint() {
    setLoading(true)
    try {
      const kit = await getConnectedKit();
      let stabletoken = await kit.contracts.getStableToken()
      const nftContract = new kit.connection.web3.eth.Contract(ArrowCatch.abi, contractaddress)
      let tx = await nftContract.methods.createNFT().send({ from: address, feeCurrency: stabletoken.address, value: 25000000000000000 })
      console.log(tx.events.CreateNFT.returnValues.tokenid)
      loadNFT(tx.events.CreateNFT.returnValues.tokenid)
      toast.success("Very Luck you mint arrow hit a nice position on the Board!")
    } catch (e) {
      toast.success("Error : " + e.message)
    }
    setLoading(false)
  }
  async function loadNFT(tokenId) {
    try {
      const kit = await getConnectedKit();
      const nftContract = new kit.connection.web3.eth.Contract(ArrowCatch.abi, contractaddress)
      const uri = await nftContract.methods.tokenURI(tokenId).call()
      uri = uri.replace('data:application/json;base64,', '')
      uri = Buffer.from(uri, 'base64')
      uri = JSON.parse(uri);
      const svgmeta = uri.image
      setSVG(svgmeta)
    } catch {
      toast.success("Error : " + e.message)
    }
  }
  return (
    <div className={style.wrapper}>
      {address ? (loading ? (
        <div role="status" className="animate-pulse px-2 py-2 h-20 w-20">
          <svg className="animate-spin bg-black h-53 w-53 mr-3 ..." viewBox="0 0 25 25"></svg>
        </div>
      ) : (
        <div>
          <div className={style.wrapper}>
            <Image src={home} height='160' width='220' ></Image>
            <div className="flex flex-col p-4 leading-normal">
              <p className="mb-3 text-center font-normal text-gray-700 dark:text-gray-400">Mint BDNFT <br /> The contract will generate a random position on board. <br />
                Good luck !</p>
              <div className="mb-3 flex relative justify-center flex-wrap items-center ">
                <button className={style.button} onClick={() => RandomMint()} >Random Hit</button>
                <TailwindToaster />
              </div>{svg ? (
                <Image alt='SVG' src={svg} className={style.image} width={'637px'} height={'637px'} />
              ) : (
                <Board className={style.image} />
              )}


            </div>
          </div>
        </div>)

      ) : (
        <div className={style.walletConnectWrapper}>
          <div className='mx-auto justify justify-center '>
            <p className='mx-10 px-10 py-10 text-xl'>Connect your wallet to use this App</p>

          </div>
        </div>

      )}
    </div>
  )
}
export default Arrow