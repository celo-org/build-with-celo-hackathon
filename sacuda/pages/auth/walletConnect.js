import { FaMagic } from 'react-icons/fa';
import { Text, Heading, Button } from '@chakra-ui/react';
import { useSession, signIn, getSession } from "next-auth/react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import { ConnectButton} from "@rainbow-me/rainbowkit";
import { useAccount } from 'wagmi';
import styles from '../../styles/home.module.scss';
import '@rainbow-me/rainbowkit/styles.css';

import connectMongo from '../../utils/connectMongo';
import Sacuda from '../../models/sacudaModel';

const walletConnect = () => {
  const router = useRouter();
  const { isConnected, address } = useAccount()
  const { data: session, status } = useSession({
    required: true,
    onUnauthenticated() {
     signIn(); //What to show to unathenticated users
    }
  })


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
    console.log(data);
  };

  const mainRedirect = () => {
    router.push('/selection') }

  if (status === "loading") {
    return "Loading..."
  }

    if (isConnected) {    
    if (Sacuda.email===session.user.email) {
      console.log(session.user.email)
      console.log(Sacuda.email)
      mainRedirect();
    }
    else
    //if (Sacuda.email===null) {
      console.log(session.user.email)
      console.log(Sacuda.email)
      writeProfileBasics()  
    return(<><Heading>Hola</Heading></>)
      
      console.log('llegamos al write');
      //        readProfileBasics();
      //        console.log(sacudas.props)
      //        sacudas.props === null ? writeProfileBasics : mainRedirect();
    //}
  }
    else

  return(
    <>
    <main className={styles.container}>
        <Head>
        <title>Sacuda | Connect your wallet</title>
        </Head>
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

export default walletConnect;

export const getServerSideProps = async (ctx) => {

    const session = await getSession(ctx)
    try {        
        console.log('CONNECTING TO MONGO');
        console.log(process.env.NODE_ENV)
        await connectMongo();
        console.log('CONNECTED TO MONGO');
    
        console.log('FETCHING DOCUMENTS');
        const sacudas = await Sacuda.find({ email: session.user.email});
        console.log('FETCHED DOCUMENTS');
        console.log(sacudas)
        console.log(Sacuda.email)
        return {
          props: {
            sacudas: JSON.parse(JSON.stringify(sacudas)),
          },
        };
        
      } catch (error) {
        console.log(error);
        return {
          notFound: true,
        };
      }
  }