
import './globals.css';

import HeroBanner from './components/HeroBanner';
import Product from './components/Product';
import FooterBanner from './components/FooterBanner';

import { client } from '../lib/client';

export default async function Home({ id }) {

  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return (
    <>
      <div>
        {bannerData?.map((banner) => (
          <HeroBanner
            key={banner._id}
            smallText={banner.smallText}
            midText={banner.midText}
            largeText={banner.largeText1}
            bannerImage={banner.image}
            bannerProduct={banner.product}
            bannerButtonText={banner.buttonText}
            bannerDesc={banner.desc}
          />
        ))}
      </div>

      <div className='products-heading'>
        <h2>Best Selling Products</h2>
        <p>Designed for your needs!</p>
      </div>

      <div className='products-container'>
        {products?.map((product) =>
          <Product
            key={product._id}
            product={product} />
        )}
      </div>

      <FooterBanner
        footerBanner={bannerData && bannerData[0]}
        key={id} />
    </>
  );
};










