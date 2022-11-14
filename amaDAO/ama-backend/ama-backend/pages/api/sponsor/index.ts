import logger from '../../../utils/logger'
import contractConnect from '../../../utils/contractConnect';
import { SponsorEscrow, escrowMap } from '../../../interfaces'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function sponsorEscrows(
  _req: NextApiRequest,
  res: NextApiResponse<SponsorEscrow[]>)
{
  const contract = contractConnect();
  
  try 
  {
    let escAll = await contract.nEscrow(); 
    let escrows = new Array<SponsorEscrow>(0);

    for (let i = 1; i <= escAll; i++) {
      let result = await contract.escrows(i);
      logger.logInfo("sponsorEscrow", "index:"+i, result);
      const s: SponsorEscrow = escrowMap(i, result);
      escrows.push(s);
    }
    return res.status(200).json(escrows);
  }
  catch (e)
  {
    logger.logError("sponsorEscrows", "Exception", e);
    return res.status(404).json(e);
  }
}

