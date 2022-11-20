import { TextField } from '@material-ui/core';
import React from 'react';

const InputText = ({ name, label, type, error, ...rest }) => {
    return (
        <>
            <TextField
                {...rest}
                name={name}
                label={label}
                variant='outlined'
            />
            {error && (
                <p style={{ color: 'red', margin: '0px' }}>
                    <small>{error}</small>
                </p>
            )}
        </>
    );
};

export default InputText;