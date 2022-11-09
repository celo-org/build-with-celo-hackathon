import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import  Image from 'next/image';
import 'styles/globals.css';

import { userService } from 'services';
import { Nav, Alert } from 'components';
import student from './DDD.gif';

export default App;

function App({ Component, pageProps }) {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [authorized, setAuthorized] = useState(false);

    useEffect(() => {
        // on initial load - run auth check 
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false  
        const hideContent = () => setAuthorized(false);
        router.events.on('routeChangeStart', hideContent);

        // on route change complete - run auth check 
        router.events.on('routeChangeComplete', authCheck)

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off('routeChangeStart', hideContent);
            router.events.off('routeChangeComplete', authCheck);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function authCheck(url) {
        // redirect to login page if accessing a private page and not logged in 
        setUser(userService.userValue);
        const publicPaths = ['/account/login', '/account/register'];
        const path = url.split('?')[0];
        if (!userService.userValue && !publicPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: '/account/login',
                query: { returnUrl: router.asPath }
            });
        } else {
            setAuthorized(true);
        }
    }

    return (
        <>
    






            <Head>
                <title>CNFT LOGIN CELO MVP</title>
                
                {/* eslint-disable-next-line @next/next/no-css-tags */}
                <link href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet" />
            </Head>

            <div className={`app-container ${user ? 'bg-light' : ''}`}>
                <Nav />
                <Alert />
                {authorized &&
                    <Component {...pageProps} />
                }

<center>
<h4>KYC VERIFICATION USING YOUR VALID COLLEGE ID CARD</h4>
<a href="http://localhost:3000/Kyc"> <Image src={student} alt="BigCo Inc. logo" class="kyc"/></a>
</center>



            </div>
       {/* credits */}
            <div className="text-center mt-4">

                <h2>
                    <a href="http://localhost:3000/Kyc" target="_top">CLICK HERE TO FINISH KYC</a>
               </h2>


              </div>







        </>
    );
}
