/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Link from 'next/link';
import { ethers } from 'ethers';
import CELO from '../../../utils/CELO_HACK.json';

function FirstPage() {

  const deployAddress = "0xb44D65bfD8971043cf6B04c0dCe3C7ec246ca4Eb"

  const [donate, setDonate] = useState(false)
  const [resque, setResque] = useState(false)
  const [click, setClick] = useState(false)
  const [OwnerAddr, setOwnerAddr] = useState('')
  const [currentAddr, setCurrentAddr] = useState('')

  const donateClick = () => {
    setDonate(true)
    setResque(false)
  }

  const resqueClick = () => {
    setResque(true)
    setDonate(false)
  }


  const check = async () => {
    try {
      if(typeof window !== 'undefined') {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(deployAddress, CELO.abi, signer)
  
        const owner = await contract.owner()
        const current = await signer.getAddress()
  
        setOwnerAddr(owner)
        setCurrentAddr(current)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    window.ethereum.on('accountsChanged', () => {
      window.location.replace('/')
    })
    check()
  }, [])

  const connectWallet = async () => {
    try {
      if(typeof window !== 'undefined') {

        const chainid = await window.ethereum.request({ method: 'eth_chainId' })
  
        if(chainid !== '0xfa2') {
  
          await window.ethereum.request({   // This gives alert Incorrect network!, switch into Alfajores
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: '0xfa2' }],
          })
        }
  
        window.ethereum.request({ method: 'eth_requestAccounts' });
        
        setClick(true)
      }


    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    page: `w-screen h-screen flex flex-col justify-between items-center max-w-screen-sm bg-[url('/images2/bg4.png')]`,
    top: `w-full h-2/6 flex justify-center items-center`,
    mid: `w-full h-2/6 flex flex-col justify-between items-center`,
    bottom: `w-full h-1/4 flex flex-col justify-center items-center`,
    logoBox: `w-48 h-42 mt-auto`,
    btn: `w-20 h-20 rounded-full bg-slate-300/[.9] shadow-2xl border-white-900/75`,
    img: `w-28 h-28`,
    bigbtn: `w-full flex justify-center items-center`,
  }

  return (
    <div className="flex justify-center items-center">
      <div className={styles.page}>
        <div className={styles.top}>
          <div className={styles.logoBox}>
            {/* <img src="/images2/fow.png" alt="/" className='w-full h-full mt-auto' /> */}
            <img src="/images2/fow.png" alt="/" className='w-full h-full mt-auto' />
          </div>
        </div>
        <div className={styles.mid}>
          <div className="flex flex-col justify-start items-center">
            <span className='font-extrabold text-2xl'>Want To Share Food?</span>
            <span className='font-bold text-sm text-gray-600'>choose one</span>
          </div>

          {

            OwnerAddr !== currentAddr 

            ?

            <div className="w-7/12 h-3/6 flex justify-around items-start">

              <div className="flex flex-col justify-center items-center">
                <button className={styles.btn} onClick={donateClick}>
                  <img src="/images2/Fundraising.png" alt="/" className='w-full h-full rounded-full' />
                </button>
                <span className='text-xs text-gray-600 font-bold'>Donate</span>
              </div>

              <div className="flex flex-col justify-center items-center">
                <button className={styles.btn} onClick={resqueClick}>
                  <img src="/images2/delivery.png" alt="/" className='w-full h-full rounded-full' />
                </button>
                <span className='text-xs text-gray-600 font-bold'>Need Rescue</span>
              </div>

            </div>

            :

            <div className="w-7/12 h-3/6 flex justify-around items-start">

              <div className="flex flex-col justify-center items-center">
                <button className="w-20 h-20 rounded-full">
                  <img src="/images2/owner.png" alt="/" className='w-full h-full rounded-full' />
                </button>
                <span className='text-xs text-gray-600 font-bold'>Owner</span>

                {
                  click 

                  &&

                  <Link href="/components/CELO-HACK/ChangeOwner">
                    <Button variant='contained' className='w-full bg-red-600' color="error">
                      <span className='capitalize'>Change Ownership</span>
                    </Button>
                  </Link>
                }
              </div>

            </div>

          }

        </div>
        <div className={styles.bottom}>
          <div className={styles.img}>
            <img src="/images2/confuse.png" className='w-full h-full' alt="/" />
          </div>


          {
            !click 

            ?

            <Button variant='contained' className='w-9/12 bg-sky-700'>
              <span className='capitalize' onClick={connectWallet}>Connect Wallet</span>
            </Button> 

            :

            OwnerAddr === currentAddr

            ?

            <div className={styles.bigbtn}>
              {
                <Link href='/components/CELO-HACK/owner/OwnerOption'>
                  <Button variant='contained' className='w-full bg-sky-700'>
                    <span className='capitalize' onClick={connectWallet}>Owner Dashboard</span>
                  </Button> 
                </Link>
              }
            </div>

            :

              donate 
              
              ? 

              <Link href='/components/CELO-HACK/donate/DonateDetails'>
                <Button variant='contained' className='w-full bg-sky-700'>
                  <span className='capitalize' onClick={connectWallet}>Donate some food</span>
                </Button> 
              </Link>
              
              : 

              <Link href='/components/CELO-HACK/rescue/RescueDetail'>
                <Button variant='contained' className='w-full bg-sky-700'>
                  <span className='capitalize' onClick={connectWallet}>Rescue?</span>
                </Button>
              </Link>

          }

          <div className={styles.bigbtn}>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FirstPage



//afCFgG2xkaAgIap6X2VGCWE5a6ws0nt7