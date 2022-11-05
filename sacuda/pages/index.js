import { useSession } from 'next-auth/react';
import { Heading, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect } from 'react';
import styles from '../styles/home.module.scss';

export default function Home() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/auth/signin');
  });

  const walletRedirect = () => {
    router.push('/auth/walletConnect') }

  return (
    <main className={styles.container}>
      <Head>
        <title>Bienvenidos a Sacuda</title>
      </Head>
      <Heading as={'h1'}>
        Welcome to Sacuda!
      </Heading>

      {status === 'authenticated' ? (
        walletRedirect()
      ) : 
      //typeof window !== 'undefined' ? (
        <>
          <Text 
            as={'h1'}
            marginTop='1%'
            >
              We make women led bussinesses visible!
          </Text>
          <Text 
            as={'h2'}
            marginTop='1%'
            >
              Click on the login button below to start your journey with us
          </Text>
            <Button isLoading={status === 'loading'}>
              <Link
         //       href={'/auth/signin?callbackUrl=' + window?.location.origin || ''}
                href={'/auth/signin?callbackUrl='  || ''}
              >
                Login
              </Link>
          </Button>
        </>
   //   ) : (
   //     ''
   //   )
   }
    </main>
  );
}
