'use client'

import React from 'react'
import { useState } from 'react'
import Image from 'next/image';
import { urlFor } from '../../../../lib/client';

export default function Images({ image, id }) {
    const [index, setIndex] = useState(0);

    return (
        <>
            <div className='image-container' >
                <Image
                    src={urlFor(image && image[index]).width(650).url()}
                    width={350}
                    height={350}
                    unoptimized={true}
                    alt='product-image'
                    className='product-detail-image'
                />
            </div>

            <div className='small-images-container'>
                {image?.map((item, i) => (
                    < Image
                        src={urlFor(item).width(250).url()}
                        key={i}
                        className={i === index ? 'small-image selected-image' : 'small-image'}
                        width={250}
                        height={250}
                        alt='coursel-image'
                        unoptimized={true}
                        onMouseEnter={() => setIndex(i)} />

                ))}
            </div>
        </>
    )
}
