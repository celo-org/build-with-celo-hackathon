import logger from "../utils/logger"
import { sponsorList } from "../data"


export type Person = {
  id: string
  name: string
  height: string
  mass: string
  hair_color: string
  skin_color: string
  eye_color: string
  gender: string
}


export type SponsorEscrow = {
  id: number
  title: string
  sponsor: string
  address: string
  toc2: string
  trees: string

  released?: string
}

export function escrowMap (id: number, e: any)
{
  const str: string = e.sponsor;
  const sp = sponsorList[str];

  logger.logInfo("escrowMap", "sp:"+str, sp);
  
  const escrow: SponsorEscrow = {
    id: id,
    title: e.title,
    address: e.sponsor,
    sponsor: sp || "unknown",
    toc2: e.funds,
    trees: e.trees

  }
  return escrow;
}

// export function escrowsMap(data: any) 
// {
//   let escrows = new Array<SponsorEscrow>(0);
//   try 
//   {
//     data.forEach(e => {
//       const s: SponsorEscrow = escrowMap(e);
//       escrows.push(s);
//     });
//   } catch (e)
//   {
//     return null;
//   }

//   return escrows;
// } 
