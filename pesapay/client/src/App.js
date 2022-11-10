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
          {/* <img
            src={uniswapLogo}
            alt="uniswap-logo"
            className="w-16 h-16 object-contain"
          /> */}
          <svg width="102" height="30" viewBox="0 0 85 25" fill="none"><path d="M15.1316 17.1053C19.1284 17.1053 22.3684 13.8653 22.3684 9.86842C22.3684 5.87158 19.1284 2.63158 15.1316 2.63158C11.1348 2.63158 7.89476 5.87158 7.89476 9.86842C7.89476 13.8653 11.1348 17.1053 15.1316 17.1053ZM15.1316 19.7368C9.6816 19.7368 5.26318 15.3184 5.26318 9.86842C5.26318 4.41842 9.6816 0 15.1316 0C20.5816 0 25 4.41842 25 9.86842C25 15.3184 20.5816 19.7368 15.1316 19.7368Z" fill="#35D07F"></path><path d="M9.86842 22.3684C13.8653 22.3684 17.1053 19.1284 17.1053 15.1316C17.1053 11.1348 13.8653 7.89476 9.86842 7.89476C5.87158 7.89476 2.63158 11.1348 2.63158 15.1316C2.63158 19.1284 5.87158 22.3684 9.86842 22.3684ZM9.86842 25C4.41842 25 0 20.5816 0 15.1316C0 9.6816 4.41842 5.26318 9.86842 5.26318C15.3184 5.26318 19.7368 9.6816 19.7368 15.1316C19.7368 20.5816 15.3184 25 9.86842 25Z" fill="#FBCC5C"></path><path d="M15.4553 19.7315C16.1392 18.903 16.6292 17.932 16.89 16.8899C17.9321 16.6294 18.9029 16.1391 19.7316 15.4554C19.6937 16.6623 19.4339 17.852 18.9647 18.9646C17.8521 19.4338 16.6624 19.6936 15.4553 19.7315ZM8.11026 8.10989C7.06815 8.37042 6.09736 8.86068 5.26868 9.54436C5.30657 8.33752 5.56631 7.14778 6.03552 6.03515C7.14815 5.56594 8.33789 5.30621 9.54473 5.26831C8.86105 6.09699 8.37078 7.06778 8.11026 8.10989Z" fill="#5EA33B"></path></svg>
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
