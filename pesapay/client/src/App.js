import React from "react"
import { useEthers } from "@usedapp/core"
import { ToastContainer } from "react-toastify"
import styles from "./styles"
import { Logo } from "./assets"
import { Exchange, Loader, WalletButton, Networks, History } from "./components"

const App = () => {
  const { account } = useEthers()
  const caddr = "0x11d66BCaEA0C45dc3a7090822b8DcfA20AB1E767"

  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <header className={styles.header}>
          <img
            src={Logo}
            alt='CashOut-logo'
            className='w-50 h-20 object-contain'
          />
          {account ? (
            <>
              <div className={styles.Rheader}>
                <Networks />
                <WalletButton />
                <History
                  address={"0xdB01d94217308046a792D864b16A35837aa52B86"}
                  chainId={80001}
                  caddress={caddr}
                />
              </div>
            </>
          ) : (
            <WalletButton />
          )}
        </header>

        <div className={styles.exchangeContainer}>
          <h1 className={styles.headTitle}>CashOut 2.0</h1>
          <p className={styles.subTitle}>Sell your Cryptos in seconds</p>

          <div className={styles.exchangeBoxWrapper}>
            <div className={styles.exchangeBox}>
              <div className='blue_gradient' />
              <div className={styles.exchange}>
                {account ? (
                  <>
                    <Exchange />
                  </>
                ) : (
                  <Loader title='Please connect your wallet' />
                )}
              </div>
              <div className='blue_gradient' />
            </div>
          </div>
        </div>
        <ToastContainer
          position='top-left'
          autoClose={5000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme='dark'
        />
      </div>
    </div>
  )
}

export default App
