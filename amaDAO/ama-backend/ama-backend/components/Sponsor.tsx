import Link from 'next/link'
import { SponsorEscrow } from '../interfaces'

type SponsorProps = {
  sponsor: SponsorEscrow
}

export default function SponsorComponent({ sponsor }: SponsorProps) {
  return (
    <li>
      <Link href="/sponsor/[id]" as={`/sponsor/${sponsor.address}`}>
        {sponsor.title} - {sponsor.sponsor}
      </Link>
    </li>
  )
}
