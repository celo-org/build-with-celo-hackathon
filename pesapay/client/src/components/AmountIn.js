import React, { useState, useRef,useEffect } from "react";
//import {handleNetworkSwitch} from "../utils/switchnetwork";
import { chevronDown } from "../assets";
import { useOnClickOutside } from "../utils";
import styles from "../styles";
import tokens from "../utils/tokenname.json";
import { handlePriceFeed } from "../utils/pricefeed";
const AmountIn = ({ value, onChange, onChain, inUsd, onToken, taddress }) => {
  const [showList, setShowList] = useState(false);
  const [activeToken, setActiveToken] = useState("Select");
  const [activeChainId, setactiveChainId] = useState("");
  
  const ref = useRef();
  useOnClickOutside(ref, () => setShowList(false))

  const chainid=()=>{
    const chainid =  parseInt((window.ethereum.chainId),16);
    setactiveChainId(chainid)
    setShowList(!showList)
  }
  // useEffect(() => {
  //   chainid()
  // }, []);  
  //console.log(activeChainId);
  return (
    <div className={styles.amountContainer}>
      <input
        placeholder="0.0"
        type="number"
        value={value}
        disabled={false}
        onChange={(e) => typeof onChange === "function" && onChange(e.target.value)}
        className={styles.amountInput}
      />

      <div className="relative" onClick={() =>  chainid()}>
        <button className={styles.currencyButton}>
          {activeToken}
          <img
            src={chevronDown}
            alt="cheveron-down"
            className={`w-4 h-4 object-contain ml-2 ${
              showList ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>

        {showList && (
          <ul ref={ref} className={styles.currencyList}>
            {tokens[activeChainId].map(({ tokenName,pricefeed,add}, index) => (
            <li
              key={index}
              className={`${styles.currencyListItem} ${
                activeToken === tokenName ? "bg-site-dim2" : ""
              } cursor-pointer`}
              onClick={async() => {
                setActiveToken(tokenName);
                onToken(tokenName); 
                taddress(add)
                if (typeof onSelect === "function") onChain(activeChainId);
                if(pricefeed === "0x9ae96129ed8FE0C707D6eeBa7b90bB1e139e543e"){
                  const x = await handlePriceFeed(pricefeed);
                  const y = await handlePriceFeed("0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419");
                  const z = (x*10**-10)*y
                  inUsd(z)
                  console.log(z)
                }else{
                const z = await handlePriceFeed(pricefeed);
                inUsd(z)
                console.log(z)
                }
                
                // if(parseInt((window.ethereum.chainId),16) != chainid){
                //   handleNetworkSwitch(chainid)
                //  setActiveToken(tokenName);                  
                // }else{setActiveToken((tokenName))}
                
                setShowList(false);
              }}
            >
              {tokenName}
            </li>
          ))}
            
          </ul>
        )}
      </div>
    </div>
  );
};

export default AmountIn;
