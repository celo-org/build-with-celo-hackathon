import React from 'react';
import GradientButton from './Button/GradientButton';
import PrimaryButton from './Button/PrimaryButton';
import DrawdownCard from './Card/DrawdownCard';
import OpportunityCardCollapsible from './Card/OpportunityCardCollapsible';
import RepaymentCard from './Card/RepaymentCard';

const ToolTest = ({ children }) => {
    return (
        <div className='bg-[#20232A]'>
            <PrimaryButton>Withdraw</PrimaryButton>
            <GradientButton>Borrow Request</GradientButton>
            <DrawdownCard></DrawdownCard>
            <RepaymentCard></RepaymentCard>
            <OpportunityCardCollapsible></OpportunityCardCollapsible>
        </div >
    );
};

export default ToolTest;