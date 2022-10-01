import React from 'react';
import Fancybox from './Fancybox';

const Gallery = () => {



    return (
        <section class="ftco-gallery">
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
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/cause-6.jpg'})` }}
                        data-src={process.env.PUBLIC_URL + '/asssets/images/cause-6.jpg'}>
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
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/cause-1.jpg'})` }}
                        data-src={process.env.PUBLIC_URL + '/asssets/images/cause-1.jpg'}>
                        <div class="icon d-flex justify-content-center align-items-center">
                            <span class="icon-search"></span>
                        </div>
                    </button>
                </Fancybox>
                <Fancybox options={{ infinite: false }}>
                    <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/cause-2.jpg'})` }}
                        data-src={process.env.PUBLIC_URL + '/asssets/images/cause-2.jpg'}>
                        <div class="icon d-flex justify-content-center align-items-center">
                            <span class="icon-search"></span>
                        </div>
                    </button>
                </Fancybox>

            </div>
        </section>

    )

}
export default Gallery
