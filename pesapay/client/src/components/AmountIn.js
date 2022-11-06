import React, { useState, useRef } from "react";
import {handleNetworkSwitch} from "../utils/switchnetwork";
import { chevronDown } from "../assets";
import { useOnClickOutside } from "../utils";
import styles from "../styles";
import tokens from "../utils/cryptoname.json";
import { handlePriceFeed } from "../utils/pricefeed";
const AmountIn = ({ value, onChange, onSelect, inUsd }) => {
  const [showList, setShowList] = useState(false);
  const [activeCurrency, setActiveCurrency] = useState("Select");

  const ref = useRef()

  useOnClickOutside(ref, () => setShowList(false))



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

      <div className="relative" onClick={() => setShowList(!showList)}>
        <button className={styles.currencyButton}>
          {activeCurrency}
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
            {tokens.map(({token, tokenName,chainid,pricefeed}, index) => (
            <li
              key={index}
              className={`${styles.currencyListItem} ${
                activeCurrency === tokenName ? "bg-site-dim2" : ""
              } cursor-pointer`}
              onClick={async() => {
                if (typeof onSelect === "function") onSelect(chainid);
                if(pricefeed === "0x9ae96129ed8FE0C707D6eeBa7b90bB1e139e543e"){
                  const x = await handlePriceFeed(pricefeed);
                  const y = await handlePriceFeed("0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419");
                  const z = (x*10**-10)*y
                  inUsd(z)
                }else{
                const z = await handlePriceFeed(pricefeed);
                inUsd(z)
                }
                
                if(parseInt((window.ethereum.chainId),16) != chainid){
                  handleNetworkSwitch(chainid)
                  setActiveCurrency(tokenName);                  
                }else{setActiveCurrency((tokenName))}
                
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
