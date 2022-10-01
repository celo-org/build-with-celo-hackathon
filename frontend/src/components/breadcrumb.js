import React, { Component } from 'react';
import { ParallaxProvider, Parallax } from 'react-scroll-parallax';

export default class BreadCrumb extends Component {
    render() {
        return (
            <ParallaxProvider>
                <Parallax translateY={[-30, 10]}>
                    <div class="hero-wrap" data-stellar-background-ratio="0.5"
                        style={{ backgroundImage: `url(${process.env.PUBLIC_URL + this.props.imageURL})` }}>
                        <div class="overlay"></div>
                        <div class="container">
                            <div class="row no-gutters slider-text align-items-center justify-content-center">
                                <div class="col-md-7 text-center">
                                    <Parallax translateY={[-20, 25]}>
                                        <p class="breadcrumbs">
                                            <span class="mr-2"><a href="/">Home</a></span> <span>{this.props.pageURL}</span>
                                        </p>
                                    </Parallax>
                                    <Parallax translateY={[-20, 25]}>
                                        <h1 class="mb-4">{this.props.pagename}</h1>
                                    </Parallax>
                                </div>

                            </div>
                        </div>
                    </div>
                </Parallax>
            </ParallaxProvider>
        )
    }
}