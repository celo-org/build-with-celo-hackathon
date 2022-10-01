import React from 'react';
import Fancybox from './Fancybox';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

const Body = () => {

    return (
        <ParallaxProvider>
            <Parallax translateY={[-40, 25]}>
                <div class="hero-wrap" data-stellar-background-ratio="0.5"
                    style={{ backgroundImage: `url(${process.env.PUBLIC_URL + '/asssets/images/bg_7.jpg'})` }}>
                    <div class="overlay"></div>
                    <div class="container">
                        <div class="row no-gutters slider-text align-items-center justify-content-center">

                            <div class="col-md-7 text-center">
                                <Parallax translateY={[-20, 25]}>
                                    <h1 class="mb-4">Doing Nothing is Not An Option of Our Life</h1>
                                </Parallax>
                                <Parallax translateY={[-20, 25]}>
                                    <p class="mb-5">An initiative from <a href="https://growglobal.io/" target='_blank'>Grow Global</a></p>
                                </Parallax>
                                <Parallax translateY={[-20, 25]}>
                                    <p>
                                        <Fancybox options={{ infinite: false }} >
                                            <a href="https://www.youtube.com/watch?v=E1xkXZs0cAQ" class="btn btn-white btn-outline-white px-4 py-3 popup-vimeo" data-fancybox="gallery"
                                                data-src="https://www.youtube.com/watch?v=E1xkXZs0cAQ" >
                                                <span class="icon-play mr-2"></span>Watch Video</a>
                                        </Fancybox>

                                    </p>
                                </Parallax>
                            </div>

                        </div>
                    </div>
                </div>
            </Parallax>
        </ParallaxProvider>
    )

}
export default Body