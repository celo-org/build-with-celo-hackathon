import { FaMagic } from 'react-icons/fa';
import { Text, Heading, Input, Button, Link } from '@chakra-ui/react';
import { useSession, signIn } from "next-auth/react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { ConnectButton} from "@rainbow-me/rainbowkit";
import styles from '../styles/home.module.scss';
import '@rainbow-me/rainbowkit/styles.css';

export default function selectionPage() {


    const { status } = useSession({
    required: true,
    onUnauthenticated() {
        signIn(); //What to show to unathenticated users
    }
    })

    const router = useRouter();

    const { isConnected } = useAccount();

    if (status === "loading") {
    return "Loading..."
    }


    if (isConnected) {

        return(
            <>
            <main className={styles.container}>
                <Head>
                <title>Sacuda | A finantial revolution!</title>
                </Head>
                <Heading as={'h1'}>
                    Welcome!
                </Heading>
                <Text 
                    as={'h2'}
                    marginTop='1%'
                    marginBottom='1%'
                >
                    To start your Sacuda journey, we need to know if you are a Woman of Bussiness or a Potentiator
                </Text>
                <Button isLoading={status === 'loading'} onClick={() => router.push('/wobIn')}> 
                    I´m a WOB
                </Button>
                <Button isLoading={status === 'loading'} onClick={() => router.push('/potIn')}> 
                    I´m a potentiator
                </Button>
                </main>
            </>
        )
        }

        return(
            <>
            <main className={styles.container}>
                <Head>
                <title>Sacuda | A finantial revolution!</title>
                </Head>
                <Heading as={'h0'}>
                    Please connect your web3 wallet to continue using Sacuda
                </Heading>
                <Text 
                    as={'h2'}
                    marginTop='1%'
                    marginBottom='1%'
                >
                    Bla bla bla 
                </Text>
                <ConnectButton />
                </main>
            </>
        )

        

    }