import { FaMagic } from 'react-icons/fa';
import { Text, Heading, Button } from '@chakra-ui/react';
import { useSession, signIn } from "next-auth/react"
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ConnectButton} from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi'

import styles from '../../styles/home.module.scss';
import '@rainbow-me/rainbowkit/styles.css';


export default function walletConnect() {
  const router = useRouter();

  const { isConnected } = useAccount()

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
     signIn(); //What to show to unathenticated users
    }
  })

  if (status === "loading") {
    return "Loading..."
  }

  function mainRedirect() {
    router.push('/main') }


    if (isConnected)
    mainRedirect();

  return(
    <>
    <main className={styles.container}>
        <Head>
        <title>Sacuda | Connect your wallet</title>
        </Head>
        <Heading as={'h0'}>
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