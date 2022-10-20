import { FaMagic } from 'react-icons/fa';
import { Heading, Input, Button } from '@chakra-ui/react';
import { useSession, signIn, signOut } from "next-auth/react"
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import {
    connectorsForWallets,
    RainbowKitProvider,
    ConnectButton
  } from "@rainbow-me/rainbowkit";

import { 
    metaMaskWallet, 
    omniWallet, 
    walletConnectWallet 
  } from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";
  
// Import known recommended wallets
import { Valora, CeloWallet, CeloDance } from "@celo/rainbowkit-celo/wallets";
  
// Import CELO chain information
import { Alfajores, Celo } from "@celo/rainbowkit-celo/chains";

import styles from '../../styles/home.module.scss';
import '@rainbow-me/rainbowkit/styles.css';

const { chains, provider } = configureChains(
    [Alfajores, Celo],
    [jsonRpcProvider({ rpc: (chain) => ({ http: chain.rpcUrls.default }) })]
  );

const connectors = connectorsForWallets([
  {
    groupName: "Recommended with CELO",
    wallets: [
      Valora({ chains }),
      CeloWallet({ chains }),
      CeloDance({ chains }),
      metaMaskWallet({ chains }),
      omniWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export default function walletConnect() {
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

  return(
    <>
    <main className={styles.container}>
        <Head>
        <title>Welcome to Sacuda</title>
        </Head>
        <Heading as={'h1'}>
        Sacuda v1 
        </Heading>
    <Head>
        <title>Bienvenidos a Sacuda</title>
    </Head>
    <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} className={styles.container}>
                <ConnectButton />
                <Button onClick={signOut}>Logout</Button>
        </RainbowKitProvider>
    </WagmiConfig>
        </main>
    </>

  )
}