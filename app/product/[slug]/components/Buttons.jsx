'use client'


import React from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { useStateContext } from '../../../context/StateContext'


import { toast } from 'react-toastify';


export default function Buttons({ product }) {
    const { decQty, incQty, qty, setTotalQuantities, cartItems, setCartItems, setTotalPrice, setShowCart } = useStateContext();


    function onAdd(product, quantity) {
        //is product already in cart check
        const checkProductInCart = cartItems.find((item) => item._id === product._id);

        setTotalPrice((prevTotalPrice) => prevTotalPrice + product.price * quantity);
        setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + quantity);

        if (checkProductInCart) {
            //map over current cart items
            const updatedCartItems = cartItems.map((cartProduct) => {
                // return new object which will spread cartProduct but it's going to update quantity of that product
                if (cartProduct._id === product._id) return {
                    ...cartProduct,
                    quantity: cartProduct.quantity + quantity
                }
            })

            setCartItems(updatedCartItems);
            //if item doesn't exists in the cart
        } else {
            product.quantity = quantity;

            setCartItems([...cartItems, { ...product }]);

        }
        toast.success(`${qty} ${product.name} added to the cart.`);
    }

    const handleBuyNow = () => {
        onAdd(product, qty);

        setShowCart(true);
    }

    return (
        <>
            <div className="quantity">
                <h3>Quantity:</h3>
                <p className='quantity-desc'>
                    <span className='minus' onClick={decQty}><AiOutlineMinus /></span>
                    <span className='num'>{qty}</span>
                    <span className='plus' onClick={incQty}><AiOutlinePlus /></span>
                </p>
            </div>

            <div className='buttons'>
                <button onClick={() => onAdd(product, qty)} type='button' className='add-to-cart'>
                    Add To Cart
                </button>
                <button type='button' className='buy-now' onClick={handleBuyNow}>
                    Buy Now
                </button>
            </div>
        </>
    )
}
