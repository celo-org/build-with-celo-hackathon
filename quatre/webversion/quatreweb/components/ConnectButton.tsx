import React from "react";
import { Button, Tooltip } from "@mui/material";
import { useCelo } from '@celo/react-celo';
// import { CeloTokenContract } from '@celo/contractkit/lib/base'

interface ConnectionProps {
  setPageRef: Function;
  setmessage: Function;
}

function ConnectButton(props: ConnectionProps) {
  const {setPageRef, setmessage} = props;
  const [isAuthenticating, setAuthenticating] = React.useState(false);
  const { connect, address, network, updateNetwork, initialised } = useCelo();

  // React.useEffect(() => {
  //   setAuthenticating(false);    
  // }, []);
  
  // when connected
  // async function getAccountSummary() {
  //   const accounts = await kit.contracts.getAccounts();
  //   console.log("account", accounts);
  //   return await accounts.getAccountSummary(address);
  // }

  // // For Perform Action i.e remembering user's info
  // async function transfer() {
  //   await performActions(async (kit:any) => {
  //     const cUSD = await kit.contracts.getStableToken();
  //     await cUSD.transfer('0x...', 10000).sendAndWaitForReceipt();
  //   });
  // }

  // async function transfer() {
  //   const kit = await getConnectedKit();
  //   const cUSD = await kit.contracts.getStableToken();
  //   await cUSD.transfer('0x...', 10000).sendAndWaitForReceipt();
  // }  

  {/**Connects user's wallet to this dapp */}
  async function handleClick() {
    let _isAuthenticating = !isAuthenticating;
    setAuthenticating(_isAuthenticating);
    let defaultPageTo = 0;
    try {
      if(initialised) {
        await connect()
        .then(async() => {
          defaultPageTo ++;
          await updateNetwork(network).then(() => {
            _isAuthenticating = false;
            setPageRef(defaultPageTo);
          })
        })
      }
      setAuthenticating(_isAuthenticating);
    } catch (error) {
      console.log(`Error: ${error}`);
    } 

  }

  return (
    <Tooltip title="Click to sign in with Metamask">
      <span>
        <Button variant="text" sx={{ border: "none" }} onClick={handleClick} disabled={isAuthenticating}>
          ConnectWallet
        </Button>
      </span>
    </Tooltip>
  );
}

export default ConnectButton;
