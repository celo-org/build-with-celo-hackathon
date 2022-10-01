import React from 'react'; 
import CampaignSummery from './campaignSummary';

const Campaign = () => {

    return (
        <div>
            <section class="ftco-section">
                <div class="container">
                    <div class="row d-flex">
                        <div class="col-md-6 d-flex ">
                            <div class="img img-about align-self-stretch"
                                style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/bg_3.jpg'})`, width: "100%" }} />
                        </div>
                        <div class="col-md-6 pl-md-5">
                            <h2 class="mb-1"><a href="/campaign-details" class="campaignTitle">Campaign Title</a> </h2>
                            <h5 class="mb-1">Minimum Daily requirement: $234 </h5>
                            <p class='mt-3'>Campaign Description:
                                The Big Oxmox advised her not to do so, because there were thousands of bad Commas, wild Question Marks and devious Semikoli, but the Little Blind Text didn’t listen. She packed her seven versalia, put her initial into the belt and made herself on the way.</p>

                        </div>
                    </div>
                </div>
            </section>
            <CampaignSummery /> 
        </div>
    )

}
export default Campaign