import React from 'react';
import AnimatedNumber from "animated-number-react";

const Donations = ({ details }) => {
    const value = details.myDonation
    const formatValue = (value) => value.toLocaleString('en-US');

    return (
        <>
            <section class="ftco-counter ftco-intro donation-section">
                <div class="container pd-0">
                    <div class="row no-gutters">
                        <div class="col-md-4 d-flex justify-content-center counter-wrap">
                            <div class="block-18 color-1 align-items-stretch d-flex flex-column justify-content-center">
                                <div class="text">
                                    <span>You have donated $</span>
                                    <strong class="number served-child">
                                        <AnimatedNumber
                                            value={value}
                                            formatValue={formatValue}
                                        />
                                    </strong>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 d-flex justify-content-center counter-wrap">
                            <div class="block-18 color-2 align-items-stretch">
                                <div class="text">
                                    <h2 class="mb-1">
                                        <a href={`/campaign-details?campId=${details.campaignID}`} class="campaignTitle">{details.name}</a>
                                    </h2>
                                    <div>Description: {details.description}</div>
                                    <div><b>Kids benefitted: {details.noOfBeneficiaries}</b></div><br />

                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 d-flex justify-content-center counter-wrap">
                            <div class="block-18 color-3 align-items-stretch">
                                <div class="text">
                                    <h3 class="mb-2">NGO Profile</h3>
                                    <div>Name: {details.ngoName}</div>
                                    <div>Reg No: {details.ngoregistrationNo}</div>
                                    <div>Reg With: {details.ngoregisteredByGovt}</div>
                                    <div>Country: {details.ngocountry}</div>
                                    <div>Live Campaigns: {details.ngocampaignCount}</div>
                                    <div>Serving since: {details.ngoserviceSince}</div>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
        </>
    )

}
export default Donations