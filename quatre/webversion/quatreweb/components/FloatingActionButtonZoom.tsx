import * as React from "react";
import { Button, Table, TableCell, TableRow, TableHead } from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";


const pages = [
  { id: 0, value: "Create band" },
  { id: 1, value: "Open" },
  { id: 2, value: "Closed" },
  { id: 3, value: "Refresh" },
  { id: 4, value: "TVL" }
];

interface FloatingActionButtonPop {
  setName: Function;
  popModal: Function;
  refresh: Function;
  value: number;
  isFetching: boolean;
  setIsFetching: Function;
}
const FloatingActionButtonZoom = (props: FloatingActionButtonPop) => {
  const { setName, popModal, refresh, value, isFetching, setIsFetching } = props;

  return(
  <Table aria-label="collapsible table" sx={{ width: "100%" }}>
    <TableHead>
      <TableRow>
        <TableCell className="childNav bg-orange-500 border-0 border-gray-300 mx-auto p-1  justify-center  " align="center">
          <Button
            onClick={() => {
              setName(pages[1].value.toLowerCase());
              popModal(true);
            }}
            style={{ color: "var(--dark-mode2)" }}
          >
            {pages[0].value}
          </Button>
        </TableCell>

        <TableCell
          sx={{
            border: "0.1em solid rgb(236, 129, 122, 0.2)",
            borderRadius: "4px",
            flexGrow: 0
          }}
          className="childNav bg-orange-500 border-0 border-gray-300 mx-auto p-1  justify-center "
          align="center"
        >
          <Button variant="text" style={{ color: "var(--dark-mode2)" }} onClick={() => setName(pages[1].value.toLowerCase())}>
            {pages[1].value}
          </Button>
        </TableCell>

        <TableCell
          sx={{
            border: "0.1em solid rgb(236, 129, 122, 0.2)",
            borderRadius: "4px",
            flexGrow: 0
          }}
          className="childNav  bg-orange-500 border-0 border-gray-300 mx-auto p-1  justify-center  "
          align="center"
        >
          <Button variant="text" onClick={() => setName(pages[2].value.toLowerCase())} style={{ color: "var(--dark-mode2)" }} className="text-white">
            {pages[2].value}
          </Button>
        </TableCell>

        <TableCell
          sx={{
            border: "0.1em solid rgb(236, 129, 122, 0.2)",
            borderRadius: "4px",
            flexGrow: 0
          }}
          className="childNav bg-orange-500 border-0 border-gray-300 mx-auto p-1  justify-center  "
          align="center"
        >
          <Button
            // disabled={isFetching}
            variant="text"
            onClick={async () => {
              setIsFetching(true);
              await refresh();
            }}
            style={{ color: "var(--dark-mode2)" }}
            className="cursor-pointer"
          >
            <RefreshIcon className="h-5" />
            {pages[3].value}
          </Button>
        </TableCell>

        <TableCell
          sx={{
            border: "0.1em solid rgb(236, 129, 122, 0.2)",
            borderRadius: "4px",
            flexGrow: 0
          }}
          // style={{color: 'var(--dark-mode2)'}}
          className="childNav bg-orange-500 border-0 border-gray-300 mx-auto p-1  justify-center  "
          align="center"
        >
          <Button variant="text" style={{ color: "var(--dark-mode2)" }} className="text-white">
            {pages[4].value}
            {": "}
            {value}
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  </Table>
)}

export default FloatingActionButtonZoom;
