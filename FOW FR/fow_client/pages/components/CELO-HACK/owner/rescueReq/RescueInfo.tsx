import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import GroupsIcon from '@mui/icons-material/Groups';
import TranslateIcon from '@mui/icons-material/Translate';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PhoneIcon from '@mui/icons-material/Phone';
import MoreIcon from '@mui/icons-material/More';
import WbIncandescentIcon from '@mui/icons-material/WbIncandescent';
import MinorCrashIcon from '@mui/icons-material/MinorCrash';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { ethers } from 'ethers';
import CELO from '../../../../../utils/CELO_HACK.json';
import { GetStaticProps } from 'next';



export const getStaticProps: GetStaticProps = async(contex) => {

  return {
    revalidate: 5,
    props: {
      data: {
        language: '',
        name: '',
        numberOfPeople: '',
        lessthen1: '',
        oneTofive: '',
        sixTothirteen: '',
        forAdults: '',
        above60: '',
        reason: '',
        location: '',
        phoneNo: '',
        moreInfo: '',
      },
      value: {
        rescueId: 0,
        rescuePickup: false,
        rescueClosed: false,
        rescueRecieved: false
      }
    }
  }

}

function RescueInfo(props: any) {

  const deployAddress = "0xb44D65bfD8971043cf6B04c0dCe3C7ec246ca4Eb"


  const [click1, setClick1] = useState(false)
  const [click2, setClick2] = useState(false)
  const [click3, setClick3] = useState(false)
  const [message1, updateMessage1] = useState('')
  const [message2, updateMessage2] = useState('')
  const [message3, updateMessage3] = useState('')

  const pickUp = async () => {
    setClick1(true)
    updateMessage1('processing!!!')
    try {
      if(typeof window !== 'undefined') {
        
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(deployAddress, CELO.abi, signer)
        const tx = await contract.getRescuePickup(props.value.rescueId)
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
        const tx = await contract.getRescueRecieved(props.value.rescueId)
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
        const tx = await contract.getRescueClosed(props.value.rescueId)
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


  const styles = {
    box: `w-full h-full flex flex-col justify-around items-start ease-in duration-500`,
    bg: `border-2 w-14 h-14 p-2 rounded-xl border-sky-600`,
    subBox: `border-2 border-sky-600 rounded-xl bg-slate-300/[.9] shadow-2xl border-white-900/75 w-full flex mt-2 mb-2 p-1`,
    dark: `font-bold text-sm`,
    light: `font-bold text-xs text-gray-400`,
    textBox: `flex flex-col justify-around ml-3 h-full`,
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
          <PeopleAltIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Total Number of people:</span>
          <span className='font-bold'>{props.data.numberOfPeople}</span>
        </div>
      </div>

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <GroupsIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Age less then 1 year:</span>
          <span className='font-bold'>{props.data.lessthen1}</span>
        </div>
      </div>

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <GroupsIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Age from 1 to 5 year:</span>
          <span className='font-bold'>{props.data.oneTofive}</span>
        </div>
      </div>

      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <GroupsIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Age from 6 to 13 year:</span>
          <span className='font-bold'>{props.data.sixTothirteen}</span>
        </div>
      </div>
      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <GroupsIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>For Adults:</span>
          <span className='font-bold'>{props.data.forAdults}</span>
        </div>
      </div>
      <div className={styles.subBox}>  
        <div className={styles.bg}>
          <GroupsIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>For above 60 year:</span>
          <span className='font-bold'>{props.data.above60}</span>
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
          <MoreIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>More info:</span>
          <div className="font-bold">
            {props.data.moreInfo}
          </div>
        </div>
      </div>

      <div className={styles.subBox}>
        <div className={styles.bg}>
          <WbIncandescentIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Reason:</span>
          <div className="font-bold">
            {props.data.reason}
          </div>
        </div>
      </div>

      <div className={styles.subBox}>
        <div className={styles.bg}>
          <MinorCrashIcon fontSize='large' color='primary' />
        </div>
        <div className={styles.textBox}>
          <span className={styles.dark}>Rescue pick up:</span>
          <div className="flex flex-col">
            {
              props.value.rescuePickup
              ?
              <CheckCircleIcon fontSize='large' color='success' />
              :
              <Button variant='contained' size='small' onClick={pickUp} className="bg-sky-700">
                <span className='text-sm capitalize'>Rescue pick up</span>
              </Button>
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
          <span className={styles.dark}>Rescue received:</span>
          <div className="flex flex-col">
            {
              props.value.rescueRecieved
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
          <span className={styles.dark}>Rescue closed:</span>
          <div className="flex flex-col">
            {
              props.value.rescueClosed
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

export default RescueInfo