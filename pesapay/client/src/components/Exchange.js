import React, { useState } from "react";

import { parseUnits } from "ethers/lib/utils";


import AmountIn from "./AmountIn";
import AmountOut from "./AmountOut";
import Balance from "./Balance";
import styles from "../styles";

const Exchange = () => {
  const api = "https://api.exchangerate-api.com/v4/latest/USD";
  function getResults() {
    fetch(`${api}`)
        .then(toToken => {
            return toToken.json();
        }).then(displayResults);
}
function displayResults(currency) {
  // let fromRate = currency.rates["USD"];
  let toRate = currency.rates[toToken];
  const finalValue = (toRate * fromValue * intousd);
  setintocurrency(finalValue);
}

   const [fromValue, setFromValue] = useState("0");
  const [fromToken, setFromToken] = useState(parseInt((window.ethereum.chainId),16)); // initialFromToken
  const [toToken, setToToken] = useState("");
  const [intocurrency, setintocurrency] = useState("");
  // const [resetState, setResetState] = useState(false)
  const [intousd, setintousd] = useState("");

  const onFromValueChange = (value) => {
    const trimmedValue = value.trim();

    try {
      trimmedValue && parseUnits(value);
      setFromValue(value);
    } catch (e) {}
  };

  const onFromTokenChange = (value) => {
    setFromToken(value);
  };

  const intoUsdhandler = (value) => {
    setintousd(value);
  };
  //console.log(fromValue,fromToken,intousd,toToken)
  const onToTokenChange = (value) => {
    setToToken(value);
  };


getResults();
  return (
    <div className="flex flex-col w-full items-center">
      <div className="mb-8">
        <AmountIn
          value={fromValue}
          onChange={onFromValueChange}
          onSelect={onFromTokenChange}
          inUsd={intoUsdhandler}
          
        />
        <Balance  />
      </div>

      <div className="mb-8 w-[100%]">
        <AmountOut
           value={intocurrency}
           onSelect={onToTokenChange}
        />
        {/* <Balance  /> */}
      </div>

{ "" ? (
        <button
          disabled={""}
          onClick={""}
          className={`${
             "bg-site-pink text-white"
             
          } ${styles.actionButton}`}
        >
          {"Approve"}
        </button>):

        <button
          disabled={""}
          onClick={""}
          className={`${
             "bg-site-pink text-white" 
          } ${styles.actionButton}`}
        >
          {"Transaction"
           }
        </button>

          }
      
    </div>
  );
};

export default Exchange;
