import React from 'react';
import { Box, Button, Typography, Stack, Divider, Card } from "@mui/material";
import { useHistory, useNavigate } from 'react-router-dom';
const RepaymentItem = ({ data }) => {
    const path = useNavigate();
    return (
        <Box>
            <Card
                sx={{
                    width: "900px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    textAlign: "center",
                    marginTop: "20px",
                    padding: "10px",
                    boxShadow: "2px 4px 4px darkgrey",
                    border: "1px solid grey"
                }}
            >
                <div>
                    <Typography variant="h6">
                        Repayment for {data?.opportunity_name} is due on {data?.repayment_date}
                    </Typography>

                </div>
                <Divider orientation="vertical" variant="middle" flexItem />
                <div>
                    <Typography variant="h6">
                        {data?.repayment_amount} {process.env.REACT_APP_TOKEN_NAME}
                    </Typography>
                    <Button onClick={() => path(`/repayment/${data?.id}`)} sx={{ backgroundColor: "#7165E3" }} variant='contained'>Pay Now</Button>
                </div>
            </Card>
        </Box>
    );
};

export default RepaymentItem;