import React, { useState } from 'react';
import { Button } from '@mui/material';
import Slider from '@mui/material/Slider';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { uploadDonateJSONtoIPFS, uploadFileToIPFS } from '../../../api/pinata';
import { ethers } from 'ethers';
import CELO from '../../../../utils/CELO_HACK.json';
import Link from 'next/link';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import HomeIcon from '@mui/icons-material/Home';

function DonateDetails() {

  const deployAddress = "0xb44D65bfD8971043cf6B04c0dCe3C7ec246ca4Eb"

  const [donationDesc, setDonationDesc] = useState({
    language: '',
    name: '',
    location: '',
    phoneNo: '',
    time: '',
    date: '',
    locationOfStay: '',
    periodOfStay: '',
    items: '',
    quentity: 0,
    img: ''
  })
  const [imgUrl, setImageUrl] = useState('')
  const [disabled, setDisabled] = useState(false)
  const [message, setMessage] = useState('')



  const onChangeFile = async (e: any) => {

    let file = e.target.files[0]

    try {

      const response = await uploadFileToIPFS(file)
      if(response.success === true) {
        setImageUrl(response.pinataURL)
        setDonationDesc({...donationDesc, img: response.pinataURL})
        console.log("img: ", response.pinataURL)
      }

    } catch (error) {
      console.log(error)
    }
  }

  const uploadDonateJSON: any = async () => {

    const { language, name, location, phoneNo, time, date, locationOfStay, periodOfStay, items, quentity, img } = donationDesc

    if(!language || !name || !location || !phoneNo || !time || !date || !items || !quentity || !img) {
      return;
    }

    const nftJSON = {
      language, name, location, phoneNo, time, date, locationOfStay, periodOfStay, items, quentity, img
    }

    try {
      
      const response = await uploadDonateJSONtoIPFS(nftJSON)

      if(response.success === true) {
        return response.pinataURL
      }

    } catch (error) {
      console.log(error)
    }
  }

  const submit = async (e: any) => {

    setDisabled(true)
    e.preventDefault()

    try {

      if(typeof window !== 'undefined') {
        const metadataURL = await uploadDonateJSON()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        setMessage("Please wait.. sending your request(upto 2 mins)")
        const contract = new ethers.Contract(deployAddress, CELO.abi, signer)
  
        let transaction = await contract.SendDonationRequest(metadataURL)
        await transaction.wait()
        console.log("donationDesc: ", donationDesc)
  
  
        alert("Successfully send the request😀")
        setDisabled(false)
        setMessage('')
        window.location.replace("/components/CELO-HACK/donate/PaymentComplete")
      }
      

    } catch (error) {
      console.log(error)
    }
  }

  const styles = {
    page: `w-screen max-w-screen-sm h-screen flex flex-col justify-start items-center bg-inherit`,
    head: `w-full h-20 flex justify-between items-center`,
    box: `w-11/12 h-16`,
    text: `text-sm font-bold text-black`,
    input: `bg-slate-300/[.9] shadow-2xl border-white-900/75 w-full h-7`,
    inputbg: `w-full h-full bg-inherit pl-2 placeholder:text-sm`,
  }

  return (
    <div className="flex flex-col justify-center items-center bg-inherit">
      <div className="w-full flex justify-between">
        <Link href="/">
          <ArrowBackIcon fontSize='large' color='primary' />
        </Link>

        <Link href="/">
          <HomeIcon fontSize='large' color='primary' />
        </Link>
      </div>
      <div className={styles.page}>
        <div className={styles.head}>
          <span className='text-2xl font-bold text-sky-600'>Donate Details</span>
          <Link href="/components/CELO-HACK/donate/MyDonations">
            <Button variant='contained' className='bg-sky-700'><span className="capitalize text-sm">My Donations</span></Button>
          </Link>
        </div>

        <div className="flex justify-around items-center w-full">

          <div className="flex flex-col justify-center items-center w-full">
            <span className={styles.text}>Your name:</span>
            <div className="bg-slate-300/[.9] shadow-2xl border-white-900/75 w-10/12 h-7">
              <input 
                type="text" 
                placeholder='enter your name' 
                className={styles.inputbg}
                onChange={e => setDonationDesc({...donationDesc, name: e.target.value})}
                value={donationDesc.name}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-full">
            <span className={styles.text}>Choose Language:</span>
            <div className="bg-slate-300/[.9] shadow-2xl border-white-900/75 w-10/12 h-7">
              <select 
                data-placeholder="Choose a Language..." 
                className={styles.inputbg}
                onChange={e => setDonationDesc({...donationDesc, language: e.target.value})}
                value={donationDesc.language}
                >
                <option value="AF">Afrikaans</option>
                <option value="SQ">Albanian</option>
                <option value="AR">Arabic</option>
                <option value="HY">Armenian</option>
                <option value="EU">Basque</option>
                <option value="BN">Bengali</option>
                <option value="BG">Bulgarian</option>
                <option value="CA">Catalan</option>
                <option value="KM">Cambodian</option>
                <option value="ZH">Chinese (Mandarin)</option>
                <option value="HR">Croatian</option>
                <option value="CS">Czech</option>
                <option value="DA">Danish</option>
                <option value="NL">Dutch</option>
                <option value="EN">English</option>
                <option value="ET">Estonian</option>
                <option value="FJ">Fiji</option>
                <option value="FI">Finnish</option>
                <option value="FR">French</option>
                <option value="KA">Georgian</option>
                <option value="DE">German</option>
                <option value="EL">Greek</option>
                <option value="GU">Gujarati</option>
                <option value="HE">Hebrew</option>
                <option value="HI">Hindi</option>
                <option value="HU">Hungarian</option>
                <option value="IS">Icelandic</option>
                <option value="ID">Indonesian</option>
                <option value="GA">Irish</option>
                <option value="IT">Italian</option>
                <option value="JA">Japanese</option>
                <option value="JW">Javanese</option>
                <option value="KO">Korean</option>
                <option value="LA">Latin</option>
                <option value="LV">Latvian</option>
                <option value="LT">Lithuanian</option>
                <option value="MK">Macedonian</option>
                <option value="MS">Malay</option>
                <option value="ML">Malayalam</option>
                <option value="MT">Maltese</option>
                <option value="MI">Maori</option>
                <option value="MR">Marathi</option>
                <option value="MN">Mongolian</option>
                <option value="NE">Nepali</option>
                <option value="NO">Norwegian</option>
                <option value="FA">Persian</option>
                <option value="PL">Polish</option>
                <option value="PT">Portuguese</option>
                <option value="PA">Punjabi</option>
                <option value="QU">Quechua</option>
                <option value="RO">Romanian</option>
                <option value="RU">Russian</option>
                <option value="SM">Samoan</option>
                <option value="SR">Serbian</option>
                <option value="SK">Slovak</option>
                <option value="SL">Slovenian</option>
                <option value="ES">Spanish</option>
                <option value="SW">Swahili</option>
                <option value="SV">Swedish </option>
                <option value="TA">Tamil</option>
                <option value="TT">Tatar</option>
                <option value="TE">Telugu</option>
                <option value="TH">Thai</option>
                <option value="BO">Tibetan</option>
                <option value="TO">Tonga</option>
                <option value="TR">Turkish</option>
                <option value="UK">Ukrainian</option>
                <option value="UR">Urdu</option>
                <option value="UZ">Uzbek</option>
                <option value="VI">Vietnamese</option>
                <option value="CY">Welsh</option>
                <option value="XH">Xhosa</option>
              </select>
            </div>
          </div>

        </div>

        <div className={styles.box}>
          <span className={styles.text}>Pickup Where?</span>
          <div className={styles.input}>
            <input 
              type="text" 
              placeholder='123 Road St, New City' 
              className={styles.inputbg} 
              onChange={e => setDonationDesc({...donationDesc, location: e.target.value})}
              value={donationDesc.location}
            />
          </div>
        </div>

        <div className={styles.box}>
          <span className={styles.text}>Phone No(with country code):</span>
          <div className={styles.input}>
            <input 
              type="tel" 
              placeholder='123-456-7890' 
              className={styles.inputbg} 
              required
              onChange={e => setDonationDesc({...donationDesc, phoneNo: e.target.value})}
              value={donationDesc.phoneNo}
            />
          </div>
        </div>

        <div className="flex justify-around items-center w-full">
          <div className="flex flex-col justify-center items-center w-5/12">
            <span className={styles.text}>Pickup Time:</span>
            <div className={styles.input}>
              <input 
                type="time" 
                placeholder='select' 
                className={styles.inputbg}
                onChange={e => setDonationDesc({...donationDesc, time: e.target.value})}
                value={donationDesc.time}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-5/12">
            <span className={styles.text}>Pickup Day:</span>
            <div className={styles.input}>
              <input 
                type="date" 
                placeholder='enter' 
                className={styles.inputbg}
                onChange={e => setDonationDesc({...donationDesc, date: e.target.value})}
                value={donationDesc.date}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-around items-center w-full">
          <div className="flex flex-col justify-center items-center w-5/12">
            <span className={styles.text}>Location of Stay:</span>
            <div className={styles.input}>
              <input 
                type="text" 
                placeholder='enter the location' 
                className={styles.inputbg}
                onChange={e => setDonationDesc({...donationDesc, locationOfStay: e.target.value})}
                value={donationDesc.locationOfStay}
              />
            </div>
          </div>

          <div className="flex flex-col justify-center items-center w-5/12">
            <span className={styles.text}>Period of Stay:</span>
            <div className={styles.input}>
              <input 
                type="text" 
                placeholder='enter the time period' 
                className={styles.inputbg}
                onChange={e => setDonationDesc({...donationDesc, periodOfStay: e.target.value})}
                value={donationDesc.periodOfStay}
              />
            </div>
          </div>
        </div>
        
        <div className={styles.box}>
          <span className={styles.text}>Food Item:</span>
          <div className={styles.input}>
            <input 
              type="text" 
              placeholder='enter' 
              className={styles.inputbg}
              onChange={e => setDonationDesc({...donationDesc, items: e.target.value})}
              value={donationDesc.items}
            />
          </div>
        </div>

        <div className={styles.box}>
          <span className={styles.text}>Quantity (People): </span>
          <div>
            <Slider
              size="small"
              defaultValue={70}
              aria-label="Small"
              valueLabelDisplay="auto"
              min={1}
              max={1000}
              onChange={(e: any) => setDonationDesc({...donationDesc, quentity: e.target.value})}
              value={donationDesc.quentity}
            />
          </div>
        </div>

        <div className="w-full h-2/6 flex flex-col justify-between items-center bg-inherit">
          <div className="w-full h-4/6 flex flex-col justify-around items-center">
            <span className={styles.text}>Photos:{imgUrl && "Uploded!!!"}</span>
            <IconButton color="primary" aria-label="upload picture" component="label">
              <input hidden accept="image/*" type="file" onChange={onChangeFile} />
              <AddAPhotoIcon fontSize='large' />
            </IconButton>
            <div className='flex'>
            <input type="checkbox" />
              <label htmlFor="text" className='text-xs text-bold text-gray-600 ml-1'>I assure that the details provided are accurate</label>
            </div>
          </div>
          <div className="w-full h-1/5 flex justify-center mb-2">
            <Button variant='contained' disabled={disabled} onClick={submit} className='w-10/12 h-10 bg-sky-700'>Submit</Button>
          </div>
            <span className='text-sm text-black'>{message}</span>
        </div>
      </div>
    </div>

  )
}

export default DonateDetails
