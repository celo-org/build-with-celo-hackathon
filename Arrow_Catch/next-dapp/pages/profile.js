import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Image from 'next/image';
import { useCelo } from "@celo/react-celo";
import ArrowCatch from '../artifacts/contracts/ArrowCatch.sol/ArrowCatch.json'
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
  input: `py-4 px-4 text-sm font-medium text-gray-900  border-t border-b border-gray-900 hover:bg-gray-900  focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700`,
  background: `py-20 object-cover h-96 rounded-t-lg md:h-auto md:w-90 md:rounded-none md:rounded-l-lg`,
  button: `inline-flex items-center py-4 px-4 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`
}

const profile = () => {
  const { address, getConnectedKit } = useCelo();
  const [Myitems, setMyItems] = useState([])
  const [amount, setAmount] = useState(0)
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
  async function fetchMarket() {
    try {
      const kit = await getConnectedKit();
      const nftContract = new kit.connection.web3.eth.Contract(ArrowCatch.abi, contractaddress)
      const maketItem = await nftContract.methods.fetchMyItem().call()
      console.log(maketItem)
      const items = await Promise.all(
        maketItem.map(async (i) => {
          console.log(i)
          const uri = await nftContract.methods.tokenURI(i.tokenId).call()
          uri = uri.replace('data:application/json;base64,', '')
          uri = Buffer.from(uri, 'base64')
          uri = JSON.parse(uri);
          console.log(uri)
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
      setMyItems(items)
    } catch {
      toast.success("Error")
    }
  }
  async function closeContest(tokenId) {
    try {
      const kit = await getConnectedKit();
      const gasPriceMinimumContract = await kit.contracts.connection.gasPrice();
      const nftContract = new kit.connection.web3.eth.Contract(ArrowCatch.abi, contractaddress)
      let tx = await nftContract.methods.closeContest(tokenId).send({ from: address, gasPrice: gasPriceMinimumContract })
      console.log(tx)
      toast.success("You Close this contest :" + tx.events.CloseContest.returnValues.prize / 10 ** 18 + " Celo was sent to your account")
      fetchMarket()
    } catch (e) {
      console.log(e.message)
      toast.success("Error : ", e.message)
    }
  }

  async function openContest(tokenId) {
    setLoading(true)
    try {
      const kit = await getConnectedKit();
      const Amount = kit.connection.web3.utils.toWei(amount, 'ether')
      console.log(Amount);
      const nftContract = new kit.connection.web3.eth.Contract(ArrowCatch.abi, contractaddress)
      let tx = await nftContract.methods.openContest(tokenId, Amount).send({ from: address, value: Amount })
      console.log(tx)
      toast.success("Great you list this NFT for challenge, the winner will get :" + Amount / 10 ** 18 + " Celo")
      fetchMarket()
    } catch {
      toast.success("Error")
    }
    setLoading(false)
    fetchMarket()
  }
  const changeAmount = ({ target }) => {
    setAmount(target.value)
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
              {Myitems.map((item, id) => (
                <div className="relative p-3" key={id}>
                  <div className={style.card}>
                    <label className={style.title} >NFT Id: {item.itemId}</label>
                    <ul className="space-y-1 max-w-md list-disc list-inside text-gray-500 dark:text-gray-400">
                      <li>last Prize: {item.prize / 10 ** 18} Celo </li>
                      <li>Owner: {item.owner.slice(0, 10)} ...</li>
                      <li>Points: {item.points} </li>
                    </ul>
                  </div>
                  <div className={style.image} >
                    <Image alt='SVG' src={item.svg} width={'400px'} height={'400px'} />
                    {item.state ? (
                      <div className="inline-flex rounded-md shadow-sm">
                        <label className="py-4 px-4 text-sm font-medium text-gray-900  border-t border-b border-gray-900  focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white" >
                          NFT {item.itemId} Have a prize wait for new challenge</label>
                        <button className={style.button} onClick={() => closeContest(item.itemId)} > Close Challenge</button>
                      </div>
                    ) : (

                      <div className="rounded-md shadow-sm" >
                        <button className={style.button} onClick={() => openContest(item.itemId)} > set prize</button>
                        <input type="number" placeholder="Amount" onChange={changeAmount} className={style.input} ></input>
                        {loading ? (
                          <div className="inline-flex rounded-md shadow-sm">
                            <label className="py-4 px-4 text-sm font-medium text-gray-900  border-t border-b border-gray-900  focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white" >
                              NFT {item.itemId} Have a prize wait for new challenge</label>
                          </div>) : (
                          <></>
                        )}
                        <TailwindToaster />
                      </div>
                    )
                    }
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
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
export default profile
