import React, { useEffect, useState } from 'react';
import AnimatedNumber from "animated-number-react";
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useNetwork } from 'wagmi';
import { ethers } from 'ethers';
import { getConfigByChain } from '../config'
import GrowAChild from '../artifacts/contracts/Growachild.sol/Growachild.json'


const Summery = () => {
    const [value, setValue] = useState(0)
    const formatValue = (value) => value.toLocaleString('en-US');
    const { address } = useAccount()
    const { chain } = useNetwork()
    const [registered, setRegistered] = useState(false)

    useEffect(() => {
        checkStatus(sd)
    }, [address, chain])

    async function checkStatus() {
        await (window).ethereum.send('eth_requestAccounts') // opens up metamask extension and connects Web2 to Web3
        const provider = new ethers.providers.Web3Provider(window.ethereum) //create provider
        const network = await provider.getNetwork()
        const signer = provider.getSigner()
        const gacContract = new ethers.Contract(
            getConfigByChain(network.chainId)[0].contractProxyAddress,
            GrowAChild.abi,
            signer
        )
        const tx = await gacContract.checkRegistration()
        const kids = await gacContract.getTotalKidsCount()
        setRegistered(tx)
        setValue(kids)
    }

    return (
        <section class="ftco-counter ftco-intro" id="section-counter">
            <div class="container">
                <div class="row no-gutters">
                    <div class="col-md-5 d-flex justify-content-center counter-wrap">
                        <div class="block-18 color-1 align-items-stretch">
                            <div class="text">
                                <span>Served Over</span>
                                <strong class="number served-child">
                                    <AnimatedNumber
                                        value={value}
                                        formatValue={formatValue}
                                    />
                                </strong>
                                <span>children worldwide and counting...</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md d-flex justify-content-center counter-wrap">
                        <div class="block-18 color-2 align-items-stretch">
                            <div class="text">
                                <h3 class="mb-4">Donate Now</h3>
                                <p>Explore live campaigns and join our endeavour to grow-a-child.</p>
                                <p><a href="campaigns" class="btn btn-white px-3 py-2 mt-2">Explore Campaigns</a></p>
                            </div>
                        </div>
                    </div>
                    <div class="col-md d-flex justify-content-center counter-wrap">
                        <div class="block-18 color-3 align-items-stretch">
                            <div class="text">
                                {address ? (
                                    <>
                                        {registered ? (
                                            <>
                                                <h3 class="mb-4">Create Campaign</h3>
                                                <p>You are already registered with us. Start creating your campaigns today.</p>
                                                <p>
                                                    <a href='create-campaign' class="btn btn-white px-3 py-2 mt-2">Create Campaign</a>
                                                </p>
                                            </>
                                        ) : (
                                            <>
                                                <h3 class="mb-4">Register Yourself</h3>
                                                <p>Register your organization to start your campaign.</p>
                                                <p>
                                                    <a href="register" class="btn btn-white px-3 py-2 mt-2">Register Yourself</a>
                                                </p>
                                            </>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <h3 class="mb-4">Join Now</h3>
                                        <p>Register Now and start creating your campaigns today.</p>
                                        <p class="py-2 mt-2">
                                            <ConnectButton />
                                        </p>
                                    </>
                                )}

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )

}
export default Summery