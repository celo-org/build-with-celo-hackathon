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


const Causes = ({ details }) => {


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
                            {details.map((camp, id) => (
                                <div class="item">
                                    <Cause key={id} details={camp} />
                                </div>
                            ))}


                        </OwlCarousel>
                    </div>
                </div>
            </div>
        </section>

    )

}
export default Causes