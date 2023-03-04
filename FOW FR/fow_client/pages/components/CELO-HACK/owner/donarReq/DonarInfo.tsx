/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import TranslateIcon from '@mui/icons-material/Translate';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import MinorCrashIcon from '@mui/icons-material/MinorCrash';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { ethers } from 'ethers';
import CELO from '../../../../../utils/CELO_HACK.json';
import DescriptionIcon from '@mui/icons-material/Description';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import NearMeIcon from '@mui/icons-material/NearMe';
import Timer10SelectIcon from '@mui/icons-material/Timer10Select';
import { uploadDonateJSONtoIPFS, uploadFileToIPFS } from '../../../../api/pinata';
import { GetStaticProps } from 'next';


export const getStaticProps: GetStaticProps = async(contex) => {

  return {
    revalidate: 5,
    props: {
      value: {
        donationId: 0,
        NFTreceived: false,
        donationClosed: false,
        donationReceived: false,
        donationPickup: false
      },
      data: {
        language: '',
        name: '',
        location: '',
        phoneNo: '',
        time: '',
        date: '',
        items: '',
        quentity: 0,
        img: ''
      }
    }
  }

}


function DonationInfo(props: any) {

  const deployAddress = "0xb44D65bfD8971043cf6B04c0dCe3C7ec246ca4Eb"

  

  const [click1, setClick1] = useState(false)
  const [click2, setClick2] = useState(false)
  const [click3, setClick3] = useState(false)
  const [message1, updateMessage1] = useState('')
  const [message2, updateMessage2] = useState('')
  const [message3, updateMessage3] = useState('')
  const [showFile, setShowFile] = useState(false)
  const [imgUrl, setImageUrl] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [message, setMessage] = useState('')

  const onChangeFile = async (e: any) => {

    let file = e.target.files[0]

    try {

      const response = await uploadFileToIPFS(file)
      if(response.success === true) {
        setImageUrl(response.pinataURL)
        console.log("img: ", response.pinataURL)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const sendNFT = async (e: any) => {

    e.preventDefault()
    setDisabled(true)

    try {
      if(typeof window !== 'undefined') {

        const metadataURL = imgUrl
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        setMessage("Please wait......")
        const contract = new ethers.Contract(deployAddress, CELO.abi, signer)
  
        let transaction = await contract.createNFT(props.value.donationId, metadataURL)
        await transaction.wait()
  
        alert("Successfully send the NFT🤩")
        setDisabled(false)
        setMessage('')
        window.location.reload()
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  const pickUp = async () => {
    setClick1(true)
    updateMessage1('processing!!!')
    try {
      if(typeof window !== 'undefined') {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(deployAddress, CELO.abi, signer)
        const tx = await contract.getDonationPickup(props.value.donationId)
        await tx.wait()
        updateMessage1('')
        setClick1(false)
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
    }
  }

  const received = async () => {
    updateMessage2('processing!!!')
    setClick2(true)
    try {
      if(typeof window !== 'undefined') {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(deployAddress, CELO.abi, signer)
        const tx = await contract.getDonationReceived(props.value.donationId)
        await tx.wait()
        updateMessage2('')
        setClick2(false)
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
      alert("first confirm the pick up")
    }
  }

  const close = async () => {
    updateMessage3('processing!!!')
    setClick3(true)
    try {
      if(typeof window !== 'undefined') {

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(deployAddress, CELO.abi, signer)
        const tx = await contract.getDonationClosed(props.value.donationId)
        await tx.wait()
        updateMessage3('')
        setClick3(false)
        window.location.reload()
      }
    } catch (error) {
      console.log(error)
      alert("first confirm the received")
    }
  }

  const show = () => {
    setShowFile(prev => !prev)
    console.log(props.data.img)
  }


  const styles = {
    box: `w-full h-full flex flex-col justify-around items-start ease-in duration-500`,
    bg: `border-2 w-14 h-14 p-2 rounded-xl border-sky-600`,
    subBox: `border-2 border-sky-600 rounded-xl bg-slate-300/[.9] shadow-2xl border-white-900/75 w-full flex mt-2 mb-2 p-1`,
    dark: `font-bold text-sm`,
    light: `font-bold text-xs text-gray-400`,
    textBox: `flex flex-col justify-around ml-3 h-full`,
    text: `text-sm font-bold `,
  }

  return (
    <div className={styles.box}>

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <PersonIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Name:</span>
          <span className='font-bold'>{props.data.name}</span>
        </div>
      </div>

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <TranslateIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Language:</span>
          <span className="font-bold">
            {props.data.language}
          </span>
        </div>
      </div>

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <PhoneIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Phone No:</span>
          <div className="font-bold">
            {props.data.phoneNo}
          </div>
        </div>
      </div>

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <GroupsIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Food quentity(persion):</span>
          <span className='font-bold'>{props.data.quentity}</span>
        </div>
      </div>

      <div className={styles.subBox}>
        <div className={styles.bg}>
          <DescriptionIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Items:</span>
          <div className="font-bold">
            {props.data.items}
          </div>
        </div>
      </div>

      <div className={styles.subBox}>
        <div className={styles.bg}>
          <AttachFileIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Show The Attach File:</span>
          <div className="flex flex-col">
            <Button variant='contained' size='small' onClick={show} className='bg-sky-700'>
              <span className='text-sm capitalize'>{!showFile ? "show" : "hide"}</span>
            </Button>
          </div>
        </div>
      </div>
      {
        showFile
          ?
        <div className="w-full h-full rounded-md mt-3 border-2 border-sky-600">
          <img src={`${props.data.img}`} className="w-full h-full rounded-xl" alt="/" />
        </div>
          :
        <div className=""></div>
      }

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <LocationOnIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Location:</span>
          <div className="font-bold">
            {props.data.location}
          </div>
        </div>
      </div>




      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <NearMeIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Location of Stay:</span>
          <div className="font-bold">
            {props.data.locationOfStay}
          </div>
        </div>
      </div>


      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <Timer10SelectIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Period of Stay:</span>
          <div className="font-bold">
            {props.data.periodOfStay}
          </div>
        </div>
      </div>





      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <AccessTimeFilledIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Time:</span>
          <span className='font-bold'>{props.data.time}</span>
        </div>
      </div>

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <DateRangeIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Date:</span>
          <span className='font-bold'>{props.data.date}</span>
        </div>
      </div>

      <div className={styles.subBox}>
        <div className={styles.bg}>
          <MinorCrashIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Donation pick up:</span>
          <div className="flex flex-col">
            {
              props.value.donationPickup
              ?
              <CheckCircleIcon fontSize='large' color='success' />
              :
              <Button variant='contained' size='small' onClick={pickUp} className="bg-sky-700">
                <span className='text-sm capitalize'>Donation pick up</span>
              </Button>
            }
            <span className='font-bold text-sm text-grey-300'>{click1 && message1}</span>
          </div>
        </div>
      </div>

      <div className={styles.subBox}>
        <div className={styles.bg}>
          <SendIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Send NFT</span>
          <div className="flex flex-col">
            {
              props.value.NFTreceived
              ?
              <CheckCircleIcon fontSize='large' color='success' />
              :
              <div className="flex flex-col">
                <div className="flex">
                  <span className={styles.text}>Photos:{imgUrl && "Uploded!!!"}</span>
                  <IconButton color="primary" aria-label="upload picture" component="label">
                    <input hidden accept="image/*" type="file" onChange={onChangeFile} />
                    <AddAPhotoIcon fontSize='large' />
                  </IconButton>
                </div>

                <Button variant='contained' size='small' onClick={sendNFT} disabled={disabled} className="bg-sky-700">
                  <span className='text-sm capitalize'>Send NFT</span>
                </Button>
                <span>{message}</span>

              </div>
            }
            <span className='font-bold text-sm text-grey-300'>{click1 && message1}</span>
          </div>
        </div>
      </div>

      <div className={styles.subBox}>
        <div className={styles.bg}>
          <HowToRegIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Donation received:</span>
          <div className="flex flex-col">
            {
              props.value.donationReceived
              ?
              <CheckCircleIcon fontSize='large' color='success' />
              :
              <Button variant='contained'  size='small' onClick={received} className="bg-sky-700">
                <span className='text-sm capitalize'>received</span>
              </Button>
            }
            <span className='font-bold text-sm text-grey-300'>{click2 && message2}</span>
          </div>
        </div>
      </div>

      <div className={styles.subBox}>
        <div className={styles.bg}>
          <SentimentSatisfiedAltIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Donation closed:</span>
          <div className="flex flex-col">
            {
              props.value.donationClosed
              ?
              <CheckCircleIcon fontSize='large' color='success' />
              :
              <Button variant='contained'  size='small' onClick={close} className="bg-sky-700">
                <span className='text-sm capitalize'>close</span>
              </Button>
            }
            <span className='font-bold text-sm text-grey-300'>{click3 && message3}</span>
          </div>
        </div>
      </div>

    </div>
  )
}


export default DonationInfo