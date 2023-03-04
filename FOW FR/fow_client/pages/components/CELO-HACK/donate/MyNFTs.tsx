import React, { useState, useEffect } from 'react'
import { ethers } from 'ethers';
import CELO from '../../../../utils/CELO_HACK.json';
import NFTCard from './NFTCard';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

function MyNFTs() {

  const deployAddress = "0xb44D65bfD8971043cf6B04c0dCe3C7ec246ca4Eb"

  const sample = [
    {
      "NFTinfo": "https://www.domusweb.it/content/dam/domusweb/en/news/2021/05/13/how-to-mint-your-own-nft-in-5-simple-steps/nft.jpg.foto.rbig.jpg",
    }
  ]

  const [data, setData] = useState(sample)

  const fetch = async () => {
    try {
      if(typeof window !== 'undefined') {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(deployAddress, CELO.abi, signer)
  
        const allNFT = await contract.getAllMyNFT()
        
        const items: any = await Promise.all(allNFT.map(async (i: any) => {
          let item = {
            NFTId: i.NFTId.toString(),
            NFTinfo: i.NFTinfo,
            owner: i.owner,
          }
          return item;
        }))
        setData(items)
  
        console.log(items)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, [])

  const styles = {
    page: `w-screen min-h-screen flex flex-col justify-start mt-5 items-center max-w-screen-sm`,
  }


  return (
    <div className="flex flex-col justify-center items-center bg-inherit">
      <div className="w-full flex justify-between">
        <Link href="/components/CELO-HACK/donate/MyDonations">
          <ArrowBackIcon fontSize='large' color='primary' />
        </Link>

        <Link href="/">
          <HomeIcon fontSize='large' color='primary' />
        </Link>
      </div>
      <div className={styles.page}>
        {data.map((value, index) => {
            return <NFTCard data={value} key={index} />
        })}
      </div>
    </div>
  )
}

export default MyNFTs