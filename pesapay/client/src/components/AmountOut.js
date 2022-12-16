import React, { useState, useRef } from "react";

import { chevronDown } from "../assets";
import { useOnClickOutside } from "../utils";
import styles from "../styles";
import currencies from "../utils/currencyname.json";
const AmountOut = ({ onSelect, value, cPrefix }) => {
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
        className={styles.amountInput}
        disabled
      />

      <div className="relative" onClick={() => setShowList(!showList)}>
        <button className={styles.currencyButton}>
          {activeCurrency}
          <img
            src={chevronDown}
            alt="cheveron-down"
            className={`w-4 h-4 object-contain ml-2 ${showList ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        {showList && (
          <ul ref={ref} className={styles.currencyList}>
            {currencies.map(({currency, currencyName, phonePrefix}, index) => (
              <li
                key={index}
                className={styles.currencyListItem}
                onClick={() => {
                  if (typeof onSelect === "function") onSelect(currency);
                  setActiveCurrency(currencyName);
                  cPrefix(phonePrefix);
                  setShowList(false);
                }}
              >
                {currencyName}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AmountOut;
