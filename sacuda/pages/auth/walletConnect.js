import { FaMagic } from 'react-icons/fa';
import { Heading, Input, Button } from '@chakra-ui/react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import styles from '../../styles/home.module.scss';

export default function walletConnect() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
     signIn(); //What to show to unathenticated users
    }
  })

  if (status === "loading") {
    return "Cargando..."
  }
  return(
    <>
    <main className={styles.container}>
        <Head>
        <title>Bienvenidos a Sacuda</title>
        </Head>
        <Heading as={'h1'}>
        Sacuda v1 
        </Heading>
    <Head>
        <title>Bienvenidos a Sacuda</title>
    </Head>
        
            <Button>Conectar Wallet Web3</Button>
            <Button onClick={signOut}>Cerrar Sesión</Button>
        </main>
    </>

  )
}