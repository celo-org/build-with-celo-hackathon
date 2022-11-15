import React from 'react';
import { Box, Button, Typography, Stack, Divider, Card } from "@mui/material";
import { useHistory } from 'react-router-dom';
import RepaymentItem from './RepaymentItem';

const RepaymentCard = ({ data }) => {
    return (
        <>
            <Box
                sx={{
                    mb: "30px",
                    maxWidth: 1100,
                    height: "auto",
                    py: "20px",
                    mx: "auto",
                    backgroundColor: "white",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}
            >
                {
                    data.map(item => <RepaymentItem key={item.id} data={item}></RepaymentItem>)
                }
            </Box>

        </>
    );
};

export default RepaymentCard;