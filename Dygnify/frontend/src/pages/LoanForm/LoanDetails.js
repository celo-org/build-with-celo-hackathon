import { Button, FormControl, InputLabel, makeStyles, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { useFormik } from 'formik';
import React from 'react';
import InputText from './FormFields/InputText';
import { loanDetailsValidationSchema } from './validations/validation';

const useStyles = makeStyles({
    mainContainer: {
        display: 'grid',
        width: '70%',
        margin: '0 auto'
    },
    input: {
        width: "100%",
        margin: '1rem 0 0 0'
    }
})

const LoanDetails = ({ handleNext, formData }) => {

    const classes = useStyles();
    const formik = useFormik({
        initialValues: formData,
        validationSchema: loanDetailsValidationSchema,
        onSubmit: (values, { resetForm }) => {
            handleNext(values, false);
        }
    })
    return (
        <div className={classes.mainContainer}>
            <Typography
                variant='h5'
                style={{ color: '#999', textAlign: 'center', margin: '1rem 0' }}
            >
                Enter Loan Details
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <InputText
                    className={classes.input}
                    name='loan_name'
                    label="Loan Name"
                    value={formik.values.loan_name}
                    error={
                        formik.touched.loan_name && formik.errors.loan_name
                            ? formik.errors.loan_name
                            : null
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <FormControl
                    className={classes.input}
                    variant='outlined'
                >
                    <InputLabel>Loan Type</InputLabel>
                    <Select
                        name='loan_type'
                        label="Loan Type"
                        defaultValue={formData.loan_type}
                        value={formik.values.loan_type}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.loan_type && formik.errors.loan_type
                                ? formik.errors.loan_type
                                : null
                        }
                    >
                        <MenuItem value='1'>Term Loan</MenuItem>
                        <MenuItem value='0'>Bullet Loan</MenuItem>
                    </Select>
                </FormControl>
                {formik.touched.loan_type && formik.errors.loan_type ? (
                    <p style={{ color: 'red' }}>
                        <small>{formik.errors.loan_type}</small>
                    </p>
                ) : null}
                <InputText
                    className={classes.input}
                    name='loan_amount'
                    label="Loan Amount (USDC)"
                    value={formik.values.loan_amount}
                    error={
                        formik.touched.loan_amount && formik.errors.loan_amount
                            ? formik.errors.loan_amount
                            : null
                    }
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                />
                <InputText
                    className={classes.input}
                    name='loan_purpose'
                    label="Loan Purpose"
                    multiline
                    minRows={3}
                    value={formik.values.loan_purpose}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.loan_purpose && formik.errors.loan_purpose
                            ? formik.errors.loan_purpose
                            : null
                    }

                />
                <InputText
                    className={classes.input}
                    name='loan_tenure'
                    label="Loan Tenure (in months)"
                    value={formik.values.loan_tenure}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.loan_tenure && formik.errors.loan_tenure
                            ? formik.errors.loan_tenure
                            : null
                    }
                />
                <InputText
                    className={classes.input}
                    name='loan_interest'
                    label="Loan Interest %"
                    value={formik.values.loan_interest}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.loan_interest && formik.errors.loan_interest
                            ? formik.errors.loan_interest
                            : null
                    }
                />
                <InputText
                    className={classes.input}
                    name='payment_frequency'
                    label="Payment Frequency (in days)"
                    value={formik.values.payment_frequency}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.payment_frequency && formik.errors.payment_frequency
                            ? formik.errors.payment_frequency
                            : null
                    }
                />
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={classes.input}
                    style={{ margin: '1rem 0' }}
                >
                    Next
                </Button>
            </form>

        </div >
    );
};

export default LoanDetails;