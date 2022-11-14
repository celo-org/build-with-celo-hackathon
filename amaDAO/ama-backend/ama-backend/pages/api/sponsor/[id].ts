import logger from '../../../utils/logger'
import contractConnect from '../../../utils/contractConnect';
import { SponsorEscrow, escrowMap } from '../../../interfaces'
import { NextApiResponse, NextApiRequest } from 'next'

export default async function sponsorEscrows(
  _req: NextApiRequest,
  res: NextApiResponse<SponsorEscrow[]>)
{
  const { query } = _req
  const { id } = query

  const contract = contractConnect();
  
  logger.logInfo("sponsorEscrow api", "req.id:", id);

  try 
  {
    let escAll = await contract.nEscrow(); 
    let escrows = new Array<SponsorEscrow>(0); // can be many per sponsor

    logger.logInfo("sponsorEscrow api", "escAll:", escAll);

    for (let i = 0; i < escAll; i++) {
      let sp = await contract.escrowSponsor(i);

      logger.logInfo("sponsorEscrow api", "id:"+i, sp);
      if (sp == id)
      {
        logger.logInfo("sponsorEscrow api", "id==sp:"+i, sp);
        const e = await contract.escrows(i+1); //0 offset
        const s: SponsorEscrow = escrowMap(i, e);
        escrows.push(s);
      }
    }
    logger.logInfo("sponsorEscrow api", "Returning:", escrows);
    return res.status(200).json(escrows);
  }
  catch (e)
  {
    logger.logError("sponsorEscrow api", "Exception", e);
    return res.status(404).json(e);
  }
}

