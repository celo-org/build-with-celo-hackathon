import * as React from "react";
import { ethers } from "ethers";
import Row from "../custom/Row";
import utils from "../custom/utils";
import BigNumber from "bignumber.js";
import BasicModal from "../BasicModal";
import { useCelo } from "@celo/react-celo";
import BasicAlerts from "../custom/BasicAlert";
import { tableData } from "../custom/tableData";
import { sendtransaction } from "../runContract";
import { contractsData } from "../loadContractFictures";
import { OptionProps, BandTableProps } from "../propsTypes";
import FloatingActionButtonZoom from "../FloatingActionButtonZoom";
import styles from "../../styles/local/components/write.module.css";
import TransactionProgressBar from "../customProgress/TransactionProgress";
import { Button, Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Modal, TextField } from "@mui/material";

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

const defaultOption : OptionProps = {
  functionName: "",
  contractName: "",
  params: [],
  msgValue: new BigNumber(0),
  hasValue: false
}

export default function BandTable(props: BandTableProps): JSX.Element {
  const [transModalVisible, settransModalVisible] = React.useState(false);
  const [inProgress, setProgress] = React.useState(0);
  const [isFetching_, setFetching] = React.useState(false);
  const [funcValue, setfuncValue] = React.useState(0);
  const [result, setresult] = React.useState(null);
  const [value, setvalue] = React.useState(0);
  const [poolList, setPoolList] = React.useState(MOCK_POOlLIST);
  const [filtered, setfiltered] = React.useState(Array<any>);
  const [status, setstatus] = React.useState("");
  const [options, setoptions] = React.useState(defaultOption);
  const [modalVisible, setModalVisible] = React.useState(false);
  const [modalPop, popmodal] = React.useState(false);
  const [name, setname] = React.useState("open");

  const { address } = useCelo();
  const { setmessage, message } = props;
  const { style, emptyList, useStyles, fetchProxy, isIncluded } = utils();

  const setName = (value: string) => setname(value);
  const popModal = (value: boolean) => popmodal(value);
  const setValue = (value: number) => setvalue(value);
  const setResult = (value: any) => setresult(value);
  const setStatus = (value: string) => setstatus(value);
  const setOptions = (value: any) => setoptions(value);
  const setFiltered = (value: Array<any>) => setfiltered(value);
  const setInProgress = (value: number) => setProgress(value);
  const setIsFetching = (value: boolean) => setFetching(value);
  const setFuncValue = (value: number) => setfuncValue(value);
  const pushToAddressList = (value: Array<any>) => setPoolList(value);
  const setIsModalVisible = (value: boolean) => setModalVisible(value);
  const setTransModalVisible = (value: boolean) => settransModalVisible(value);

  const emList = emptyList();
  const { sendTransaction } = sendtransaction();

  function setFuncStatus(option: OptionProps) {
    setStatus("public");
    setIsModalVisible(true);
    setOptions({...option });
  }

  // Fetch Pool
  async function fetchInfo(functionName: string) {
    let res: boolean;
    if (!address) return null;

    const options: OptionProps = {
      contractName: 'digesu',
      functionName: functionName,
    };

    setmessage("Updating pool");
    const result = await sendTransaction(options);
    console.log("RESULT", result);
    res = true;
    pushToAddressList({ ...result });
    setFiltered(result?.targetJoined);
    if (functionName === "getPools") {
      let val = new BigNumber(0);
      for (let i = 0; i < result?._p?.length; i++) {
        let y = new BigNumber(0);
        // const y = new BigNumber(ethers.utils.parseUnits(result[0][i]?.amount.toString(), 'wei'));
        val = val.plus(y);
      }
      setValue(val.toNumber());
    }
    return res;
  }

  const refresh = async () =>
    await fetchInfo("getPools").then(res => {
      if (res) setIsFetching(false);
    });

  React.useEffect(() => {
    if(!address) return;
    async function _refresh() {
      await refresh();
    }
    _refresh();
  }, [address]);

  // Broadcast transaction to the network
  async function handleTransaction() {
    setIsModalVisible(false);
    setTransModalVisible(true);
    
    switch (options.functionName) {
      case "payback":
        const msgValue = BigNumber(funcValue);
        setOptions({ ...options, msgValue: ethers.utils.parseEther(String(msgValue.toNumber())) });
        break;

      case "absorb":
        setOptions({ ...options, msgValue: ethers.utils.parseEther(funcValue.toString()) });
        break;

      default:
        break;
    }
    const done = await sendTransaction(options);
    setTransModalVisible(done);
    if (done) {
      await refresh();
    }
  }

  const rowClosed = poolList.map(
    (item, key) =>
      item.uints.quorum.toNumber() === item.mems.length &&
      tableData({
        id: key,
        isIncluded: isIncluded(item.mems, address),
        item: item,
        setOptions: setOptions,
        setFuncStatus: setFuncStatus,
        setStatusPrivate: setFuncStatus,
        fetchProxy: fetchProxy,
        result: result,
        setIsModalVisible: setIsModalVisible,
        setResult: setResult,
      })
  );

  const rowOpen = poolList && poolList.map(
    (item, key) =>
      item.uints.quorum.toNumber() > item.mems.length &&
      tableData({
        id: key,
        isIncluded: isIncluded(item.mems, address),
        item: item,
        setOptions: setOptions,
        setFuncStatus: setFuncStatus,
        setStatusPrivate: setFuncStatus,
        account: address,
        fetchProxy: fetchProxy,
        result: result,
        setIsModalVisible: setIsModalVisible,
        setResult: setResult,
      })
  );

  return (
    <div className="flex flex-col justify-center ml-8 mr-8">
      <FloatingActionButtonZoom setName={setName} popModal={popModal} refresh={refresh} value={value} isFetching={isFetching_} setIsFetching={setIsFetching} />

      <div className={styles.basicModal}>
        <BasicModal popModal={popModal} modalPop={modalPop} refresh={refresh} fetchInfo={fetchInfo} setMessage={setmessage} setTransModalVisible={setTransModalVisible} setInProgress={setInProgress} />
      </div>
      <BasicAlerts message={String(message)} open={false} setOpen={open} />

      <TableContainer component={Paper} sx={{ width: "100%", height: "100vh", overflow: "auto" }}>
        <Table aria-label="collapsible table" sx={{ width: "100%", maxHeight: 440 }}>
          <TableHead>
            <TableRow>
              <TableCell className="bg-orange-500 text-white">View profile</TableCell>
              <TableCell className="bg-orange-500 text-white">ID</TableCell>
              <TableCell className="bg-orange-500 text-white" align="center">
                No Of Contributors
              </TableCell>
              <TableCell className="bg-orange-500 text-white" align="center">
                Unit Pool Amount {": $CELO"}
              </TableCell>
              <TableCell className="bg-orange-500 text-white" align="center">
                Creator's Address
              </TableCell>
              <TableCell className="bg-orange-500 text-white" align="center">
                Collateral Ratio
              </TableCell>
              <TableCell className="bg-orange-500 text-white" align="center">
                Explore (Click)
              </TableCell>
              <TableCell className="bg-orange-500 text-white" align="center">
                Membership
              </TableCell>
              <TableCell className="bg-orange-500 text-white" align="center">
                Current Participants
              </TableCell>
              <TableCell className="bg-orange-500 text-white" align="center">
                Pool Type
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rowOpen && name === "open" ? rowOpen.map((item, key) => item && <Row key={key} row={item} />) : null}
            {rowClosed && name === "closed" ? rowClosed.map((item, key) => item && <Row key={key} row={item} />) : null}
            {poolList.length === 0 &&
              emptyList().map((empty, key) => (
                <TableRow key={key + 1}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item, i) => (
                    <TableCell align="center" key={i}>
                      {empty.value}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Band Selector */}
      {
        <Modal
          open={modalVisible}
          onClose={() => {
            setIsModalVisible(false);
          }}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <div className="flex justify-around">
              <Button onClick={handleTransaction}>Transact</Button>
            </div>
            {options.hasValue && (
              <form noValidate autoComplete="off" action="">
                <TextField onChange={e => setFuncValue(Number(e.target.value))} sx={useStyles.field} placeholder={"uint256"} label="Value" type="number" fullWidth required />
                <TextField onChange={e => setFuncValue(Number(e.target.value))} sx={useStyles.field} label="Community type:" placeholder={"PUBLIC"} type="text" fullWidth disabled />
              </form>
            )}
          </Box>
        </Modal>
      }

      {/* Transaction progress bar */}
      {
        <Modal
          open={transModalVisible}
          onClose={() => {
            setTransModalVisible(false);
          }}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <TransactionProgressBar inProgress={inProgress} />
          </Box>
        </Modal>
      }
    </div>
  );
}
