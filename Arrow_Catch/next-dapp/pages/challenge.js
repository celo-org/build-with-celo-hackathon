import React, { useState, useEffect } from 'react'
import Image from 'next/image';
import { useCelo } from "@celo/react-celo";
import ArrowCatch from '../artifacts/contracts/ArrowCatch.sol/ArrowCatch.json'
import Navbar from '../components/Navbar'
import { Transition } from "@headlessui/react";
import { Toaster, ToastIcon, toast, resolveValue } from "react-hot-toast";

const contractaddress = '0x28Adc41078A876709832D3B87eAec7138F1017F7'


const style = {
  walletConnectWrapper: `flex flex-col justify-center items-center h-screen w-screen bg-[#3b3d42] `,
  wrapper: `overflow-hidden flex w-full flex-1 flex-col items-center justify-center px-12 py-12 mx-auto bg-gradient-to-r from-[#02122a] via-[#07344f] to-[#02122a]`,
  grid: `grid py-5 px-4 mx-auto max-w-screen-xl text-gray-900 dark:text-white sm:grid-cols-2 md:grid-cols-3 md:px-6`,
  card: ` block rounded-t-lg px-2.5 pb-2.5 pt-5 w-full text-sm text-gray-200 bg-gray-50 dark:bg-gray-700 border-0 border-b-2 border-green-600 dark:border-green-500 appearance-none dark:text-white dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer`,
  image: `p-1 bg-[#3bdcf8] border-0 border-b-2 border-green-500 dark:border-green-400 `,
  title: `text-sm text-green-600 dark:text-green-500 duration-300 transform -translate-y-4 scale-75 top-4 z-10 origin-[0] left-2.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4`,
  text: `mt-2 text-xs text-green-600 dark:text-green-400`,
  background: `py-20 object-cover h-96 rounded-t-lg md:h-auto md:w-90 md:rounded-none md:rounded-l-lg`,
  button: `inline-flex items-center py-2 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
}
export const challenge = () => {
  const { address, getConnectedKit } = useCelo();
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)

  const TailwindToaster = () => {
    return (
      <Toaster>
        {(t) => (
          <Transition
            appear
            show={t.visible}
            className="transform p-4 flex bg-black rounded shadow-lg"
            enter="transition-all duration-150"
            enterFrom="opacity-0 scale-50"
            enterTo="opacity-100 scale-100"
            leave="transition-all duration-180"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-75"
          >
            <ToastIcon toast={t} />
            <p className="px-2">{resolveValue(t.message)}</p>
          </Transition>
        )}
      </Toaster>
    );
  };
  useEffect(() => {
    if (!address) return
    fetchMarket()

  }, [address])
  async function challenge(tokenId) {
    setLoading(true)
    try {
      const kit = await getConnectedKit();
      const nftContract = new kit.connection.web3.eth.Contract(ArrowCatch.abi, contractaddress)
      let tx = await nftContract.methods.challenge(tokenId).send({ from: address, value: 50000000000000000 })
      console.log(tx, tx.events.Challenge.returnValues)
      toast.success("You " + tx.events.Challenge.returnValues.state + " " + tx.events.Challenge.returnValues.reward / 10 ** 18 + " Celo")
    } catch {
      toast.success("Error")
    }
    fetchMarket()
    setLoading(false)
  }
  async function fetchMarket() {
    try {
      const kit = await getConnectedKit();
      const nftContract = new kit.connection.web3.eth.Contract(ArrowCatch.abi, contractaddress)
      const maketItem = await nftContract.methods.fetchMarketItems().call()
      const items = await Promise.all(
        maketItem.map(async (i) => {
          console.log(i)
          const uri = await nftContract.methods.tokenURI(i.tokenId).call()
          uri = uri.replace('data:application/json;base64,', '')
          uri = Buffer.from(uri, 'base64')
          uri = JSON.parse(uri);
          const svgmeta = uri.image
          let prize = i.prize.toString()
          let item = {
            prize,
            itemId: i.tokenId,
            owner: i.tokenowner,
            radius: i.radius,
            angle: i.angle,
            points: i.points,
            prize: prize,
            state: i.state,
            svg: svgmeta
          }
          return item;
        })
      )
      setItems(items)
    } catch {
      toast.success("Error")
    }

  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center " >
      <Navbar />
      <div className={style.wrapper} >
        {address ? (
          loading ? (
            <div role="status" className="animate-pulse px-2 py-2 h-20 w-20">
              <svg className="animate-spin bg-black h-53 w-53 mr-3 ..." viewBox="0 0 25 25"></svg>

            </div>
          ) : (
            <div className={style.grid}>
              {items.map((item, id) => (
                <div className="relative p-3" key={id}>
                  <div className={style.card}>
                    <label className={style.title} >Challenge NFT Id: {item.itemId}</label>
                    <ul className="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
                      <li>Prize: {item.prize / 10 ** 18} Celo </li>
                      <li>Owner: {item.owner.slice(0, 10)} ...</li>
                      <li>Points: {item.points} </li>
                    </ul>
                  </div>
                  <div className={style.image} >
                    <Image alt='SVG' src={item.svg} width={'400px'} height={'400px'} />
                    <div className='mx-auto p-4 '>
                      <button onClick={() => challenge(item.itemId)} className={style.button} > Challenge</button>
                    </div>
                    <TailwindToaster />
                  </div>
                </div>
              ))}
            </div>)) : (
          <div className={style.walletConnectWrapper}>
            <div className='mx-auto justify justify-center '>
              <p className='mx-10 px-10 py-10 text-xl'>Connect your wallet to use this App</p>
            </div>
          </div>

        )}
      </div>
    </div>
  )
}
export default challenge