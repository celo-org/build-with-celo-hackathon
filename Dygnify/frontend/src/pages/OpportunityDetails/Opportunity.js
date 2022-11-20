import React from 'react';
import { useHistory, useNavigate } from 'react-router-dom';

const Opportunity = ({ data }) => {
    const path = useNavigate();
    return (
        <div style={{ border: '1px solid gray', padding: '10px 20px', margin: '20px' }}>
            <p>Loan Amount: {data?.loan_amount}</p>
            <p>Loan Tenure: {data?.loan_tenure}</p>
            <p>Loan Interest: {data?.loan_interest}</p>
            <button onClick={() => path(`/opportunity-details/${data?.opportunity_id}`)}>See Details</button>
        </div>
    );
};

export default Opportunity;