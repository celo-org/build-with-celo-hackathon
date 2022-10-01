import React, { Component } from 'react';
import BreadCrumb from '../components/breadcrumb';
import Fancybox from '../components/Fancybox';

export default class Gallery extends Component {
    render() {
        return (
            <div>
                <BreadCrumb imageURL="/asssets/images/bg_2.jpg" pagename="Galleries" pageURL="GALLERY" />
                <section class="ftco-section ftco-gallery">
                    <div class="container">
                        <div class="d-md-flex">
                            <Fancybox options={{ infinite: false }}>
                                <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/cause-2.jpg'})` }}
                                    data-src={process.env.PUBLIC_URL + '/asssets/images/cause-2.jpg'}>
                                    <div class="icon d-flex justify-content-center align-items-center">
                                        <span class="icon-search"></span>
                                    </div>
                                </button>
                            </Fancybox>
                            <Fancybox options={{ infinite: false }}>
                                <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/cause-3.jpg'})` }}
                                    data-src={process.env.PUBLIC_URL + '/asssets/images/cause-3.jpg'}>
                                    <div class="icon d-flex justify-content-center align-items-center">
                                        <span class="icon-search"></span>
                                    </div>
                                </button>
                            </Fancybox>
                            <Fancybox options={{ infinite: false }}>
                                <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/cause-4.jpg'})` }}
                                    data-src={process.env.PUBLIC_URL + '/asssets/images/cause-4.jpg'}>
                                    <div class="icon d-flex justify-content-center align-items-center">
                                        <span class="icon-search"></span>
                                    </div>
                                </button>
                            </Fancybox>
                            <Fancybox options={{ infinite: false }}>
                                <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/cause-5.jpg'})` }}
                                    data-src={process.env.PUBLIC_URL + '/asssets/images/cause-5.jpg'}>
                                    <div class="icon d-flex justify-content-center align-items-center">
                                        <span class="icon-search"></span>
                                    </div>
                                </button>
                            </Fancybox>
                        </div>
                        <div class="d-md-flex">
                            <Fancybox options={{ infinite: false }}>
                                <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/event-1.jpg'})` }}
                                    data-src={process.env.PUBLIC_URL + '/asssets/images/event-1.jpg'}>
                                    <div class="icon d-flex justify-content-center align-items-center">
                                        <span class="icon-search"></span>
                                    </div>
                                </button>
                            </Fancybox>
                            <Fancybox options={{ infinite: false }}>
                                <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/event-2.jpg'})` }}
                                    data-src={process.env.PUBLIC_URL + '/asssets/images/event-2.jpg'}>
                                    <div class="icon d-flex justify-content-center align-items-center">
                                        <span class="icon-search"></span>
                                    </div>
                                </button>
                            </Fancybox>
                            <Fancybox options={{ infinite: false }}>
                                <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/event-3.jpg'})` }}
                                    data-src={process.env.PUBLIC_URL + '/asssets/images/event-2.jpg'}>
                                    <div class="icon d-flex justify-content-center align-items-center">
                                        <span class="icon-search"></span>
                                    </div>
                                </button>
                            </Fancybox>
                            <Fancybox options={{ infinite: false }}>
                                <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/event-4.jpg'})` }}
                                    data-src={process.env.PUBLIC_URL + '/asssets/images/event-4.jpg'}>
                                    <div class="icon d-flex justify-content-center align-items-center">
                                        <span class="icon-search"></span>
                                    </div>
                                </button>
                            </Fancybox>
                        </div>
                        <div class="d-md-flex">
                            <Fancybox options={{ infinite: false }}>
                                <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/event-5.jpg'})` }}
                                    data-src={process.env.PUBLIC_URL + '/asssets/images/event-5.jpg'}>
                                    <div class="icon d-flex justify-content-center align-items-center">
                                        <span class="icon-search"></span>
                                    </div>
                                </button>
                            </Fancybox>
                            <Fancybox options={{ infinite: false }}>
                                <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/event-6.jpg'})` }}
                                    data-src={process.env.PUBLIC_URL + '/asssets/images/event-6.jpg'}>
                                    <div class="icon d-flex justify-content-center align-items-center">
                                        <span class="icon-search"></span>
                                    </div>
                                </button>
                            </Fancybox>
                            <Fancybox options={{ infinite: false }}>
                                <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/image_2.jpg'})` }}
                                    data-src={process.env.PUBLIC_URL + '/asssets/images/image_2.jpg'}>
                                    <div class="icon d-flex justify-content-center align-items-center">
                                        <span class="icon-search"></span>
                                    </div>
                                </button>
                            </Fancybox>
                            <Fancybox options={{ infinite: false }}>
                                <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/image_3.jpg'})` }}
                                    data-src={process.env.PUBLIC_URL + '/asssets/images/image_3.jpg'}>
                                    <div class="icon d-flex justify-content-center align-items-center">
                                        <span class="icon-search"></span>
                                    </div>
                                </button>
                            </Fancybox>
                        </div>

                    </div>
                </section>
            </div>
        )
    }
}