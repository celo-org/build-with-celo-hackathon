import { React, useEffect, useState } from "react";
import { ethers } from 'ethers';
import { Box, Button, Typography, Stack, Divider, Card } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { border } from "@mui/system";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputText from "../LoanForm/FormFields/InputText";

const Withdrawal = () => {
    const { id } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchJSON = async () => {
            const response = await fetch("/juniorPool.json");
            let json = await response.json();
            setData(json);
        };

        fetchJSON();
    }, []);
    async function requestAccount() {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
    }
    console.log(data)
    const target = data.find(item => item.id == id)
    console.log(target)

    return (
        <>
            <style>{"body { background-color: #7165e3 }"}</style>
            <Box
                sx={{
                    height: "90px",
                    backgroundColor: "#ffffff",
                    borderEndEndRadius: "12px",
                    borderEndStartRadius: "12px",
                    px: "40px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Box>
                    <img
                        style={{ width: "150px", height: "80px", objectFit: "contain" }}
                        src="./assets/logo.png"
                        alt="company logo"
                    />
                </Box>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        textAlign: "center",
                    }}
                >
                    <div>
                        <Typography variant="body2">Switch to</Typography>
                        <Button
                            size="small"
                            sx={{ backgroundColor: "#E5E5E5", borderRadius: "120px" }}
                        >
                            {process.env.REACT_APP_TOKEN_NAME}
                        </Button>
                    </div>
                    <Button
                        sx={{ backgroundColor: "#7165E3" }}
                        variant="contained"
                        size="large"
                        onClick={requestAccount}
                    >
                        Connect Wallet
                    </Button>
                </div>
            </Box>

            <Box
                sx={{
                    mb: "30px",
                    maxWidth: 400,
                    mx: "auto",
                    marginTop: "40px",
                    backgroundColor: "White",
                    width: "400px",
                    height: "auto",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px"
                }}
            >
                <Typography variant="h6">{target?.opportunity_name}</Typography>
                <Card
                    sx={{
                        my: "20px",
                        maxWidth: 900,
                        mx: "auto",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                        textAlign: "center",
                    }}
                >
                    <Paper >
                        <Table >
                            <TableBody>
                                <TableRow >
                                    <TableCell align="Left" component="th" scope="row" width="220px">
                                        Available for Withdrawal
                                    </TableCell>
                                    <TableCell width="220px" align="center">-</TableCell>
                                    <TableCell
                                        width="220px"
                                        align="center"
                                    >
                                        {target?.available_withdrawal} {process.env.REACT_APP_TOKEN_NAME}
                                    </TableCell>
                                </TableRow>
                                <TableRow >
                                    <TableCell align="Left" component="th" scope="row" width="220px">
                                        Enter Withdrawal Amount ({process.env.REACT_APP_TOKEN_NAME})
                                    </TableCell>
                                    <TableCell width="220px" align="center">-</TableCell>
                                    <TableCell
                                        width="220px"
                                        align="center"
                                    >
                                        <InputText name='withdrawal_amount'></InputText>
                                    </TableCell>
                                </TableRow>

                            </TableBody>

                        </Table>
                    </Paper>
                </Card>
                <Button
                    sx={{ backgroundColor: "#7165E3" }}
                    variant="contained"
                    size="large"
                    onClick={requestAccount}
                >
                    Confirm Drawdown
                </Button>
            </Box>

            <br /><br /><br />
        </>
    );
};

export default Withdrawal;