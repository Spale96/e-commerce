import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '../../lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
    return (
        <div>
            <Link href={`/product/${slug.current}`} className='product-item'>
                <div className='product-card'>
                    <Image
                        src={urlFor(image && image[0]).width(500).url()}
                        width={250}
                        height={250}
                        unoptimized={true}
                        className="product-image"
                        alt='products-images' />
                </div>
                <p className='product-name'>{name}</p>
                <p className='product-price'>${price}</p>
            </Link>
        </div >
    );
};

export default Product;