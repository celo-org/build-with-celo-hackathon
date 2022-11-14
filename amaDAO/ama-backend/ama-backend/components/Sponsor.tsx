import Link from 'next/link'
import { SponsorEscrow } from '../interfaces'

type SponsorProps = {
  sponsor: SponsorEscrow
}

export default function SponsorComponent({ sponsor }: SponsorProps) {
  return (
    <div className="m-2 border rounded border-sky-500 hover:border-2 p-2">
      <Link href="/sponsor/[id]" as={`/sponsor/${sponsor.address}`}>
        {sponsor.title} - {sponsor.sponsor}
      </Link>
    </div>
  )
}
