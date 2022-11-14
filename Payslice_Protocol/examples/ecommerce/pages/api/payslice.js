import CONTRACT_ABI from "../../constants/payslice.json";
import Web3 from "web3";

const web3Eth = new Web3("https://alfajores-forno.celo-testnet.org");

const { address: admin } = web3Eth.eth.accounts.wallet.add(
    process.env.ACCOUNT_KEY
);

const paysliceContract = new web3Eth.eth.Contract( CONTRACT_ABI.abi,CONTRACT_ABI.address);

export default async function handler(req, res) {

    try {
        const {
            targetToken,
            totalReceivable,
            recipientAddress,
            recipientAddressChainId,
            payeruid,
            cartItems
        } = req.body;

        const payers = [[payeruid, totalReceivable]];

        
        const userData =  Buffer.from(JSON.stringify(cartItems), 'utf8');


        if (!targetToken || !totalReceivable || !payers) {
            res.status(500);
        }

        // start payment section
        const result = await paysliceContract.
            methods.createNewSlice(
                targetToken,
                recipientAddress,
                recipientAddressChainId,
                totalReceivable,
                payers,
                userData
            ).send({from: admin, gas: 700000});

        const event = result.events.ProxyCreated;

        console.log(event.returnValues);

        const { proxy } = event.returnValues;

        res.status(200).json({ proxy, ...req.body });

    } catch (error) {
        console.log(error);
    }


}
