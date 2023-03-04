import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import CELO from '../../../../utils/CELO_HACK.json';
import { Button } from '@mui/material';
import ItemCard from './ItemCard';

function OwnerDashboard() {

  const deployAddress = "0xb44D65bfD8971043cf6B04c0dCe3C7ec246ca4Eb"

  const sample = [
    {
      "donationInfo": "https://www.domusweb.it/content/dam/domusweb/en/news/2021/05/13/how-to-mint-your-own-nft-in-5-simple-steps/nft.jpg.foto.rbig.jpg",
    }
  ]

  const[data, setData] = useState(sample)

  const handleClick = async () => {
    try {
      if(typeof window !== 'undefined') {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(deployAddress, CELO.abi, signer)
  
        // console.log(await contract.getAllRescueRequest())
        // console.log(await contract.getAllDonationRequest())
  
        let allDonationReq = await contract.getAllDonationRequest()
  
        const items: any = await Promise.all(allDonationReq.map(async (i: any) => {
          let item = {
            donationInfo: i.donationInfo
          }
          return item;
        }))
  
        setData(items)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleClick()
  }, [])

  return (
    <div>
      {/* <Button variant='contained' onClick={handleClick}>rescue details</Button> */}
      {data.map((value, index) => {
          return <ItemCard data={value} key={index} />
      })}
    </div>
  )
}

export default OwnerDashboard