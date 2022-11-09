import { FaMagic } from 'react-icons/fa';
import { sacudaContext } from '../../components/sacudaContext';
import React, { useEffect, useState} from 'react';
import { Text, Heading } from '@chakra-ui/react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ConnectButton} from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import styles from '../../styles/home.module.scss';
import '@rainbow-me/rainbowkit/styles.css';

const WalletConnect = () => {
  
  const router = useRouter();
  const { isConnected, address } = useAccount()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
     signIn(); //What to show to unathenticated users
    }
  })

  const {uMail,setUMail} = sacudaContext ()
  const {uData,setUData} = useState({})

  useEffect(() => {
    window.localStorage.setItem('uMail', undefined) 
  });

  const writeProfileBasics = async () => {
    const res = await fetch('/api/handler', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        wallet: `${address}`,
        email: `${session.user.email}`,
      }),
    });
    const data = await res.json();
  };

  const getUserEmail = async () => {
    const res = await fetch('/api/userByEmail/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(session.user.email),
    });
    console.log('mail'+session.user.email)
    const resdata = await res.json();
    if (resdata.data === null) {
    setUMail(null)
    }
    else if (resdata.data.email === session.user.email) {
    setUMail(resdata.data.email)
    } 
    else
    console.log('Error'+resdata+error)
  };  

  const mainRedirect = () => {
    router.push('/selection') }

  if (status === "loading") {
    return (
      <main className={styles.container}>
        <>
        <Head>
        <title>Sacuda | Connect your wallet</title>
        </Head>
        <Heading as={'h1'}>
            Loading...
        </Heading>
        </>
    </main>
    )
  }

    if (isConnected) {
      getUserEmail()
        if (uMail===session.user.email) {
        window.localStorage.setItem('uMail', uMail)  
        mainRedirect();
      }
          else
            if (uMail===null) {
            
            writeProfileBasics()
            }
               else {
                 //signOut()
               }
  }
    else

  return(

          <>
          <Head>
          <title>Sacuda | Connect your wallet</title>
          </Head>
          <main className={styles.container}>
          <Heading as={'h1'}>
              Just one more step!
          </Heading>
          <Text 
              as={'h2'}
              marginTop='1%'
              marginBottom='1%'
          >
              Now you must connect your favourite Celo compatible web3 wallet in order to fully enjoy the Sacuda experience!
          </Text>
              <ConnectButton />
          </main>
          </>

  )
}

export default WalletConnect;