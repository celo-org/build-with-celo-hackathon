import React from "react";
import { useEthers } from "@usedapp/core";

import styles from "./styles";

import { uniswapLogo } from "./assets";
import { Exchange, Loader, WalletButton, Networks } from "./components";
//import Network from "./components/network,js";

const App = () => {
  const { account } = useEthers();


  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <header className={styles.header}>
          <img
            src={uniswapLogo}
            alt="uniswap-logo"
            className="w-16 h-16 object-contain"
          />
          {account ? (
            <><div className={styles.Rheader}>
                    <Networks />
                    <WalletButton/>
                    </div> 
            </>
                ) : (
                <WalletButton />
                )
          }
          
        </header>

        <div className={styles.exchangeContainer}>
          <h1 className={styles.headTitle}>CashOut 2.0</h1>
          <p className={styles.subTitle}>Sell your Cryptos in seconds</p>

          <div className={styles.exchangeBoxWrapper}>
            <div className={styles.exchangeBox}>
              <div className="pink_gradient" />
              <div className={styles.exchange}>
                {account ? (
                    <Exchange/>
                ) : (
                  <Loader title="Please connect your wallet" />
                )}
              </div>
              <div className="blue_gradient" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
