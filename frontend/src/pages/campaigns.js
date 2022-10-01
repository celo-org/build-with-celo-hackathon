import React from 'react';
import BreadCrumb from '../components/breadcrumb';
import Campaign from '../components/campaign'; 


const Campaigns = () => {

    return (
        <div>
            <BreadCrumb imageURL="/asssets/images/bg_7.jpg" pagename="Live Campaigns" pageURL="campaigns" />
            <Campaign />
            <Campaign />
            <Campaign />
            <Campaign />
            <Campaign />
            <Campaign /> 
        </div>
    )

}
export default Campaigns