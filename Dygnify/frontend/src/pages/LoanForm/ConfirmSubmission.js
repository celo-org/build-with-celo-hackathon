import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles({
    mainContainer: {
        display: 'grid',
        width: '70%',
        margin: '0 auto'
    }
})

const ConfirmSubmission = ({ handlePrev, finalSubmit, formData }) => {
    const classes = useStyles();
    console.log(formData)
    const handleClick = () => {
        finalSubmit(formData)
    }

    return (
        <div className={classes.mainContainer}>
            <Typography
                variant='h5'
                style={{ color: '#999', textAlign: 'center', margin: '1rem 0' }}
            >
                Confirm Loan Submission
            </Typography>
            <div>
                <Typography
                    variant='body1'
                    style={{ color: '#999', textAlign: 'center', margin: '1rem 0' }}
                >
                    Loan Type: {formData.loan_name}
                </Typography>
                <Typography
                    variant='body1'
                    style={{ color: '#999', textAlign: 'center', margin: '1rem 0' }}
                >
                    Loan Type: {formData?.loan_type === 1 ? 'Term Loan' : 'Bullet Loan'}
                </Typography>
                <Typography
                    variant='body1'
                    style={{ color: '#999', textAlign: 'center', margin: '1rem 0' }}
                >
                    Loan Amount: {formData.loan_amount}
                </Typography>
                <Typography
                    variant='body1'
                    style={{ color: '#999', textAlign: 'center', margin: '1rem 0' }}
                >
                    Loan Purpose: {formData.loan_purpose}
                </Typography>
                <Typography
                    variant='body1'
                    style={{ color: '#999', textAlign: 'center', margin: '1rem 0' }}
                >
                    Loan Tenure: {formData.loan_tenure} months
                </Typography>
                <Typography
                    variant='body1'
                    style={{ color: '#999', textAlign: 'center', margin: '1rem 0' }}
                >
                    Loan Interest: {formData.loan_interest} %
                </Typography>
                <Typography
                    variant='body1'
                    style={{ color: '#999', textAlign: 'center', margin: '1rem 0' }}
                >
                    Payment Frequency: {formData.payment_frequency} days
                </Typography>
                <Typography
                    variant='body1'
                    style={{ color: '#999', textAlign: 'center', margin: '1rem 0' }}
                >
                    First loss capital: {formData.capital_loss} %
                </Typography>
                <Button
                    onClick={handlePrev}
                    variant='contained'
                    color='primary'
                    style={{ width: "100%", margin: '1rem 0' }}
                >
                    Back
                </Button>
                <Button
                    onClick={handleClick}
                    type='submit'
                    variant='contained'
                    color='primary'
                    style={{ width: "100%", margin: '1rem 0' }}
                >
                    Submit Loan Request
                </Button>
            </div>
        </div>
    );
};

export default ConfirmSubmission;