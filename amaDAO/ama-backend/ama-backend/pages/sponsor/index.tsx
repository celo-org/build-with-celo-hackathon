import useSWR from 'swr'
import SponsorComponent from '../../components/Sponsor'
import { SponsorEscrow } from '../../interfaces'



const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Sponsors() {
  const { data, error } = useSWR('/api/sponsor', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>


  return (
    <main className="relative min-h-screen md:min-h-90vh container md:max-h-150 overflow-y-auto mx-auto md:absolute md:top-1/2 md:left-1/2 md:transform md:-translate-x-1/2 md:-translate-y-1/2">
  
      <div>
        <h1 className="h2 p-5">Sponsors</h1>
       
        <div className="flex flex-row">
          <div className="w-1/3"></div>
          <div className="w-1/3"> 
              {data.map((p: SponsorEscrow) => (
                <SponsorComponent key={p.id} sponsor={p} />
              ))}
            </div>
            <div className="w-1/3"></div>
        </div>
  

      </div>
    </main>     
  )
}
