import { FaMagic } from 'react-icons/fa';
import { sacudaContext } from '../components/sacudaContext';
import React, { useContext, useState } from 'react';
import { Text, Heading, Input, Button, Linkimport, FormErrorMessage, FormLabel, FormControl, FormHelperText } from '@chakra-ui/react';
import { useForm } from 'react-hook-form'
import { useSession, signIn, signOff } from "next-auth/react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import { ConnectButton} from "@rainbow-me/rainbowkit";
import styles from '../styles/home.module.scss';
import '@rainbow-me/rainbowkit/styles.css';

export default function wobRegistration1() {

    const router = useRouter();
    const { isConnected } = useAccount();
    const { status, data: session } = useSession({
    required: true,
    onUnauthenticated() {
        signIn(); //What to show to unathenticated users
    }
    })

    const {uMail,setUMail} = sacudaContext();
    
    const {uProfile, setUProfile} = sacudaContext();

    const wobDashRedirect = () => {
        router.push('/wobDash') };

    const mainRedirect = () => {
        router.push('/selection') }

    const walletRedirect= () => {
        router.push('/auth/walletConnect') }

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        } = useForm()
    
        function onSubmit(values) {
        return new Promise((resolve) => {
            setTimeout(() => {
            alert(JSON.stringify(values, null, 2))
            resolve()
            }, 3000)
        })
        }

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
    };


    if (isConnected) {
        if(uMail===session.user.email) {
            if (uProfile === undefined) {
                return (
                    <>
                    <main className={styles.form}>
                        <Head>
                        <title>Sacuda | A finantial revolution!</title>
                        </Head>
                        <Heading as={'h1'}>
                            Welcome {session.user.email}!
                        </Heading>
                        <Text 
                            as={'h2'}
                            marginTop='1%'
                            marginBottom='1%'
                        >
                            Let´s setup your WOB profile
                        </Text>
                        <Text>
                            <FormControl >
                                <FormLabel marginBottom='1%'>Name</FormLabel>
                                <Input type='bename' />
                                <FormHelperText> Your name</FormHelperText>
                            </FormControl>               
                        </Text>
                        <Text>
                            <FormControl >
                                <FormLabel marginBottom='1%'>Surname</FormLabel>
                                <Input type='bename' />
                                <FormHelperText> Your surname</FormHelperText>
                            </FormControl>               
                        </Text>
                        <Text>
                            <FormControl >
                                <FormLabel marginBottom='1%'>LinkedIn profile</FormLabel>
                                <Input type='bename' />
                                <FormHelperText> Your personal linkedIn profile</FormHelperText>
                            </FormControl>               
                        </Text>
                        <Text>
                            <FormControl >
                                <FormLabel marginBottom='1%'>Country</FormLabel>
                                <Input type='bename' />
                                <FormHelperText> Your country</FormHelperText>
                            </FormControl>               
                        </Text>
                        <Text>
                            <FormControl >
                                <FormLabel marginBottom='1%'>Bussiness Name</FormLabel>
                                <Input 
                                    type='bname' 
                                    id='bname'
                                    placeholder='bname'
                                    {...register('bname', {
                                        required: 'This is required',
                                        minLength: { value: 1, message: 'Minimum length should be 1' },
                                    })}
                                    />
                                <FormHelperText> Your bussiness name</FormHelperText>
                            </FormControl>               
                        </Text>
                        <Text>
                            <FormControl >
                                <FormLabel marginBottom='1%'>Bussiness digital presence - Facebook</FormLabel>
                                <Input 
                                    type='bfb' 
                                    id='bfb'
                                    placeholder='bfb'
                                    {...register('bfb')}
                                    />
                                <FormHelperText> Your bussiness Facebook link</FormHelperText>
                            </FormControl>               
                        </Text>
                        <Text>
                            <FormControl >
                                <FormLabel marginBottom='1%'>Bussiness digital presence - Instagram</FormLabel>
                                <Input 
                                    type='big' 
                                    id='big'
                                    placeholder='big'
                                    {...register('big')}
                                    />
                                <FormHelperText> Your bussiness Instagram link</FormHelperText>
                            </FormControl>               
                        </Text>
                        <Text>
                            <FormControl >
                                <FormLabel marginBottom='1%'>Bussiness digital presence - LinkedIn</FormLabel>
                                <Input 
                                    type='blinked' 
                                    id='blinked'
                                    placeholder='blinked'
                                    {...register('blinked')}
                                    />
                                <FormHelperText> Your bussiness LinkedIn link</FormHelperText>
                            </FormControl>               
                        </Text>
                        <Text>
                            <FormControl >
                                <FormLabel marginBottom='1%'>Bussiness Idea</FormLabel>
                                <Input 
                                    type='bidea' 
                                    id='bidea'
                                    placeholder='bidea'
                                    {...register('bidea', {
                                        required: 'This is required',
                                        minLength: { value: 100, message: 'Minimum length should be 100' },
                                    })}
                                    />
                                <FormHelperText> Your bussiness idea</FormHelperText>
                            </FormControl>               
                        </Text>
                        <Text>
                            <FormControl >
                                <FormLabel marginBottom='1%'>Bussiness Sector</FormLabel>
                                <Input 
                                    type='bsector' 
                                    id='bsector'
                                    placeholder='bsector'
                                    {...register('bsector', {
                                        required: 'This is required',
                                        minLength: { value: 4, message: 'Minimum length should be 4' },
                                    })}
                                    />
                                <FormHelperText> Your bussiness sector</FormHelperText>
                            </FormControl>               
                        </Text>
                        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        Submit
                        </Button>
                        </main>
                    </>
                  )
            }
            else
            mainRedirect();
        }
        console.log('wob:'+uMail)
        //signOff()
    }
    else
    walletRedirect();
}