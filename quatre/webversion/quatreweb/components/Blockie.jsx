import Blockies from "react-blockies";
import { useCelo }from '@celo/react-celo'
// import { useMoralisDapp } from "./QuatreDappProvider/QuatreDappProvider";

/**
 * Shows a blockie image for the provided wallet address
 * @param {*} props
 * @returns <Blockies> JSX Elemenet
 */

function Blockie(props) {
  const { address } = useCelo();
  if ((!props.address && !props.currentWallet) || !address) return null;

  return (
    <Blockies
      seed={props.currentWallet ? address.toLowerCase() : props.address.toLowerCase()}
      className="identicon"
      {...props}
    />
  );
}

export default Blockie;
