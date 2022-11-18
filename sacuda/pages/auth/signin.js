import { FaMagic } from 'react-icons/fa';
import { Heading, Text, Input, Button } from '@chakra-ui/react';
import { signIn, getSession, getProviders } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import EmailSentModal from '../../components/EmailSentModal';

import styles from '../../styles/signin.module.scss';

export default function SignIn() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (loading) return;

    setLoading(true);

    signIn('email', {
      email,
      redirect: false,
      callbackUrl: router.query.callbackUrl,
    })
      .then(() => {
        setShow(true);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Login | Sacuda</title>
      </Head>
      <main
        className={styles.pageContainer}
        style={{ filter: show && 'blur(10px)' }}
      >
        <FaMagic fontSize="3rem" color="#346DF1" />
        <Heading as={'h1'}>Login to Sacuda</Heading>
        <Text 
          as={'h2'}
          marginTop='1%'
          >
          We will send you a magic link to your email, review your inbox and follow the instructions to login
        </Text>
        <form className={styles.form} onSubmit={onSubmit}>
          <label>
            <p>Please enter your email address</p>
            <Input
              placeholder="hi@sacuda.net"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <Button
            isLoading={loading}
            bgColor="blue.500"
            color="white"
            _hover={{ backgroundColor: 'blue.600' }}
            type="submit"
            as="button"
          >
            Login
          </Button>
        </form>
      </main>
      {show && typeof window !== 'undefined' ? (
        <EmailSentModal email={email} />
      ) : (
        ''
      )}
    </>
  );
}

export async function getServerSideProps(context) {
  const [providers, session] = await Promise.all([
    getProviders(),
    getSession(context),
  ]);

  if (session) {
    return {
      redirect: {
        permanent: false,
        destination: '/',
      },
    };
  }

  return {
    props: { providers, session },
  };
}
