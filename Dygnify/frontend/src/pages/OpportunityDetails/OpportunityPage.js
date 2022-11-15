import React, { useState } from 'react';
import { useEffect } from 'react';
import { useHistory, useNavigate } from "react-router-dom";
import { getOpportunitysOf } from '../../components/transaction/TransactionHelper';
import Opportunity from './Opportunity';

const OpportunityPage = () => {
    const path = useNavigate();
    const [data, setData] = useState();
    useEffect(() => {
        const dataFetch = async () => {
            const temp = await getOpportunitysOf();
            setData(temp)
        }
        dataFetch();
    }, [data])

    console.log(data)
    return (
        <div style={{ textAlign: 'center' }}>
            <h2>This is Borrower Dashboard</h2><br />
            <button onClick={() => path('/loan-form')}>Apply for Loan</button><br />
            <h3>Opportunity List</h3><br />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr' }}>
                {
                    data?.map((item, index) => <Opportunity key={index} data={item}></Opportunity>)
                }
            </div>
        </div>
    );
};

export default OpportunityPage;