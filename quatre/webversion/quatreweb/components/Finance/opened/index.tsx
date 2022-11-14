import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableFooter from '@mui/material/TableFooter';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import { PoolListContent, SinglePool } from "../../propsTypes";
import utilities from "../../custom/utils"
import { useCelo } from "@celo/react-celo";
import BigNumber from "bignumber.js";
import { sendtransaction } from "../../runContract";

interface BandTableProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: BandTableProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };


  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(
  id: number,
  contributor: number,
  unit: number,
  collateral: number,
  explore: JSX.Element,
  membership: boolean,
  currentParticipants: number,
  poolType: string
) {
  return { 
    id,
    contributor,
    unit,
    collateral,
    explore,
    membership,
    currentParticipants,
    poolType
   };
}

function generateRowdata (pool: PoolListContent, callback:Function) {
  const { isIncluded } = utilities();
  const { address } = useCelo();
  return pool.map((item, key) => item.uints.quorum.toNumber() > item.mems.length && 
    createData(
      key,
      item.mems.length,
      item.uint256s.unit.toNumber(),
      item.uints.ccr.toNumber(),
      <Button
        onClick={async() => await callback()}
      >Join</Button>,
      isIncluded(item.mems, address),
      item.mems.length,
      item.uints.mode === 1 ? "Private" : "Public",
    )
  )
}

const ZERO_ADDR = `0x${"0".repeat(40)}`;

const MOCK_POOlLIST = [
  {
    uints: {
      mode: 0,
      quorum: BigNumber(0),
      selector: BigNumber(0),
      ccr: BigNumber(0),
      duration: BigNumber(0),
      0: 0,
      1: BigNumber(0),
      2: BigNumber(0),
      3: BigNumber(0),
      4: BigNumber(0),
    },
    uint256s: {
      unit: BigNumber(0),
      receivable: BigNumber(0),
      currentPool: BigNumber(0),
      0: BigNumber(0),
      1: BigNumber(0),
      2: BigNumber(0),
    },
    addrs: { asset: ZERO_ADDR, lastPaid: ZERO_ADDR, 0: ZERO_ADDR, 1: ZERO_ADDR,},
    mems: [ZERO_ADDR],
    allGh: BigNumber(0),
    0: {
      mode: 0,
      quorum: BigNumber(0),
      selector: BigNumber(0),
      ccr: BigNumber(0),
      duration: BigNumber(0),
      0: 0,
      1: BigNumber(0),
      2: BigNumber(0),
      3: BigNumber(0),
      4: BigNumber(0),
    },
    1: {
      unit: BigNumber(0),
      receivable: BigNumber(0),
      currentPool: BigNumber(0),
      0: BigNumber(0),
      1: BigNumber(0),
      2: BigNumber(0),
    },
    2: { asset: ZERO_ADDR, lastPaid: ZERO_ADDR, 0: ZERO_ADDR, 1: ZERO_ADDR },
    3: [ZERO_ADDR],
    4: BigNumber(0),
  },
]


export default function BandTable() {
  const [page, setPage] = React.useState(0);
  const [poolList, setPoolList] = React.useState(MOCK_POOlLIST) 
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const { sendTransaction} = sendtransaction();

  const row = generateRowdata(poolList, );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.calories}
              </TableCell>
              <TableCell style={{ width: 160 }} align="right">
                {row.fat}
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}


















// const rows = [
//   createData('Cupcake', 305, 3.7),
//   createData('Donut', 452, 25.0),
//   createData('Eclair', 262, 16.0),
//   createData('Frozen yoghurt', 159, 6.0),
//   createData('Gingerbread', 356, 16.0),
//   createData('Honeycomb', 408, 3.2),
//   createData('Ice cream sandwich', 237, 9.0),
//   createData('Jelly Bean', 375, 0.0),
//   createData('KitKat', 518, 26.0),
//   createData('Lollipop', 392, 0.2),
//   createData('Marshmallow', 318, 0),
//   createData('Nougat', 360, 19.0),
//   createData('Oreo', 437, 18.0),
// ].sort((a, b) => (a.calories < b.calories ? -1 : 1));

