import {useRef, useState} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import styles from './prospose.module.scss'
import Navbar from '../../components/navbar/Navbar'
import Footer from '../../components/footer/Footer'
import documentCloudSvg from '../../assets/document-cloud.svg'
import arrowLeftSvg from '../../assets/arrow-left.svg'
import { useAccount, useContractWrite, useWaitForTransaction } from 'wagmi'
import Succour_abi from "../../abi/abi.json"
import { useRouter } from 'next/router'
import { ethers } from "ethers"
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Propose = () => {
     const SuccourAddress = "0x122e768c3E676dba4905959f89a7056A5053D839"
     const [title, setTitle] = useState("")
     const [amountProposed, setAmountProposed] = useState("")
     const [projectDescription, setProjectDescription] = useState("")

     const { address } = useAccount();
     const router = useRouter();

     const {
          data: proposeData,
          write: proposeDataWrite,
          isLoading: proposeIsLoading
     } = useContractWrite({
          mode: 'recklesslyUnprepared',
          addressOrName: SuccourAddress,
          contractInterface: Succour_abi,
          functionName: 'proposeProject',
          args: [
               title,
               projectDescription,
               ethers.utils.parseEther(amountProposed? amountProposed.toString(): "0")
          ]
     })

     const {isLoading: proposeLoading} = useWaitForTransaction({
          hash: proposeData?.hash,
          onSuccess(){
               console.log("Successfully proposed")
               router.push("/Projects/Projects")
               // add toastify; input: Successfully Proposed
          },
          onError(data){
               console.log(data)
               // add toastify; input: Error encountered in proposing for a project
          }
     })

     const handleSubmit = (e:any) => {
          e.preventDefault();

          proposeDataWrite();
     }

     return (
          <>
          <Navbar />
               <div className={styles.propose}>
               <div className={styles.left_arrow}>
                    <div className={styles.back_arrow}>
                    <Link href="/Projects/Projects">
                    <div className={styles.arrow}>
                         <Image src={arrowLeftSvg} alt="" />
                    </div>
                    </Link>
               </div>
               </div>

               <div className={styles.wrapper}>
               <div className={styles.top_container}>
                    <div className={styles.propose_content}>
                    <h1 className={styles.title}>Propose a project</h1>
                    <form className={styles.propose_form} >
                         {/* <label>Member ID</label>
                         <input id="input" name="input" type="text" /> */}

                         <label>Project title</label>
                         <input id="input" name="input" type="text" value={title} onChange={(e)=> setTitle(e.target.value)} />

                         <label>Amount proposed</label>
                         <input id="input" name="input" type="number" value={amountProposed} onChange={(e) => setAmountProposed(e.target.value)} />

                         <label>Project description</label>
                         <textarea cols={30} rows={5} value={projectDescription} onChange={(e)=> setProjectDescription(e.target.value)}></textarea>
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
                              address?
                              <button
                              className={styles.form_btn}
                              disabled={proposeIsLoading || proposeLoading}
                              onClick={handleSubmit}
                              >
                                   {(proposeIsLoading || proposeLoading) ? "Loading...": "Propose Project"}
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

                    </form>
               </div>
          </div>
          </div>
          </div>
          <Footer />
          </>
     )
}

export default Propose
