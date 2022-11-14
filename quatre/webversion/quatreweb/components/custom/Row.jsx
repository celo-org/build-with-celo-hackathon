import * as React from "react";
import { Typography, Tooltip, Collapse, TableRow, TableCell, Table, TableHead, IconButton, Box, TableBody } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckBoxIcon from "@mui/icons-material/Check";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
// import utils from "./utils";
import { useCelo } from "@celo/react-celo";

// Table row
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const { network } = useCelo();
  const denom = "$CELO"

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell align="center">
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => {
              row.rowData.onclick();
              setOpen(!open);
            }}
          >
            <Tooltip title="Click to view band information">{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}</Tooltip>
          </IconButton>
        </TableCell>

        <TableCell component="th" scope="row" align="center">
          {row.rowData?.id}
        </TableCell>
        <TableCell align="center" >{row.rowData?.quorum}</TableCell>
        <TableCell align="center" >{row.rowData?.amount}</TableCell>
        <TableCell align="center" >{row.rowData?.admin}</TableCell>
        <TableCell align="center" >{row.rowData?.pool}</TableCell>
        <TableCell align="center" > {row.rowData?.joinBand(row.rowData?.type)}</TableCell>
        <TableCell align="center" >
          {row.rowData?.include && (
            <span>
              <Tooltip title="You're a member">
                <span>
                  <CheckBoxIcon style={{color: 'green'}}/>
                </span>
              </Tooltip>
            </span>
          )}

          {!row.rowData?.include && (
            <span>
              <Tooltip title="Not a member of this community">
                <span>
                  <CloseIcon style={{color: 'red'}} />
                </span>
              </Tooltip>
            </span>
          )}
        </TableCell>
        <TableCell align="center" >{row.rowData?.current}</TableCell>
        <TableCell align="center" >{row.rowData?.type === 0 ? "PUBLIC" : "PRIVATE"}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={10}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Info
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    {/* <TableCell>Id</TableCell> */}
                    <TableCell className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center  " align="center">
                      Your position
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center " align="center">
                      Amount you owe {denom}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center  " align="center">
                      Shared balance {denom}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center  " align="center">
                      Collateral balance ($QTOK)
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center  " align="center">
                      Expected time to payback
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center  " align="center">
                      Total expected value {denom}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center  " align="center">
                      Total value contributed {denom}
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center  " align="center">
                      Total duration (In days)
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center  " align="center">
                      Collateral Index
                    </TableCell>
                    <TableCell className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center  " align="center">
                      Current beneficiary
                    </TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow>
                    <TableCell align="center" className="border mx-auto p-1 rounded-lg justify-center  ">
                      {row.rowData?.proxy?.position}
                    </TableCell>

                    <TableCell align="center" className="border mx-auto p-1 rounded-lg justify-center  ">
                      {row.rowData?.proxy?.owings}
                    </TableCell>
                    <TableCell align="center" className="border mx-auto p-1 rounded-lg justify-center  ">
                      {row.rowData?.proxy?.shared}
                    </TableCell>

                    <TableCell align="center" className="border mx-auto p-1 rounded-lg justify-center">
                      {row.rowData?.proxy?.colBal}
                    </TableCell>
                    <TableCell align="center" className="border mx-auto p-1 rounded-lg justify-center">
                      {row.rowData?.proxy?.ert}
                    </TableCell>
                    <TableCell align="center" className="border mx-auto p-1 rounded-lg justify-center">
                      {row.rowData?.proxy?.totalExpected}
                    </TableCell>
                    <TableCell align="center" className="border mx-auto p-1 rounded-lg justify-center">
                      {row.rowData?.proxy?.totalPooled}
                    </TableCell>
                    <TableCell align="center" className="border mx-auto p-1 rounded-lg justify-center">
                      {row.rowData?.proxy?.duration}
                    </TableCell>
                    <TableCell align="center" className="border mx-auto p-1 rounded-lg justify-center">
                      {row.rowData?.proxy?.index}
                    </TableCell>
                    <TableCell align="center" className="border mx-auto p-1 rounded-lg justify-center">
                      {row.rowData?.proxy?.beneficiary}
                    </TableCell>
                  </TableRow>
                </TableBody>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" colSpan={2} className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center">
                      <span>
                        <Tooltip title="Click to get finance. Disabled when not your turn">
                          <span >{row.rowData?.runFunc("GETFINANCE", row.rowData?.currentPoolSize < row.rowData?.total)}</span>
                        </Tooltip>
                      </span>
                    </TableCell>
                    <TableCell align="center" className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center">
                      <span>
                        <Tooltip title="Click to payback. Disabled when you have no debt to pay">
                          <span>{row.rowData?.runFunc("PAYBACK", row.rowData?.owings === "0.0")}</span>
                        </Tooltip>
                      </span>
                    </TableCell>
                    <TableCell align="center" colSpan={2} className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center">
                      <span>
                        <Tooltip title="Click to liquidate if any member default payment">
                          <span>{row.rowData?.runFunc("LIQUIDATE DEFAULTER", row.rowData?.liquidated === "0x0000000000000000000000000000000000000000")}</span>
                        </Tooltip>
                      </span>
                    </TableCell>
                    <TableCell align="center" colSpan={2} className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center">
                      <span>
                        <Tooltip title="Absorb defaulter's debt. Disabled when no one defaults">
                          <span>{row.rowData?.runFunc("ABSORB DEFAULTER", row.rowData?.liquidated === "0x0000000000000000000000000000000000000000")}</span>
                        </Tooltip>
                      </span>
                    </TableCell>
                    <TableCell align="center" className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center">
                      <span>
                        <Tooltip title="Claim your collateral balance">
                          <span>{row.rowData?.runFunc("CLAIM", row.rowData?.claim > 0)}</span>
                        </Tooltip>
                      </span>
                    </TableCell>
                    <TableCell align="center" colSpan={2} className="border-2 border-gray-300 mx-auto p-1 rounded-lg justify-center">
                      <span>
                        <Tooltip title="Click to round up. Active only when band cycle is completed">
                          <span>{row.rowData?.runFunc("CLOSE THE ROUND", row.rowData?.roundUp)}</span>
                        </Tooltip>
                      </span>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default Row;
