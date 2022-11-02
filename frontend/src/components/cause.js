import React from 'react';

const Cause = ({ details }) => {

    return (

        <div class="cause-entry">
            <span class="img" style={{ backgroundImage: `url(${details.campaignPic})` }} />
            <div class="text p-3 p-md-4">
                <h3><a href="/campaign-details">{details.name}</a></h3>
                <p class="desc-p">{details.description}</p>
                <div class="progress custom-progress-success">
                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "99%" }} aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <span class="fund-raised d-block">Daily requirement: $<strong>{details.dailyFundNeed}</strong></span>
            </div>
        </div>
    )

}
export default Cause