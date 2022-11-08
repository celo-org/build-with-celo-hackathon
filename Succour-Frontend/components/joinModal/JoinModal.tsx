import { useRef, useEffect, useCallback, useState } from 'react'
import { useSpring, animated } from 'react-spring'
import styles from './joinmodal.module.scss'
import userIcon from '../../assets/carbon_user-avatar.svg'
import walletIcon from '../../assets/wallet-1.svg'
import Image from 'next/image'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ERC20_ABI from "../../abi/ERC20.json"
import Succour_abi from "../../abi/abi.json"
import { ethers } from 'ethers'
import { useRouter } from 'next/router'

interface IProps {
      showJoinModal: any;
      setShowJoinModal: any;
}

const JoinModal = ({ showJoinModal, setShowJoinModal } : IProps) => {

  const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"
  const cUSDaddress = "0x4D3742f7d4AE2Ac3619c413E75976A9c7067b70E";


  const {address} = useAccount();
  const router = useRouter();

  const modalRef = useRef<any | any>();
  const [name, setName ] = useState("");
  const [amount, setAmount] = useState("");

  const animation = useSpring({
    config: {
      duration: 300
    },
    opacity: showJoinModal ? 1 : 0,
    transform: showJoinModal ? `translateY(0%)` : `translateY(100%)`
  })

  const closeModal = (e :any) => {
      if(modalRef.current === e.target) {
      setShowJoinModal(false)
      }
  }

  const keyPress = useCallback((e :any) => {
    if(e.key === 'Escape' && showJoinModal) {
      setShowJoinModal(false)
    }
  }, [setShowJoinModal, showJoinModal])

  useEffect(() => {
      document.addEventListener('keydown', keyPress);
      return () => document.removeEventListener('keydown', keyPress);
  }, [keyPress])

  // User's input form
  // Approves ERC20 token to deposit
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
      ethers.utils.parseEther(amount? amount.toString(): "0"),
    ]
  })

  const {isLoading: approveWaitLoader} = useWaitForTransaction({
    hash: approveData?.hash,
    onSuccess(){
      joinDAOWrite()
    },
    onError(data){
      console.log(data)
    }

  })

  // call joinDAO on approve
  const {
    data: joinDaoData,
    write: joinDAOWrite,
    isLoading: joinDaoLoading,
  } = useContractWrite({
    mode: 'recklesslyUnprepared',
    addressOrName: SuccourAddress,
    contractInterface: Succour_abi,
    functionName: 'joinDAO',
    args:[
      name,
      ethers.utils.parseEther(amount? amount.toString(): "0")
    ]
  })

  const { isLoading: joinDaoWaitData } = useWaitForTransaction({
    hash: joinDaoData?.hash,
    onSuccess(){
      // add toastify; input: Transaction sent successfully
      toast.success('Transaction sent successfully!', {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 8000,
    })
    router.push("/dao")

    },
    onError(data){
      console.log(data)
      // add toastify; input: Error encountered in joining SuccourDAO
      toast.error('Error encountered in joining SuccourDAO!', {
        position: toast.POSITION.TOP_CENTER
    })
    }
  })

  const handleSubmit = (e:any) => {
    e.preventDefault();

    approvecUSDToken();
  }


  return (
      <>
      {showJoinModal ? (
      <div className={styles.join} ref={modalRef} onClick={closeModal}>
            {/* animating the whole container properties*/}
            <animated.div style={animation}>
              {/* @ts-ignore */}
                <div className={styles.wrapper}  showJoinModal={showJoinModal}>
                <div className={styles.closeButton} onClick={() => setShowJoinModal((prev : any) => !prev)}></div>
                <div className={styles.container}>
                      <div className={styles.join_content}>
                      <h1 className={styles.title}>Join Succor DAO</h1>

                      {/* <div className={styles.join_input1}>
                        <label>Name</label>
                        <input
                        className={styles.input}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        />
                      </div> */}


                    <div className={styles.text}>
                      <label>Name</label>
                        <div className={styles.join_input}>
                          <div className={styles.wallet_icon}>
                            <Image src={userIcon} alt="" />
                          </div>
                          <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          />
                    </div>


                    </div>

                    <div className={styles.text}>
                      <label>Amount to deposit</label>
                        <div className={styles.join_input}>
                          <div className={styles.wallet_icon}>
                            <Image src={walletIcon} alt="" />
                          </div>
                          <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          required
                          />
                        <select name="choice">
                          <option value="cUSD" selected>cUSD</option>
                        </select>

                    </div>


                    </div>
                    {
                      address ?
                      <button className={styles.join_btn}
                      disabled={approveLoading || approveWaitLoader || joinDaoLoading || joinDaoWaitData}
                      onClick={handleSubmit}
                      >
                        {(approveLoading || approveWaitLoader || joinDaoLoading || joinDaoWaitData) ? "Loading..." : "Join DAO"}
                      </button> :
                    //connectButton custom
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

export default JoinModal