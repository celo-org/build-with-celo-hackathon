import React from 'react';

const Cause = ({ imageURL, heading, description, lastDonatedOn, achieved }) => {

    return (

        <div class="cause-entry">
            <span class="img" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + imageURL})` }} />
            <div class="text p-3 p-md-4">
                <h3><a href="/campaign-details">{heading}</a></h3>
                <p>{description}</p>
                <span class="donation-time mb-3 d-block">Last donation {lastDonatedOn} ago</span>
                <div class="progress custom-progress-success">
                    <div class="progress-bar bg-primary" role="progressbar" style={{ width: "99%" }} aria-valuenow="99" aria-valuemin="0" aria-valuemax="100"></div>
                </div>
                <span class="fund-raised d-block">Minimum requirement: $<strong>{achieved}</strong></span>
            </div>
        </div>
    )

}
export default Cause