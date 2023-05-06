import React from 'react'
import Product from '../../components/Product';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { client } from '../../../lib/client';
import Buttons from './components/Buttons';
import Images from './components/Images';



export default async function ProductDetails({ params: { slug } }) {
    //take everthing from (type) product.
    const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
    const productsQuery = '*[_type == "product"]'

    //individual product
    const product = await client.fetch(query);

    const products = await client.fetch(productsQuery);

    const { image, name, details, price } = await product;

    return (
        <div>
            <div className='product-detail-container'>
                <div>
                    <Images
                        key={product._id}
                        image={image}
                    />
                </div>
                <div className="product-detail-desc">
                    <h1>{name}</h1>
                    <div className='reviews'>
                        <div>
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiFillStar />
                            <AiOutlineStar />
                        </div>
                        <p>
                            (20)
                        </p>
                    </div>
                    <h4>Details:</h4>
                    <p>{details}</p>
                    <p className="price">${price}</p>

                    <Buttons
                        product={product}
                    />

                </div>

            </div>

            <div className='maylike-products-wrapper'>
                <h2>You may also like</h2>
                <div className='marquee'>
                    <div className='maylike-products-container track'>
                        {products?.map((item) => (
                            <Product
                                key={item._id}
                                product={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )

}





