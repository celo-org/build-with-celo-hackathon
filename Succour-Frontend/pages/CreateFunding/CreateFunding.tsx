// import {useRef} from 'react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './createfunding.module.scss'
import Navbar from '../../layouts/navbar/Navbar'
import Footer from '../../layouts/footer/Footer'
import documentCloudSvg from '../../assets/document-cloud-2.svg'
import arrowLeftSvg from '../../assets/arrow-left.svg'
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import Succour_abi from "../../abi/abi.json"
import { ethers } from 'ethers'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useRouter } from 'next/router'


const CreateFunding = () => {

    const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"

    const [fundname, setFundname] = useState("");
    const [funddesc, setFunddesc] = useState("");
    const [amountneeded, setAmountneeded] = useState("")


    const { address } = useAccount();
    const route = useRouter()


    const {
        data: createFundData,
        write: createFundWrite,
        isLoading: fundingIsLoading,
    } = useContractWrite({
        mode: 'recklesslyUnprepared',
        addressOrName: SuccourAddress,
        contractInterface: Succour_abi,
        functionName: 'createGofund',
        args: [
              fundname,
              funddesc,
              ethers.utils.parseEther(amountneeded ? amountneeded.toString(): "0")
        ]
    })

    const {
        isLoading: fundingLoader
    } = useWaitForTransaction({
        hash: createFundData?.hash,
        onSuccess(){
          route.push("/Crowdfunding")
              // add toastify; input: Successfully create fund
        },
        onError(data){
              console.log(data)
              // add toastify; input: Error encountered while creating Fund
        }
    })

    const handleSubmit = (e:any) => {
        e.preventDefault();

        createFundWrite();
    }
    return (
        <>
        <Navbar />
          <div className={styles.createfund}>
            <div className={styles.left_arrow}>
              <div className={styles.back_arrow}>
              <Link href="/Crowdfunding">
              <div className={styles.arrow}>
                  <Image src={arrowLeftSvg} alt="" />
              </div>
              </Link>
            </div>
            </div>

            <div className={styles.wrapper}>
            <div className={styles.top_container}>
              <div className={styles.createfund_container}>
                  <div className={styles.createfund_content}>
                  <form className={styles.createfund_form}>
                    <div className={styles.title}>Create funding request</div>
                    {/* <label>Member ID</label>
                    <input id="input" name="input" type="text" /> */}

                    <label>Funding title</label>
                    <input id="input" name="input" type="text" value={fundname} onChange={(e)=> setFundname(e.target.value)} />

                    {/* <label>Project links</label>
                    <input id="input" name="input" type="text" onChange={(e)=> e.target.value}/> */}

                    <label>Amount to be funded</label>
                    <input id="input" name="input" type="number" value={amountneeded} onChange={(e)=> setAmountneeded(e.target.value)}/>

                    <label>Funding description</label>
                    <textarea cols={30} rows={5} value={funddesc} onChange={(e)=> setFunddesc(e.target.value)}></textarea>
                    {/* <label>Project media</label>
                    <div className={styles.upload_btn_wrapper}>
                        <div className={styles.cloudsvg}>
                            <div className={styles.icon}>
                              <Image src={documentCloudSvg} alt="" />
                            </div>
                              <input type="file" 
                        name="selectfile" 
                        id="selectfile" 
                        className={styles.upload}
                        />
                            <p>Click here to upload an image</p>
                        </div>
                    </div> */}
                    {
                        address ?
                        <button
                        className={styles.form_btn}
                        disabled={fundingIsLoading || fundingLoader}
                        onClick={handleSubmit}
                        >
                            {(fundingIsLoading || fundingLoader) ? "Loading..." : "Create Funding"}
                        </button> :
                <div className={styles.createfunding_btn}>
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

                  </form>
              </div>
              </div>

            </div>
            </div>
        </div>
        <Footer />
        </>
    )
}

export default CreateFunding