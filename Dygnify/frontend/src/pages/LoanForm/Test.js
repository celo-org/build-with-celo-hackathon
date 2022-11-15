import React, { useEffect, useState } from 'react';
import { getOpportunityAt } from '../../components/transaction/TransactionHelper';
import { ExtractIPFSdataFromHash } from '../../services/PinataIPFSOptions';



const Test = () => {
    // const [details, setDetails] = useState({});
    // const id = 'QmfAKQahbuawKK3koZLZqsC4GHnmPkmk8oPakvvP3ThJ1W';
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const temp = await getOpportunityAt(id);
    //         setDetails(temp)
    //     }
    //     fetchData()
    // }, [id]);
    // if (!details) {
    //     return 'loading .....'
    // }
    // const hash = details?.opportunity_info;
    const hash = 'QmUWiXZ4CpL5nQ2mzU18UJsSg77Ydt9nechrXiqDDnmdMV';
    console.log(hash)
    const data = ExtractIPFSdataFromHash(hash);

    console.log(data)
    // console.log(details)
    return (
        <div>
            <h1>Loan Name {data.loanName}</h1><br />
            <h2>Loan Purpose {data.loanPurpose}</h2>
            {/* <h2>Loan Amount {details.loan_amount} USDC</h2>
            <h2>Loan Tenure {details.loan_tenure / 30} months</h2> */}
        </div>
    );
};

export default Test;