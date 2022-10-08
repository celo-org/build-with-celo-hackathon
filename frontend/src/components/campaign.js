import React, { useEffect } from 'react';
import CampaignSummery from './campaignSummary';
import useGlobalStore from '../lib/globalStore'


const Campaign = ({ campaign }) => {
    return (
        <div>
            <section class="ftco-section">
                <div class="container">
                    <div class="row d-flex">
                        <div class="col-md-6 d-flex ">
                            <div class="img img-about align-self-stretch"
                                style={{ backgroundImage: `url(${campaign.campaignPic})`, width: "100%" }} />
                        </div>
                        <div class="col-md-6 pl-md-5">
                            <h2 class="mb-1">
                                <a href={`/campaign-details?campId=${campaign.campaignID}`} class="campaignTitle">{campaign.name}</a>

                            </h2>
                            <h5 class="mb-1">Minimum Daily requirement: ${campaign.dailyFundNeed} </h5>
                            <p class='mt-3'>Campaign Description:
                                {campaign.description}</p>

                        </div>
                    </div>
                </div>
            </section>
            <CampaignSummery details={campaign} />
        </div>
    )

}
export default Campaign