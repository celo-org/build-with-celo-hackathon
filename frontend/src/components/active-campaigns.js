import React from 'react';

const ActiveCampaign = ({ classOne, classTwo, index, campaign }) => {

    return (
        <div>
            <section class="mt-5">
                <div class="container">
                    <div class="row d-flex">
                        <div class={classOne}>
                            <div class="img img-about align-self-stretch"
                                style={{ backgroundImage: `url(${campaign.campaignPic})`, width: "100%" }} />
                        </div>
                        <div class={classTwo}>
                            <h2 class="mb-1"><a href="/campaign-details" class="campaignTitle">{campaign.name}</a> </h2>
                            <p class="mb-1"><h5 class="mb-0">Minimum Daily requirement:<span class="value"> ${campaign.dailyFundNeed} </span></h5></p>
                            <p class="mb-1"><h5 class="mb-0">Funds Received till date:<span class="value"> ${campaign.totalReceived} </span></h5></p>
                            <p class="mb-1"><h5 class="mb-0">Funds Utilised till date:<span class="value"> ${campaign.totalUsed} </span></h5></p>
                            <p class="mb-3"><h5 class="mb-0">Total children benifited:<span class="value"> {campaign.noOfBeneficiaries}</span></h5></p>
                            <button class="btn btn-primary py-2 mt-2" >
                                Withdraw Daily Fund
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}
export default ActiveCampaign