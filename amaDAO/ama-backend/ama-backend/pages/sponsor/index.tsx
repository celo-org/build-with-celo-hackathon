import useSWR from 'swr'
import SponsorComponent from '../../components/Sponsor'
import { SponsorEscrow } from '../../interfaces'



const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Sponsors() {
  const { data, error } = useSWR('/api/sponsor', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>


  return (
    <div>
      <h1>Sponsors</h1>
      <ul>
        {data.map((p: SponsorEscrow) => (
          <SponsorComponent key={p.id} sponsor={p} />
        ))}
      </ul>

 

    </div>

  )
}
