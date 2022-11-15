import { Button, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { useFormik } from 'formik';
import { CollateralDetailsValidationSchema } from './validations/validation';
import InputText from './FormFields/InputText';


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

const CollateralDocuments = ({ handleNext, handlePrev, formData }) => {
    const classes = useStyles();
    const formik = useFormik({
        initialValues: { collateral_document: '', capital_loss: '' },
        validationSchema: CollateralDetailsValidationSchema,
        onSubmit: (values) => {
            handleNext(values, true)
        }
    })

    return (
        <div className={classes.mainContainer}>
            <Typography
                variant='h5'
                style={{ color: '#999', textAlign: 'center', margin: '1rem 0' }}
            >
                Submit Collateral Documents
            </Typography>
            <form onSubmit={formik.handleSubmit}>
                <div>
                    <label htmlFor="collateral_document">Collateral Document</label>
                    <input
                        className={classes.input}
                        type="file"
                        name='collateral_document'
                        label="Collateral Document"
                        onBlur={formik.handleBlur}
                        onChange={(e) => {
                            formik.setFieldValue('collateral_document', e.target.files)
                        }}
                    />
                    {formik.touched.collateral_document && formik.errors.collateral_document ? (
                        <p style={{ color: 'red' }}>
                            <small>{formik.errors.collateral_document}</small>
                        </p>
                    ) : null}
                </div>
                <InputText
                    className={classes.input}
                    name='capital_loss'
                    type='number'
                    label="First loss capital % (if any)"
                    value={formik.values.capital_loss}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={
                        formik.touched.capital_loss && formik.errors.capital_loss
                            ? formik.errors.capital_loss
                            : null
                    }
                />

                <Button
                    onClick={handlePrev}
                    variant='contained'
                    color='primary'
                    className={classes.input}
                >
                    Back
                </Button>
                <Button
                    type='submit'
                    variant='contained'
                    color='primary'
                    className={classes.input}
                    style={{ marginBottom: '1rem' }}
                >
                    Next
                </Button>
            </form>

        </div>
    );
};

export default CollateralDocuments;