import { FaMagic } from 'react-icons/fa';
import { sacudaContext } from '../components/sacudaContext';
import React from 'react';
import { Text, Heading, Input, Button, FormErrorMessage, FormLabel, FormControl, FormHelperText } from '@chakra-ui/react';
import { useForm } from 'react-hook-form'
import { useSession, signIn, signOff } from "next-auth/react";
import { useRouter } from 'next/router';
import Head from 'next/head';
import { useAccount } from 'wagmi';
import styles from '../styles/home.module.scss';
import '@rainbow-me/rainbowkit/styles.css';
import { mutate } from "swr";

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


    const onSubmit = async (values) => {
        console.log('regmail:'+session.user.email)
        const reqemail = session.user.email;
        const preProf = `{"profile": 0}`;
        const prof = JSON.parse(preProf);

        const finalValues = { ...values, ...prof}
        try {
            const res = await fetch(`/api/updateProfile/${reqemail}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify(finalValues)

            });
            if (!res.ok) {
            throw new Error(res.status);
            }

            const { data } = await res.json();
            mutate(`/api/updateProfile/${reqemail}`, data, false);
            router.push("/");
        } catch (error) {
            console.log(error);
        }
        };



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
            if (uProfile === undefined || uProfile === 0) {
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
                        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>                      
                            <FormControl isInvalid={errors.name}>
                                <FormLabel marginBottom='1%' htmlFor='name'>Name</FormLabel>
                                <Input 
                                    type='text' 
                                    id='name'
                                    placeholder='Jane'
                                    {...register('name', {
                                        required: 'This is required',
                                        minLength: { value: 1, message: 'Minimum length should be 1' },
                                    })}
                                    />
                                <FormHelperText> Your name</FormHelperText>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.name}>
                                <FormLabel marginBottom='1%' htmlFor='surname'>Surname</FormLabel>
                                <Input 
                                    type='text' 
                                    id='surname'
                                    placeholder='Doe'
                                    {...register('surname', {
                                        required: 'This is required',
                                        minLength: { value: 1, message: 'Minimum length should be 1' },
                                    })}
                                    />
                                <FormHelperText> Your surname</FormHelperText>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={errors.name}>
                                <FormLabel marginBottom='1%' htmlFor='linkedin'>LinkedIn profile</FormLabel>
                                <Input 
                                    type='url' 
                                    id='linkedin'
                                    placeholder='https://www.linkedin.com/in/myusername/'
                                    {...register('linkedin', {
                                        required: 'This is required',
                                        minLength: { value: 1, message: 'Minimum length should be 1' },
                                    })}
                                    />
                                <FormHelperText> Your personal linkedIn profile</FormHelperText>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>                                  
                            <FormControl isInvalid={errors.name}>
                                <FormLabel marginBottom='1%' htmlFor='country'>Country</FormLabel>
                                <Input 
                                    type='text' 
                                    id='country'
                                    placeholder='My country'
                                    {...register('country', {
                                        required: 'This is required',
                                        minLength: { value: 1, message: 'Minimum length should be 1' },
                                    })}
                                    />
                                <FormHelperText> Your country</FormHelperText>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>                                  
                            <FormControl isInvalid={errors.name}>
                                <FormLabel marginBottom='1%' htmlFor='bname'>Bussiness Name</FormLabel>
                                <Input 
                                    type='text' 
                                    id='bname'
                                    placeholder='My company'
                                    {...register('bname', {
                                        required: 'This is required',
                                        minLength: { value: 1, message: 'Minimum length should be 1' },
                                    })}
                                    />
                                <FormHelperText> Your bussiness name</FormHelperText>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>                                   
                            <FormControl isInvalid={errors.name}>
                                <FormLabel marginBottom='1%' htmlFor='bfb'>Bussiness digital presence - Facebook</FormLabel>
                                <Input 
                                    type='url' 
                                    id='bfb'
                                    placeholder='https://www.facebook.com/mybussinessname'
                                    {...register('bfb')}
                                    />
                                <FormHelperText> Your bussiness Facebook link</FormHelperText>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>                                    
                            <FormControl isInvalid={errors.name}>
                                <FormLabel marginBottom='1%' htmlFor='big'>Bussiness digital presence - Instagram</FormLabel>
                                <Input 
                                    type='url' 
                                    id='big'
                                    placeholder='https://www.instagram.com/mybussineesname/'
                                    {...register('big')}
                                    />
                                <FormHelperText> Your bussiness Instagram link</FormHelperText>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>                                 
                            <FormControl isInvalid={errors.name}>
                                <FormLabel marginBottom='1%' htmlFor='blinked'>Bussiness digital presence - LinkedIn</FormLabel>
                                <Input 
                                    type='url' 
                                    id='blinked'
                                    placeholder='https://www.linkedin.com/in/mybussinessname/'
                                    {...register('blinked')}
                                    />
                                <FormHelperText> Your bussiness LinkedIn link</FormHelperText>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>                                 
                            <FormControl isInvalid={errors.name}>
                                <FormLabel marginBottom='1%' htmlFor='bidea'>Bussiness Idea</FormLabel>
                                <Input 
                                    type='text' 
                                    id='bidea'
                                    placeholder='My company is about...'
                                    {...register('bidea', {
                                        required: 'This is required',
                                        minLength: { value: 1, message: 'Minimum length should be 100' },
                                    })}
                                    />
                                <FormHelperText> Your bussiness idea</FormHelperText>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>                                
                            <FormControl isInvalid={errors.name}>
                                <FormLabel marginBottom='1%' htmlFor='bsector'>Bussiness Sector</FormLabel>
                                <Input 
                                    type='text' 
                                    id='bsector'
                                    placeholder='Bussiness sector'
                                    {...register('bsector', {
                                        required: 'This is required',
                                        minLength: { value: 4, message: 'Minimum length should be 4' },
                                    })}
                                    />
                                <FormHelperText> Your bussiness sector</FormHelperText>
                                <FormErrorMessage>
                                    {errors.name && errors.name.message}
                                </FormErrorMessage>
                            </FormControl>                                    
                        <Button mt={4} colorScheme='teal' isLoading={isSubmitting} type='submit'>
                        Submit
                        </Button>
                        </form>
                        </main>
                    </>
                  )
            }
            else
            mainRedirect();
        }
    }
    else
    walletRedirect();
}