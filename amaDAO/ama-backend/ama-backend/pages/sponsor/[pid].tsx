

import { useRouter } from 'next/router'
import useSWR from 'swr'
import Image from "next/image";
import SponsorRow from '../../components/SponsorRow'
import { SponsorEscrow } from '../../interfaces'
import logger from '../../utils/logger'
import badgeExample from "../../public/badge-example.png"
import { useEffect, useState } from 'react';


const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json()

  if (res.status !== 200) {
    throw new Error(data.message)
  }
  return data
}

const fetchBadge = async (url: string) => {
  const res = await fetch(url)
  const data = await res.text();

  if (res.status !== 200) {
    throw new Error(data)
  }
  return data
}

const copyYourHTML = async (str:string) => {
  if (navigator && navigator.clipboard && navigator.clipboard.writeText)
  return navigator.clipboard.writeText(str);
  //alert('Text will be in your clipboard');
  return Promise.reject('The Clipboard API is not available.');
}



export default function SponsorPage() {
  const { query } = useRouter()
  const { data, error } = useSWR(
    () => query.pid && `/api/sponsor/${query.pid}`,
    fetcher
  )

  const { data:badge, error:ebadge } = useSWR(
    () => query.pid && `/api/badge/svg/1`,
    fetchBadge
  )

  const [domain, setDomain] = useState("https://verify.amadao.io");

  useEffect(() => {
    // Client-side-only code
    setDomain(window?.location?.origin);
  })

  const badgeView = `${domain}/badge/${query.pid}`;

  const usageScript = `<img src='${badgeView}'/> `;



  //const queryId: string = query.id;

  if (error) return <div>{error.message}</div>
  if (!data) return <div>Loading...</div>

  if (ebadge) return <div>Badge fail: {ebadge.message}</div>
  if (!badge) return <div>Loading Badge...</div>

  logger.logInfo("Sponsor Page", "badge", badge);

  return (
    <>
    <div>
      <h1>{data.length} Sponorships by {query.pid}</h1>
      <span> </span>
      <div className="p-20">
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Sponsor</th>
              <th>Address</th>
              <th>TCO2</th>
              <th>Trees</th>
              <th>Released</th>
            </tr>
          </thead>
          <tbody>
            <>
            {data.map((s: SponsorEscrow) => 
              <SponsorRow key={s.id} r={s} />
            )}
            </>
          </tbody>
        </table>
      </div>
      <div className="p-20 flex flex-row">

        <div className="w-1/2"> 
          <p>Your verifiable badge:</p>  
          <a href={badgeView} target={`_none`}>
            <Image src={badgeExample} alt="example badge" width={320} height={131}/>
          </a>
        </div>
        <div className="w-1/2">
          <p>Embed it on your site:</p>
          <div>
          <textarea id="your-html" value={usageScript} className="text-black" rows={3}>
          </textarea>
          </div>
          <button className="btn tw-button" onClick={()=>copyYourHTML(usageScript)}>Copy</button>
        </div>
      </div>

    </div>

    {/* Fix font for this to load Dynamially */}
    {/* <html dangerouslySetInnerHTML={{__html: badge }}/>  */}
    </>    
  )
}
