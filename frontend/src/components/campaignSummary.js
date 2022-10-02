import React, { Component, useState } from 'react';
import AnimatedNumber from "animated-number-react";
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount } from 'wagmi';


const CampaignSummery = ({ details }) => {
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
                                        value={details.noOfBeneficiaries}
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
                                <div>Name: {details.ngoName}</div>
                                <div>Address: {details.ngoAddress}</div>
                                <div>Reg No: {details.ngoregistrationNo}</div>
                                <div>Reg With: {details.ngoregisteredByGovt}</div>
                                <div>Country: {details.ngocountry}</div>
                                <div>Live Campaigns: {details.ngocampaignCount}</div>
                                <div>Serving since: {details.ngoserviceSince}</div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md d-flex justify-content-center counter-wrap">
                        <div class="block-18 color-3 align-items-stretch">
                            <div class="text">
                                {address ? (
                                    <>
                                        <>
                                            <h3 class="mb-4">Available Fuds</h3>
                                            <p>The campaign has ${details.availableBalance} left.</p>
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