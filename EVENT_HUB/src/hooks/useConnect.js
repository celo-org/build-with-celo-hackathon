import { useState, useEffect } from 'react'
import { ethers } from 'ethers'

export default function () {

  const [address, setAddress] = useState()

  function connect(){
    //client side code
    if(!window.ethereum) return

    const provider = new ethers.providers.Web3Provider(window.ethereum)
    window.ethereum.enable().then(()=>{
      const signer = provider.getSigner()
      signer.getAddress().then((result)=>{
        setAddress(result)
      })
    })
    return address
  }

  useEffect(() => {
    connect()
  })

  return [address]

}