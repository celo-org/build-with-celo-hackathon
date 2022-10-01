import React, { Component, useState } from 'react';
import AnimatedNumber from "animated-number-react";
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi';


const CampaignSummery = () => {
    const [value, setValue] = useState(1234567)
    const formatValue = (value) => value.toLocaleString('en-US');
    const { address } = useAccount()
    const [registered, setRegistered] = useState(true)

    return (
        <section class="ftco-counter ftco-intro" id="section-counter">
            <div class="container">
                <div class="row no-gutters">
                    <div class="col-md-4 d-flex justify-content-center counter-wrap">
                        <div class="block-18 color-1 align-items-stretch">
                            <div class="text">
                                <strong class="number served-child">
                                    <AnimatedNumber
                                        value={value}
                                        formatValue={formatValue}
                                    />
                                </strong>
                                <span>Children will get benefit from this campaign.</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-5 d-flex justify-content-center counter-wrap">
                        <div class="block-18 color-2 align-items-stretch">
                            <div class="text">
                                <h3 class="mb-2">NGO Profile</h3>
                                <div>Name: NGO name goes here</div>
                                <div>Address: NGO Address goes here</div>
                                <div>Reg No: NGO Reg No goes here</div>
                                <div>Reg With: Govt of West Bengal</div>
                                <div>Country: NGO Country goes here</div>
                                <div>Live Campaigns: Count of NGO campaigns</div>
                                <div>Serving since: 1971</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md d-flex justify-content-center counter-wrap">
                        <div class="block-18 color-3 align-items-stretch">
                            <div class="text">
                                {address ? (
                                    <>
                                        <>
                                            <h3 class="mb-4">Donate</h3>
                                            <p>Donate in this campaign with the coin of your choice.</p>
                                            <p class="btn btn-white py-2 mt-2">
                                                Donate
                                            </p>
                                        </>
                                    </>
                                ) : (
                                    <>
                                        <h3 class="mb-4">Connect Wallet</h3>
                                        <p>Connect your wallet and start donating immediately.</p>
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
export default CampaignSummery