'use client';

import React, { useRef } from 'react'
import Link from 'next/link';

import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai';
import { TiDeleteOutline } from 'react-icons/ti';

import getStripe from '../../lib/getStripe';

import { toast } from 'react-toastify';

import { useStateContext } from '../context/StateContext';

import { urlFor } from '../../lib/client';
import Image from 'next/image';


const Cart = () => {

    const cartRef = useRef();
    const { totalPrice, setTotalPrice, cartItems, setCartItems, setShowCart, totalQuantities, setTotalQuantities, decQty, incQty, qty } = useStateContext();

    const handleCheckout = async () => {
        const stripe = await getStripe();

        const response = await fetch('/api/stripe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cartItems),
        });

        if (response.statusCode === 500) return;

        const data = await response.json();
        console.log(data)
        toast.loading('Redirecting...');

        stripe.redirectToCheckout({ sessionId: data.id });

    }


    let foundProduct;
    let index;


    const toggleCartItemQuanitity = (id, value) => {
        foundProduct = cartItems.find((item) => item._id === id)
        index = cartItems.findIndex((product) => product._id === id);
        const newCartItems = [...cartItems];

        if (value === 'inc') {
            newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity + 1 };
            setCartItems(newCartItems);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities(prevTotalQuantities => prevTotalQuantities + 1);
        } else if (value === 'dec') {
            if (foundProduct.quantity > 1) {
                newCartItems[index] = { ...foundProduct, quantity: foundProduct.quantity - 1 };
                setCartItems(newCartItems);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities(prevTotalQuantities => prevTotalQuantities - 1);
            }
        };
    };

    const onRemove = (product) => {
        foundProduct = cartItems.find((item) => item._id === product._id);
        const newCartItems = cartItems.filter((item) => item._id !== product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price * foundProduct.quantity);
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity);
        setCartItems(newCartItems);
    };

    return (

        <div className='cart-wrapper' ref={cartRef}>
            <div className='cart-container'>
                <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
                    <AiOutlineLeft />
                    <span className='heading'>Your Cart</span>
                    <span className='cart-num-items'>({totalQuantities} items)</span>
                </button>

                {cartItems.length < 1 && (
                    <div className='empty-cart'>
                        <AiOutlineShopping size={140} />
                        <h3>Your Shopping Bag is Empty</h3>
                        <Link href='/'>
                            <button type='button' onClick={() => setShowCart(false)} className='btn'>
                                Continue Shopping
                            </button>
                        </Link>
                    </div>
                )}

                <div className='product-container'>
                    {cartItems.length >= 1 && cartItems?.map((item, index) => (
                        <div className='product' key={item._id} >
                            <Image
                                alt='cart-product'
                                width={350}
                                height={350}
                                src={urlFor(item?.image[0]).width(250).url()}
                                className='cart-product-image'
                                unoptimized={true}
                            />
                            <div className='item-desc'>
                                <div className='flex top'>
                                    <h5>{item.name}</h5>
                                    <h4>${item.price}</h4>
                                </div>
                                <div className='flex bottom'>
                                    <div>
                                        <p className='quantity-desc'>
                                            <span className='minus' onClick={() => toggleCartItemQuanitity(item._id, 'dec')}><AiOutlineMinus /></span>
                                            <span className='num'>{item.quantity}</span>
                                            <span className='plus' onClick={() => toggleCartItemQuanitity(item._id, 'inc')}><AiOutlinePlus /></span>
                                        </p>
                                    </div>
                                    <button type='button' className='remove-item' onClick={() => onRemove(item)}>
                                        <TiDeleteOutline />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {cartItems.length >= 1 && (
                    <div className='cart-bottom'>
                        <div className='total'>
                            <h3>Subtotal:</h3>
                            <h3>${totalPrice}</h3>
                        </div>
                        <div className='btn-container'>
                            <button type='button' className='btn' onClick={handleCheckout}>
                                Pay with Stripe
                            </button>
                        </div>
                    </div >
                )}
            </div>
        </div>
    );
};

export default Cart;