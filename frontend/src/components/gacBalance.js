import React from 'react';
import AnimatedNumber from "animated-number-react";

const GacBalance = ({ gacBalance }) => {
    const value = gacBalance
    const formatValue = (value) => value.toLocaleString('en-US');

    return (
        <>
            <section class="ftco-counter ftco-intro donation-section">
                <div class="container pd-0">
                    <div class="row no-gutters">
                        <div class="col-md-12 d-flex justify-content-center counter-wrap">
                            <div class="block-18 color-1 align-items-stretch d-flex flex-column justify-content-center">
                                <div class="text">
                                    <span>👏: My Total Earnings(GAC Coins):</span>
                                    <strong class="number served-child">
                                        <AnimatedNumber
                                            value={value}
                                            formatValue={formatValue}
                                        />
                                    </strong>

                                </div>
                            </div>
                        </div>



                    </div>
                </div>
            </section>
        </>
    )

}
export default GacBalance