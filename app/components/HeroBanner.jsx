import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '../../lib/client'



const HeroBanner = ({ smallText, midText, largeText, bannerImage, bannerProduct, bannerButtonText, bannerDesc }) => {
    return (
        <>
            <div className='hero-banner-container'>
                <div>
                    <p className='beats-solo'>
                        {smallText}
                    </p>

                    <h3>
                        {midText}
                    </h3>

                    <h1>
                        {largeText}
                    </h1>

                    < Image
                        className="hero-banner-image"
                        width={800}
                        height={800}
                        src={urlFor(bannerImage).width(800).url()}
                        alt="headphones"
                        unoptimized={true} />
                </div>

                <div>
                    <Link href={`/product/${bannerProduct}`}>
                        <button type='button'>{bannerButtonText}</button>
                    </Link>
                    <div className='desc'>
                        <h5>Description</h5>
                        <p>{bannerDesc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeroBanner