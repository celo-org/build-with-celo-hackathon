import React from 'react';

const ActiveCampaign = ({ classOne, classTwo, index }) => {

    return (
        <div>
            <section class="mt-5">
                <div class="container">
                    <div class="row d-flex">
                        <div class={classOne}>
                            <div class="img img-about align-self-stretch"
                                style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/cause-' + index + '.jpg'})`, width: "100%" }} />
                        </div>
                        <div class={classTwo}>
                            <h2 class="mb-1"><a href="/campaign-details" class="campaignTitle">{'Campaign Title ' + index}</a> </h2>
                            <p class="mb-1"><h5 class="mb-0">Minimum Daily requirement:<span class="value"> $234 </span></h5></p>
                            <p class="mb-1"><h5 class="mb-0">Funds Received till date:<span class="value"> $23400 </span></h5></p>
                            <p class="mb-1"><h5 class="mb-0">Funds Utilised till date:<span class="value"> $2340 </span></h5></p>
                            <p class="mb-3"><h5 class="mb-0">Total children benifited:<span class="value"> 1122334</span></h5></p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}
export default ActiveCampaign