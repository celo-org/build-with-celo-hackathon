import { useRef, useEffect, useCallback, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './donate.module.scss'
import walletIcon from '../../assets/wallet-2.svg'
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useContractRead } from 'wagmi'
import { useContractWrite, useWaitForTransaction } from 'wagmi'
import Succour_abi from "../../abi/abi.json"
import { ethers } from 'ethers'
import ERC20_ABI from "../../abi/ERC20.json"
import { useRouter } from 'next/router'

interface IProps {
     showModal: any;
     setShowModal: any;
}

const DonateModal = ({ showModal, setShowModal } : IProps) => {
  const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"
  const cUSDaddress = "0x4D3742f7d4AE2Ac3619c413E75976A9c7067b70E";
  const [depositamount, setDepositamount] = useState("");

  const { address } = useAccount();
  const route = useRouter();

       const modalRef = useRef<any | any>();
      
      const animation = useSpring({
        config: {
          duration: 300
        }, 
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(100%)`
      })

      const closeModal = (e :any) => {
         if(modalRef.current === e.target) {
          setShowModal(false)
         }
      }

      const keyPress = useCallback((e :any) => {
        if(e.key === 'Escape' && showModal) {
          setShowModal(false)
        }
      }, [setShowModal, showModal])

      useEffect(() => {
          document.addEventListener('keydown', keyPress);
          return () => document.removeEventListener('keydown', keyPress);
      }, [keyPress])



      const {
        data: approveData,
        write: approvecUSDToken,
        isLoading: approveLoading,
      } = useContractWrite({
        mode: 'recklesslyUnprepared',
        addressOrName: cUSDaddress,
        contractInterface: ERC20_ABI.abi,
        functionName: 'approve',
        args: [
          SuccourAddress,
          ethers.utils.parseEther(depositamount ? depositamount.toString(): "0")
        ]
      })

      const {isLoading: approveWaitLoader} = useWaitForTransaction({
        hash: approveData?.hash,
        onSuccess(data){
          depositWrite()
        },
        onError(data){
          console.log(data, "error in depositing")
        }

      })


      // call joinDAO on approve

      const {
        data: depositData,
        write: depositWrite,
        isLoading: depositLoading
      } = useContractWrite({
        mode: 'recklesslyUnprepared',
        addressOrName: SuccourAddress,
        contractInterface: Succour_abi,
        functionName: 'fundGoFund',
        args:[
          ethers.utils.parseEther(depositamount ? depositamount.toString(): "0"),
          address
        ]
      })

      const {
        isLoading: depositLoaderWait
      } = useWaitForTransaction({
        hash: depositData?.hash,
        onSuccess(){
          route.push("/Crowdfunding")
          // add toastify; input: Deposit Successful
        },
        onError(data){
          console.log(data)
          // add toastify; input: Unable to deposit
        }
      })


      const handleSubmit = (e:any) => {
        e.preventDefault();

        approvecUSDToken();
      }

    return (
        <>
        {showModal ? (
        <div className={styles.donate} ref={modalRef} onClick={closeModal}>
              {/* animating the whole container properties*/}
              <animated.div style={animation}>
                {/* @ts-ignore */}
              <div className={styles.wrapper} showModal={showModal}>
                    <div className={styles.closeButton} onClick={() => setShowModal((prev : any) => !prev)}></div>
                  <div className={styles.container}>
                        <div className={styles.donate_content}>
                        <h1 className={styles.title}>How much would you like to donate?</h1>

                        <div className={styles.donate_input}>
                            <div className={styles.wallet_icon}>
                              <Image src={walletIcon} alt="" />
                            </div>
                            <input type="number" value={depositamount} onChange={(e)=> setDepositamount(e.target.value)}  />
                              <select name="choice">
                            <option value="cUSD" selected>cUSD</option>
                          </select>
                        </div>

                        {
                          address ?

                          <button
                          className={styles.join_btn}
                          disabled={depositLoading || depositLoaderWait || approveLoading || approveWaitLoader}
                          onClick={handleSubmit}
                          >
                            {(depositLoading || depositLoaderWait || approveLoading || approveWaitLoader) ? "Loading..." : "Donate"}
                          </button> :

                             <div className={styles.connection}>
              <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== 'loading';
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus ||
            authenticationStatus === 'authenticated');

        return (
          <div
            {...(!ready && {
              'aria-hidden': true,
              'style': {
                opacity: 0,
                pointerEvents: 'none',
                userSelect: 'none',
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button onClick={openConnectModal} type="button" className={styles.connect_btn}>
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button" className={styles.wrong_btn}>
                    Wrong network
                  </button>
                );
              }

              return (
                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    onClick={openChainModal}
                    style={{ display: 'flex', alignItems: 'center' }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: 'hidden',
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <Image
                            alt={chain.name ?? 'Chain icon'}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button>

                  <button onClick={openAccountModal} type="button">
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ''}
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
              </ConnectButton.Custom>
             </div>
                    }
                    </div>

                  </div>
              </div>
              </animated.div>
        </div>
          ): null}
        </>
    )
}

export default DonateModal