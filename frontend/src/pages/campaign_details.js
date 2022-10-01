import React from 'react';
import BreadCrumb from '../components/breadcrumb';
import { useAccount } from 'wagmi';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';

const CampaignDetails = () => {
    const { address } = useAccount()
    return (
        <div>
            <BreadCrumb imageURL="/asssets/images/bg_7.jpg" pagename="Campaign Title" pageURL="details" />
            <section class="ftco-section contact-section ftco-degree-bg">

                <div class="container">
                    <div class="row d-flex mb-5 contact-info">
                        <div class="col-md-12 mb-4">
                            <h2 class="h4">All you need to know</h2>
                        </div>
                        <div class="col-md-12 mb-4">
                            <div class="row">
                                <div class="col-md-6 pr-md-5">
                                    <Carousel autoPlay="true" >
                                        <div>
                                            <img src={process.env.PUBLIC_URL + '/asssets/images/cause-6.jpg'} alt='' />
                                        </div>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + '/asssets/images/cause-5.jpg'} alt='' />
                                        </div>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + '/asssets/images/cause-4.jpg'} alt='' />
                                        </div>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + '/asssets/images/cause-3.jpg'} alt='' />
                                        </div>
                                        <div>
                                            <img src={process.env.PUBLIC_URL + '/asssets/images/cause-1.jpg'} alt='' />
                                        </div>
                                    </Carousel>

                                </div>
                                <div class="col-md-6 pr-md-5">
                                    <div class="row">
                                        <div class="col-md-12 pl-md-5">
                                            <p class="mb-1"><h5 class="mb-0">Minimum Daily requirement:<span class="value"> $234 </span></h5></p>
                                            <p class="mb-1"><h5 class="mb-0">Funds Received till date:<span class="value"> $23400 </span></h5></p>
                                            <p class="mb-1"><h5 class="mb-0">Funds Utilised till date:<span class="value"> $2340 </span></h5></p>
                                            <p class="mb-3"><h5 class="mb-0">Total children benifited:<span class="value"> 1122334</span></h5></p>
                                            <p class="mb-1"><h5 class="mb-0">NGO Profile:</h5></p>
                                            <div class="col-md-12 pl-0 pr-0">
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Name: </div>
                                                    <div class="col-8 pl-0 pr-0"> NGO name goes here </div>
                                                </div>
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Address: </div>
                                                    <div class="col-8 pl-0 pr-0"> NGO address goes here </div>
                                                </div>
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Reg No: </div>
                                                    <div class="col-8 pl-0 pr-0"> NGO Reg No goes here </div>
                                                </div>
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Reg With:: </div>
                                                    <div class="col-8 pl-0 pr-0"> Govt of West Bengal </div>
                                                </div>
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Country: </div>
                                                    <div class="col-8 pl-0 pr-0"> NGO Country goes here </div>
                                                </div>
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Live Campaigns: </div>
                                                    <div class="col-8 pl-0 pr-0">24 Campigns </div>
                                                </div>
                                                <div class="row mr-0 ml-0">
                                                    <div class="col-4 pl-0 pr-0"> Serving since: </div>
                                                    <div class="col-8 pl-0 pr-0"> 1999 </div>
                                                </div>
                                            </div>
                                            <div class="col-md-12 pl-0 pr-0 mt-3 d-flex flex-row-reverse">
                                                <input type="button" value="Donate now" class="btn btn-primary py-2 px-4" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-12 mb-4">
                            <p class="mb-1"><h5 class="mb-0">Desciption:</h5></p>
                            <p>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc a accumsan magna, vel porttitor sapien. Curabitur ullamcorper mauris at congue varius. Etiam a pharetra justo. Vestibulum blandit dui mi, et mollis ligula malesuada non. Proin scelerisque et eros quis blandit. Integer sed ipsum tristique, sagittis nulla semper, vestibulum erat. Nulla rutrum interdum nisi, a finibus metus luctus ut. Maecenas suscipit dolor urna, a porta felis dignissim eget. Vestibulum eu dolor facilisis, tincidunt odio sed, finibus metus. Nullam enim tortor, ultrices at fermentum vitae, auctor id nisi. Curabitur sit amet fermentum diam, id imperdiet arcu. Duis blandit neque eget blandit mollis. Mauris tincidunt, neque a pharetra maximus, lacus est pulvinar ex, sed scelerisque augue tellus id augue. Praesent ut dolor ac nisl lacinia blandit. Duis at convallis mi, in dictum nunc.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )

}
export default CampaignDetails