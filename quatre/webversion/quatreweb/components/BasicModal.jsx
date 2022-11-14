import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import sendtransaction from "./apis.js";
import { TextField, Button } from "@material-ui/core";
import styles from "../styles/local/components/pools.module.css";
import { ethers } from "ethers";
import BigNumber from "bignumber.js";
import utils from "./custom/utils";
import { contractsData } from "./loadContractFictures/index";

export default function BasicModal(props) {
  const [isPublic, setIspublic] = React.useState(false);
  const [isPrivate, setIsprivate] = React.useState(false);
  const [amount, updateamount] = React.useState(0);
  const [functionName, setfunctionName] = React.useState("");
  const [quorum, updatequorum] = React.useState(0);
  const [durationInDays, setDuration] = React.useState(0);
  const [colFactor, setColFactor] = React.useState(0);
  // const [modalPop, popmodal] = React.useState(false);
  const [addressList, setAddress] = React.useState([]);
  const [isChildModalOpen, setChildModal] = React.useState(false);

  const { refresh, modalPop, popModal, fetchInfo, setMessage, setInProgress, setTransModalVisible } = props;

  const setIsPublic = value => setIspublic(value);
  const setIsPrivate = value => setIsprivate(value);
  const updateAmount = value => updateamount(value);
  const setFunctionName = value => setfunctionName(value);
  const updateQuorum = value => updatequorum(value);
  const updateDurationInDays = value => setDuration(value);
  const updateColFactor = value => setColFactor(value);
  const setIsChildModal = value => setChildModal(value);
  const pushToAddressList = value => setAddress(value);

  const { sendTransaction } = sendtransaction();
  // const { initialised} = useCelo();
  const { style, useStyles, getAbi } = utils();


  const btnstyle = { margin: "8px 0", background: "var(--orange)", color: "var(--grey)", border: "none" };

  const handlePublicClose = () => setIsPublic(false);
  const handlePrivateClose = () => setIsPrivate(false);

  function toggleIsPublic() {
    setIsPublic(true);
    setIsChildModal(false);
    setFunctionName("launchABandNonStrictMode");
  }

  function toggleIsPrivate() {
    setIsPrivate(true);
    setIsChildModal(false);
    setFunctionName("launchABandStrictMode");
  }

  const handleChange = event => {
    if (event.target.value?.length === 42) {
      pushToAddressList([...addressList, event.target.value]);
    }
  };

  const displayFunction = React.useMemo(() => {
    const filt = contractsData.digesu.abi.filter(method => method["type"] === "function");
    return filt?.filter(method => method.name === functionName);
  }, [functionName]);

  async function handlePublicTransaction() {
    const fee = BigNumber(0.0022);
    const amt = BigNumber(amount);
    const total = amt.plus(fee);

    const options = {
      functionName: "createPublicPool",
      contractName: "digesu",
      params: {
        amount: ethers.utils.parseEther(String(amt.toNumber())),
        quorum: quorum,
        colFactor: colFactor,
        durationInDays: durationInDays,
        asset: contractsData.token.address
      },
      msgValue: ethers.utils.parseEther(String(total.toNumber()))
    };
    setTransModalVisible(true);
    await sendTransaction(options, setMessage, setInProgress).then(() => setTimeout(() => fetchInfo("getPools"), 1000));
    setTransModalVisible(false);
    setIsPublic(false);
    popModal(false);
  }

  async function handlePrivateTransaction() {
    if (!initialised) return null;
    if (addressList.length === 0) return null;
    const fee = BigNumber(0.0022);
    const amt = BigNumber(amount);
    const total = amt.plus(fee);
    const options = {
      functionName: 'createPrivatePool',
      contractName: 'digesu',
      params: {
        amount: ethers.utils.parseEther(String(amt.toNumber())),
        participants: addressList,
        colFactor: colFactor,
        durationInDays: durationInDays
      },
      msgValue: ethers.utils.parseEther(String(total.toNumber()))
    };
    setTransModalVisible(true);
    await sendTransaction(options, setMessage, setInProgress).then(r => setTimeout(() => fetchInfo("getPools"), 1000));
    setTransModalVisible(false);
    setIsPrivate(false);
    popModal(false);
  }

  return (
    <React.Fragment>
      {
        <Modal
          open={modalPop}
          onClose={() => {
            popModal(false);
            pushToAddressList([]);
          }}
          aria-labelledby="child-modal-title"
          aria-describedby="child-modal-description"
        >
          <Box sx={{ ...style, width: 200 }}>
            <div className="flex justify-around">
              <Button onClick={toggleIsPublic}>Public</Button>
              <Button onClick={toggleIsPrivate}>Private</Button>
            </div>
          </Box>
        </Modal>
      }
      {
        <Modal hideBackdrop open={isPublic} onClose={handlePublicClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
          <Box sx={{ ...style, width: 400 }}>
            <div className="ml-auto">
              <Button onClick={isPublic ? handlePublicClose : handlePrivateClose} className="text-orange-600 cursor-pointer ml-auto text-2xl">
                X
              </Button>
            </div>
            <form noValidate autoComplete="off" action="">
              {displayFunction && (
                <TextField
                  onChange={e => {
                    updateQuorum(e.target.value);
                  }}
                  className={useStyles.field}
                  label='"How may members to expect?"'
                  placeholder={displayFunction[0]?.inputs[0]?.type || null}
                  type="number"
                  fullWidth
                  required
                />
              )}
              {displayFunction && (
                <TextField
                  onChange={e => {
                    updateAmount(e.target.value);
                  }}
                  className={useStyles.field}
                  label="Unit contribution:"
                  placeholder={displayFunction[0]?.inputs[1]?.type || null}
                  type="number"
                  fullWidth
                  required
                />
              )}
              {displayFunction && <TextField onChange={e => updateDurationInDays(e.target.value)} className={useStyles.field} label="Duration (In days): " placeholder={displayFunction[0]?.inputs[2]?.type || null} type="number" fullWidth required />}
              {displayFunction && <TextField onChange={e => updateColFactor(e.target.value)} className={useStyles.field} label="Collateral multiplier" placeholder={displayFunction[0]?.inputs[3]?.type || null} type="number" fullWidth required />}
              <input label="Community type:" placeholder="PUBLIC" type="text" disabled />
            </form>
            <Button onClick={handlePublicTransaction} color="inherit" variant="contained" style={btnstyle} fullWidth>
              Transact
            </Button>
          </Box>
        </Modal>
      }
      {
        <Modal hideBackdrop open={isPrivate} onClose={handlePrivateClose} aria-labelledby="child-modal-title" aria-describedby="child-modal-description">
          <Box sx={{ ...style, width: 400 }}>
            <div className="ml-auto">
              <Button className="text-orange-400 cursor-pointer ml-auto">Address list:</Button>
              <Button onClick={isPublic ? handlePublicClose : handlePrivateClose} className="text-orange-600 cursor-pointer ml-auto text-2xl">
                X
              </Button>
              <Button className={styles.reset} onClick={() => pushToAddressList([])}>
                Clear list
              </Button>
              <div className="h-10 overflow-auto ml-2 p-2 mb-2">
                {addressList?.map((item, id) => (
                  <li className="text-orange-500 text-sm" key={id}>
                    {item}
                  </li>
                ))}
              </div>
              <TextField label="Address of community members (each):" onChange={handleChange} placeholder={"address"} type="text" fullWidth required />
            </div>
            <form noValidate autoComplete="off" action="">
              {displayFunction && <TextField onChange={e => updateAmount(e.target.value)} label="Unit contribution:" placeholder={displayFunction[0]?.inputs[1]?.type} type="number" fullWidth required />}
              {displayFunction && <TextField onChange={e => updateDurationInDays(e.target.value)} label="Duration (In days): " placeholder={displayFunction[0]?.inputs[2]?.type} type="number" fullWidth required />}
              {displayFunction && <TextField onChange={e => updateColFactor(e.target.value)} label="Collateral multiplier" placeholder={displayFunction[0]?.inputs[3]?.type} type="number" fullWidth required />}
              <input label="Community type:" placeholder="PRIVATE" type="text" disabled />
              <Button onClick={handlePrivateTransaction} color="primary" variant="contained" style={btnstyle} fullWidth>
                Transact
              </Button>
            </form>
          </Box>
        </Modal>
      }
    </React.Fragment>
  );
}
