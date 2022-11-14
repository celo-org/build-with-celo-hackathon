import { CSSProperties, useEffect } from "react";
import { useState } from "react";
// import { useMoralisDapp } from "./MoralisDappProvider/MoralisDappProvider";
import styles from "../styles/local/components/address.module.css";
import { getEllipsisTxt } from "./helpers/formatters";
import { Skeleton } from "antd";
import Blockie from "./Blockie";
import { useCelo } from "@celo/react-celo";

interface AddressProps {
  address?: string;
  style?: CSSProperties;
  styleAvatarLeft?: CSSProperties;
  styleAvatarRight?: CSSProperties;
  styleCopy?: CSSProperties;
  avatar?: string;
  copyable?: boolean;
  display?: boolean;
  size?: number;

}
const Address = (props: AddressProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const { address } = useCelo();

  const { 
    style,
    styleAvatarLeft,
    styleAvatarRight,
    styleCopy,
    avatar,
    copyable,
    display,
    size } = props;

  // useEffect(() => {
  //   if(isClicked) setTimeout(() => {

  //   }, 6000)
  // }, [isClicked]);


  const Copy = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="26"
      height="26"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="#1780FF"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ cursor: "pointer"}}
      onClick={() => {
        navigator.clipboard.writeText(String(address));
        setIsClicked(true);
        setTimeout(() => { setIsClicked(false)}, 6000);
      }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 3v4a1 1 0 0 0 1 1h4" />
      <path d="M18 17h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h4l5 5v7a2 2 0 0 1 -2 2z" />
      <path d="M16 17v2a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-10a2 2 0 0 1 2 -2h2" />
      <title id="copy-address">Copy Address</title>
    </svg>
  );

  if (!address) {
    return (
      <Skeleton paragraph={{ rows: 1, width: "20%" }} title active />
    ) 
  } else {
    return (
      <button style={style || {display: "flex", background: 'none', gap: "1px", justifyContent: "center", alignItems: "center", fontSize: "18px", color: "blue"}}>
        <span style={styleAvatarLeft}>{avatar === "left" && <Blockie address={address} size={6} />}</span> 
        <a className={!copyable ? styles.disabled : styles.pointer} href={`https://testnet.bscscan.com/address/${address}`} rel="noreferrer" target="_blank">{props?.size ? getEllipsisTxt(address, props?.size) : address}</a>
        <span style={styleAvatarRight}>{avatar === "right" && <Blockie style={{background: 'none'}} address={address} size={6} />}</span>
        <span style={styleCopy}>{copyable && (isClicked ? display && <Check /> : props?.display && <Copy />)}</span>
      </button>
    );
  }
}

export default Address;

const Check = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="3"
    stroke="#21BF96"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M5 12l5 5l10 -10" />
    <title id="copied-address">Copied!</title>
  </svg>
);
// display={props?.display}