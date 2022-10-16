import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/breadcrumb';
import Fancybox from '../components/Fancybox';
import { client, urlFor } from "../lib/sanityClient"; 
import { Dna } from 'react-loader-spinner'

const Gallery = () => {
    const [photos, setPhotos] = useState([])
    const [contentLoaded, setcontentLoaded] = useState([])

    useEffect(() => {
        setcontentLoaded(false)
        loadPhotos()
    }, [])

    async function loadPhotos() {
        const query = '*[_type == "task"] {dailytask}'
        const result = await client.fetch(query)
        const baseUrl = urlFor(result[0]["dailytask"]["asset"]["_ref"].slice(6,))["options"].baseUrl
        const dataset = urlFor(result[0]["dailytask"]["asset"]["_ref"].slice(6,))["options"].dataset
        const projectId = urlFor(result[0]["dailytask"]["asset"]["_ref"].slice(6,))["options"].projectId

        const items = await Promise.all(
            result.map(async (i) => {
                let item = {
                    url:
                        `${baseUrl}/images/${projectId}/${dataset}/${i["dailytask"]["asset"]["_ref"]
                            .slice(6,).slice(0, -4) + '.'}png`

                };
                return item;
            })
        )
        setPhotos(items)
        setcontentLoaded(true)
    }

    return (
        <div>
            <BreadCrumb imageURL="/asssets/images/bg_2.jpg" pagename="Galleries" pageURL="GALLERY" />
            <section class="ftco-section ftco-gallery">
                <div class="container" >
                    {!contentLoaded &&
                    <div class='loader'>
                        <Dna
                            visible={true}
                            height="150"
                            width="150"
                            ariaLabel="dna-loading"
                            wrapperStyle={{}}
                            wrapperClass="dna-wrapper"
                        />
                        </div>
                    }
                    {contentLoaded &&
                        <div class="d-md-flex">
                            {photos.map((photo, i) =>
                                <Fancybox options={{ infinite: false }}>
                                    <button class="gallery image-popup d-flex justify-content-center align-items-center img" data-fancybox="gallery"
                                        style={{ backgroundImage: `url(${photo.url})` }}
                                        data-src={photo.url}>
                                        <div class="icon d-flex justify-content-center align-items-center">
                                            <span class="icon-search"></span>
                                        </div>
                                    </button>
                                </Fancybox>
                            )}
                        </div>
                    }
                </div>
            </section>
        </div>
    )
}
export default Gallery;