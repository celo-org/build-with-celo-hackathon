import { SponsorEscrow } from "../interfaces";


type SponsorRowProps = {
  r: SponsorEscrow
}

export default function SponsorRow( { r } : SponsorRowProps  ) {  
      return(
        <tr>
          <td>{r.id}</td>
          <td>{r.title}</td>
          <td>{r.sponsor}</td>
          <td>{r.address}</td>
          {/* <td>{r.toc2}</td>
          <td>{r.trees}</td> */}
          {/* <td>{r.released}</td> */}
        </tr>
      )
}



