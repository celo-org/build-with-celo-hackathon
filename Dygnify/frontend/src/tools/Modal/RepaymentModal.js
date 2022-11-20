import React from 'react';
import GradientButton from '../Button/GradientButton';
import { repayment } from '../../components/transaction/TransactionHelper';

const RepaymentModal = ({ data, handleRepayment, poolName }) => {
    console.log(data)

    async function onRepayment(){
        await repayment(data.opportunityPoolAddress);
        handleRepayment();
    }

    return (
        <div >
            <input type="checkbox" id="repayment-modal" className="modal-toggle" />
            <div style={{ backdropFilter: 'brightness(40%) blur(8px)' }} className="modal">
                <div style={{ backgroundColor: '#20232A', borderRadius: '16px' }} className="modal-box w-1/3 max-w-5xl p-0">
                    <label for="repayment-modal" className="btn btn-ghost absolute right-2 top-2 pb-2" onClick={() => handleRepayment()}>✕</label>
                    <h3 style={{ borderBottom: '2px solid #292C33' }} className="font-bold text-lg py-3 px-4">Repayment</h3>
                    <div style={{ display: 'flex' }} className='justify-center my-6'>
                        <img style={{ borderRadius: '50%' }} className='p-4 bg-secondary opacity-80' src="/images/wallet_white.png" alt="" />
                    </div>
                    <div style={{ backgroundColor: '#292C33', borderRadius: '4px' }} className='mx-4 mb-3 py-4 px-4 text-base'>
                        <div style={{ display: 'flex' }}>
                            <p style={{ display: 'flex' }} className='justify-start'>Total Balance</p>
                            <p style={{ display: 'flex' }} className='justify-end'>{data?.loan_amount} {process.env.REACT_APP_TOKEN_NAME}</p>
                        </div>
                        <small style={{ display: 'flex', color: '#777E91' }} className='justify-end'>${data?.loan_amount}</small>
                    </div>
                    <div className='text-sm py-3 px-4'>
                        <div style={{ display: 'flex' }} className='mb-2'>
                            <p style={{ display: 'flex' }} className='justify-start'>Pool Name</p>
                            <p style={{ display: 'flex' }} className='justify-end'>{poolName}</p>
                        </div>
                        <div style={{ display: 'flex' }} className='mb-2'>
                            {
                                data?.isOverDue ?
                                    <p style={{ display: 'flex', color: "#EF4444"}} className='justify-start'>Overdue Amount</p>
                                :
                                    <p style={{ display: 'flex' }} className='justify-start'>Due Amount</p>
                            }
                            <p style={{ display: 'flex', color: `${data?.isOverDue ? "#EF4444" : "white"}`}} className='justify-end'>${data?.repaymentDisplayAmount}</p>
                        </div>
                        <div style={{ display: 'flex' }} className='mb-2'>
                            <p style={{ display: 'flex' }} className='justify-start'>Due Date</p>
                            <p style={{ display: 'flex' }} className='justify-end'>{data?.nextDueDate}</p>
                        </div>
                    </div>
                    <div className="modal-action mx-4 mt-2 mb-4">
                        <GradientButton className='w-full' onClick={onRepayment}>Make Repayment</GradientButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepaymentModal;