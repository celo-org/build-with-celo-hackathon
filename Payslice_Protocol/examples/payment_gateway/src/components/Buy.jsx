import { Button } from "antd";
import { ethers } from "ethers";
import { hexConcat, keccak256 } from "ethers/lib/utils";
import { useEffect } from "react";
import { useState } from "react";
import {
    useAccount,
    useContract,
    useContractWrite,
    usePrepareContractWrite,
    useSigner,
} from "wagmi";

import { PaysliceInterface } from "../interface";

export default function Buy(props) {
    const { address } = useAccount();
    const { data: signer } = useSigner();
    const [sliceDetails, setSliceDetails] = useState({});
    const [isLoading, setLoading] = useState(false);
    const [isError, setError] = useState(false);

    const contract = useContract({
        addressOrName: PaysliceInterface.address,
        contractInterface: PaysliceInterface.abi,
        signerOrProvider: signer,
    });

    if (isLoading) {
        return "Loading ...";
    }

    if (isError) {
        return "Failed";
    }

    return (
        <Button
            onClick={async () => {
                
                const data = {
                    ...sliceDetails,
                };
                // console.log(data);
                const txn = await contract.createInvoice(
                    data.name,
                    data.description,
                    data.targetToken,
                    data.recipientAddress,
                    data.totalReceivable,
                    data.payers,
                    data.invoiceuid
                    
                    // data
                );
                // const txn = await contract.numberOfInvoices();
                // const txn = await contract.ownerInvoices(address, 0);
                // const txn = await contract.invoices("0xe8F163F0e460C25961fa70eAeab49Ca02f7eE78d");
                // const txn = await contract.payerOf("0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199");

                const resp = await txn.wait();

                const event =  resp.events.find(event => event.event === 'InvoiceCreated');

                console.log(event);
            }}
        >
            Buy for 2000 USDT
        </Button>
    );
}
