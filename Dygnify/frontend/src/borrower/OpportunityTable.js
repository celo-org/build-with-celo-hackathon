import {React,useState} from "react";
import { Box, Button,  Card } from "@mui/material";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const OpportunityTable = () => {
    const [opportunityData, setOpportunityData] = useState([
        {date : "12/05/2020", name : "Opportunity 1", amount : "100" },
        {date : "22/05/2021", name : "Opportunity 2", amount : "199" }
    ]);

  return (
    <>
    <Card
          sx={{
            my: "20px",
            maxWidth: 1100,
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
            <TableHead>
              <TableRow>
                <TableCell align="center">Due Date</TableCell>
                <TableCell align="center">Opportunity</TableCell>
                <TableCell align="center">Amount ({process.env.REACT_APP_TOKEN_NAME})</TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {opportunityData.map((opportunityData,i) => (
                <TableRow key={i}>
                  <TableCell align="center" component="th" scope="row" width="275px">
                    {opportunityData.date}
                  </TableCell>
                  <TableCell width="275px" align="center">{opportunityData.name}</TableCell>
                  <TableCell 
                    width="275px"
                    align="center" 
                    >
                       {opportunityData.amount}
                  </TableCell>
                  <TableCell width="275px" align="center">
                    <Button
                        sx={{ backgroundColor: "#7165E3" }}
                        variant="contained"
                        size="large"
                    >
                        Pay Now
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
        </Card>
      
    </>
  );
};
 
export default OpportunityTable;
