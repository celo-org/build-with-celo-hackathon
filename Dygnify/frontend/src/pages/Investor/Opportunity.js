import React from 'react';
import { Box, Typography, Divider, Card } from "@mui/material";
import { Link } from "react-router-dom";
import { ExtractIPFSdataFromHash } from '../../services/PinataIPFSOptions';

const Opportunity = ({ opportunity }) => {
    const { opportunity_id, loan_type, loan_amount, loan_tenure, loan_interest, opportunity_info } = opportunity;


    const info = ExtractIPFSdataFromHash(opportunity_info);
    console.log(info)
    return (
        <>
            <Box>
                <Card
                    sx={{
                        my: "30px",
                        maxWidth: 1100,
                        height: 90,
                        mx: "auto",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <div>
                        <Typography variant="subtitle2">{info?.loanName}</Typography>
                        <Typography variant="overline">{loan_type === 1 ? 'Term Loan' : 'Bullet Loan'}</Typography>
                    </div>
                    <Divider orientation="vertical" variant="middle" flexItem />
                    <div>
                        <Typography variant="subtitle2">{(loan_tenure / 30).toFixed(2)} months</Typography>
                        <Typography variant="overline">Loan Tenure</Typography>
                    </div>
                    <Divider orientation="vertical" variant="middle" flexItem />{" "}
                    <div>
                        <Typography variant="subtitle2">{loan_interest} %</Typography>
                        <Typography variant="overline">Loan Interest</Typography>
                    </div>
                    <Divider orientation="vertical" variant="middle" flexItem />{" "}
                    <div>
                        <Typography variant="subtitle2">{loan_amount} {process.env.REACT_APP_TOKEN_NAME}</Typography>
                        <Typography variant="overline">Loan Amount</Typography>
                    </div>
                    <Divider orientation="vertical" variant="middle" flexItem />{" "}
                    <Card
                        sx={{
                            boxShadow: 'none'
                        }}
                    >
                        <Card
                            sx={{
                                border: "1px solid #7165E3",
                                borderRadius: "12px",
                                width: "80px",
                                textAlign: "center",
                            }}
                        >
                            <Link to={`/loan-details/${opportunity_id}`}>Open</Link>
                        </Card>
                        <br />
                        <Card
                            sx={{
                                border: "1px solid #7165E3",
                                borderRadius: "12px",
                                width: "80px",
                                textAlign: "center",
                            }}
                        >
                            <Link to='/investor-dashboard'>Invest</Link>
                        </Card>
                    </Card>
                </Card>
            </Box>
        </>
    );
};

export default Opportunity;