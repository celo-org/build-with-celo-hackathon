import useSWR from 'swr'
import PersonComponent from '../components/Person'
import { Person } from '../interfaces'



const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Sponsors() {
  const { data, error } = useSWR('/api/people', fetcher)

  if (error) return <div>Failed to load</div>
  if (!data) return <div>Loading...</div>


  return (
    <div>
      <h1>Sponsors</h1>
      <ul>
        {data.map((p: Person) => (
          <PersonComponent key={p.id} person={p} />
        ))}
      </ul>

 

    </div>

  )
}
