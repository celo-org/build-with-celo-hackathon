// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ethers } from "ethers";

import CONTRACT_ABI from "../../constants/payslice.json";

const wallet = new ethers.Wallet(process.env.ACCOUNT_KEY);

const provider = new ethers.providers.JsonRpcProvider(
  "https://alfajores-forno.celo-testnet.org"
);

const signer = wallet.connect(provider);

const paysliceContract = new ethers.Contract(CONTRACT_ABI.address, CONTRACT_ABI.abi);

export default async function handler(req, res) {

    try {
        const {
            targetToken,
            totalReceivable,
            recipientAddress,
            recipientAddressChainId,
            payeruid
        } = req.body;
    
        const payers = [[payeruid, totalReceivable]];

        const userData = ethers.utils.toUtf8Bytes("");
        
    
        if(!title || !description || !payers){
         res.status(500);
        }
        
        // start payment section
        console.log(signer);
        const txn = await paysliceContract
            .connect(signer)
            .createNewSlice(
                targetToken,
                recipientAddress,
                recipientAddressChainId,
                totalReceivable,
                payers,
                userData
            );
    
        const resp = await txn.wait();
    
        console.log(resp);
    
        const event = resp.events.find((event) => event.event === "SliceCreated");
    
        console.log(event.args);
    
        const {proxy} = event.args
    
        res.status(200).json({proxy, ...req.body});
    
    } catch (error) {
        console.log(error);
    }

   
}
