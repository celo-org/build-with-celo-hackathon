import React from 'react';
import AnimatedNumber from "animated-number-react";

const Donations = ({ amount }) => {
    const value = amount
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
                                    <h3 class="mb-2">Campaign Title</h3>
                                    <div>Description: Campaign Details goes here</div>
                                    <div>Kids benefitted: Campaign kids count here</div><br />

                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 d-flex justify-content-center counter-wrap">
                            <div class="block-18 color-3 align-items-stretch">
                                <div class="text">
                                    <h3 class="mb-2">NGO Profile</h3>
                                    <div>Name: NGO name goes here</div>
                                    <div>Reg No: Registration no</div>
                                    <div>Reg With: Govt of West Bengal</div>
                                    <div>Country: NGO Country goes here</div>
                                    <div>Live Campaigns: Count of NGO campaigns</div>
                                    <div>Serving since: 1971</div>
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