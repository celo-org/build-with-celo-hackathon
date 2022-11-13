import { useState, useEffect } from 'react';
import  Image from 'next/image';
import { Link, Spinner } from 'components';
import { Layout } from 'components/account';
import { userService } from 'services';
import KYCLOGO from './kycl.gif';
export default Kyc;
function Kyc()
{


    return (
    

   <>
   


<center>
<h1>CLICK THE VERIFICATION TO VERIFY USING OCR</h1>
</center>
         
            <div className="text-center mt-4">

<center>
<a href="http://localhost:3001"> <Image src={KYCLOGO} alt="BigCo Inc. logo" width={700}
      height={1100} class="kyc"/></a>
</center>

               </div>

        </>




    );
}
