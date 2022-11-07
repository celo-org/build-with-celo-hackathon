import React, { useState, useRef } from "react";
import {handleNetworkSwitch} from "../utils/switchnetwork";
import { chevronDown } from "../assets";
import { useOnClickOutside } from "../utils";
import styles from "../styles";
import chains from "../utils/cryptoname.json";
//import { handlePriceFeed } from "../utils/pricefeed";
const Networks = ({ onSelect }) => {
  const [showList, setShowList] = useState(false);
  const [activeChain, setActiveChain] = useState("Select");

  const ref = useRef()

  useOnClickOutside(ref, () => setShowList(false))

  return (

      <div className="relative" onClick={() => setShowList(!showList)}>
        <button className={styles.currencyButton}>
          {activeChain}
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
            {chains.map(({chainName,chainid}, index) => (
            <li
              key={index}
              className={`${styles.currencyListItem} ${
                activeChain === chainName ? "bg-site-dim2" : ""
              } cursor-pointer`}
              onClick={async() => {
                if (typeof onSelect === "function") onSelect(chainid);
                                
                if(parseInt((window.ethereum.chainId),16) != chainid){
                  handleNetworkSwitch(chainid)
                  setActiveChain(chainName);                  
                }else{setActiveChain((chainName))}
                
                setShowList(false);
              }}
            >
              {chainName}
            </li>
          ))}
            
          </ul>
        )}
      </div>
    
  );
};

export default Networks;