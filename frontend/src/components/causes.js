import React from 'react';
import Cause from './cause';
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const options = {
    responsiveClass: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
};


const Causes = () => {


    return (
        <section class="ftco-section bg-light">
            <div class="container-fluid">
                <div class="row justify-content-center mb-5 pb-3">
                    <div class="col-md-5 heading-section text-center">
                        <h2 class="mb-4">Our Campaigns</h2>
                        <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12 ">
                        <OwlCarousel center margin={20} nav loop rewind autoplay  {...options}>
                            <div class="item">
                                <Cause imageURL='/asssets/images/cause-1.jpg' heading='eleifend donec pretium vulputate sapien nec'
                                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                    lastDonatedOn='1w'
                                    achieved='12000' />
                            </div>
                            <div class="item">
                                <Cause imageURL='/asssets/images/cause-2.jpg' heading='eleifend donec pretium vulputate sapien nec'
                                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                    lastDonatedOn='1w'
                                    achieved='900' />
                            </div>
                            <div class="item">
                                <Cause imageURL='/asssets/images/cause-3.jpg' heading='eleifend donec pretium vulputate sapien nec'
                                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                    lastDonatedOn='1w'
                                    achieved='130112' />
                            </div>
                            <div class="item">
                                <Cause imageURL='/asssets/images/cause-4.jpg' heading='eleifend donec pretium vulputate sapien nec'
                                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                    lastDonatedOn='1w'
                                    achieved='9212' />
                            </div>
                            <div class="item">
                                <Cause imageURL='/asssets/images/cause-5.jpg' heading='eleifend donec pretium vulputate sapien nec'
                                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                    lastDonatedOn='1w'
                                    achieved='80561' />
                            </div>
                            <div class="item">
                                <Cause imageURL='/asssets/images/cause-6.jpg' heading='eleifend donec pretium vulputate sapien nec'
                                    description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                                    lastDonatedOn='1w'
                                    achieved='12345' />
                            </div>
                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>

    )

}
export default Causes