import React, { Component } from 'react';
import BreadCrumb from '../components/breadcrumb';
import ActiveCampaign from '../components/active-campaigns';
import Donations from '../components/donations';

export default class Dashboard extends Component {


    render() {
        return (
            <div>
                <BreadCrumb imageURL="/asssets/images/bg_6.jpg" pagename="Dashboard" pageURL="Dashboard" />
                <section class="ftco-section contact-section ftco-degree-bg">
                    <div class="container tab">
                        <ul class="nav nav-tabs nav-pills nav-fill" role="tablist">
                            <li class="nav-item">
                                <a class="nav-link active" id="campaigns-tab" data-toggle="tab" href="#campaigns" role="tab" aria-controls="campaigns" aria-selected="true">Active Campaigns</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" id="donations-tab" data-toggle="tab" href="#donations" role="tab" aria-controls="donations" aria-selected="false">My Donations</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div class="tab-pane fade show active" id="campaigns" role="tabpanel" aria-labelledby="campaigns-tab">
                                <ActiveCampaign index="1" classOne="col-md-6 d-flex order-md-1 order-sm-2" classTwo="col-md-6 pl-md-5 order-md-2 order-sm-1" />
                                <ActiveCampaign index="2" classOne="col-md-6 d-flex order-md-2 order-sm-2" classTwo="col-md-6 pl-md-5 order-md-1 order-sm-1" />
                                <ActiveCampaign index="3" classOne="col-md-6 d-flex order-md-1 order-sm-2" classTwo="col-md-6 pl-md-5 order-md-2 order-sm-1" />
                                <ActiveCampaign index="4" classOne="col-md-6 d-flex order-md-2 order-sm-2" classTwo="col-md-6 pl-md-5 order-md-1 order-sm-1" />
                                <ActiveCampaign index="5" classOne="col-md-6 d-flex order-md-1 order-sm-2" classTwo="col-md-6 pl-md-5 order-md-2 order-sm-1" />

                            </div>
                            <div class="tab-pane fade" id="donations" role="tabpanel" aria-labelledby="donations-tab">
                                <Donations amount="100" />
                                <Donations amount="8000" />
                                <Donations amount="600" />
                                <Donations amount="250" />
                                <Donations amount="950" />
                            </div>

                        </div>
                    </div>
                </section>

            </div>
        )
    }
}