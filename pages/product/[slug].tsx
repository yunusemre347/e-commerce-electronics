import React, { useState } from 'react';
import { client, urlFor } from '@/lib/client';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/StateContext';

const ProductDetails = ({
  product,
  products,
}: {
  product: any;
  products: any;
}) => {
  const [index, setIndex] = useState(0);
  const { incQty, decQty, qty, onAdd, setShowCart,cartItems } = useStateContext() || {}; // Using default value as empty object

  const handleBuyNow = () => {
    const doesCartHave=cartItems?.map((item:any)=>(item.name)).includes(product.name)
     
    if( !doesCartHave){
      qty && onAdd?.(product, qty);
    }
console.log(cartItems?.map((item:any)=>(item.name)).includes(product.name))
    setShowCart?.(true);
  };

  const { image, name, details, price } = product;
  return (
    <div>
      <div className='product-detail-container'>
        <div>
          <div className='image-container'>
            <img
              src={urlFor(image && image[index]).url()}
              alt='product image'
              className='product-detail-image'
            />
          </div>
          <div className='small-images-container'>
            {image?.map((item: any, i: any) => (
              <img
                src={urlFor(item).url()}
                alt='small images'
                className={
                  i === index ? 'small-image selected-image' : 'small-image'
                }
                key={i}
                onMouseEnter={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className='price'>₺{price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span className='minus' onClick={decQty}>
                <AiOutlineMinus />{' '}
              </span>
              <span className='num'>{qty}</span>
              <span className='plus' onClick={incQty}>
                <AiOutlinePlus />{' '}
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => qty && onAdd?.(product, qty)}
            >
              Add to Cart
            </button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>

      <div className='maylike-product-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <div className='maylike-products-container track'>
            {products.map((item: any) => (
              <Product key={item._id} product={item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export const getStaticPaths = async () => {
  const query = '*[_type=="product"] { slug { current }}';
  const products = await client.fetch(query);

  const paths = products.map((product: any) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({
  params: { slug },
}: {
  params: any;
  slug: string;
}) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';
  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};

export default ProductDetails;
