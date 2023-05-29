'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';
import { urlFor } from '../../../../lib/client';

export default function Images({ image, id }) {
    const [index, setIndex] = useState(0);

    if (!image) {
        return null;
    };

    const handleImageClick = (i) => {
        setIndex(i);
    };

    const handleImageHover = (i) => {
        setIndex(i);
    };

    return (
        <>
            <div>
                <Image
                    key={id}
                    id={id}
                    src={urlFor(image && image[index]).width(300).url()}
                    width={300}
                    height={300}
                    unoptimized={true}
                    alt='product-image'
                    className='product-detail-image'
                />
            </div>

            <div className='small-images-container'>
                {image?.map((item, i) => (
                    <div
                        key={i}
                        className={`small-image ${i === index ? 'selected-image' : ''}`}
                        onClick={() => handleImageClick(i)}
                        onMouseEnter={() => handleImageHover(i)}
                    >
                        <Image
                            src={urlFor(item).width(250).url()}
                            key={i}
                            className={i === index ? 'small-image selected-image' : 'small-image'}
                            width={250}
                            height={250}
                            alt='coursel-image'
                            unoptimized={true} />
                    </div>
                ))}
            </div>
        </>
    );
};
