'use client';

import React, { createContext, useState, useContext } from "react";

const Context = createContext();

export const StateContext = ({ children }) => {
    const [showCart, setShowCart] = useState(false);
    const [qty, setQty] = useState(1);
    const [cartItems, setCartItems] = useState([]);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);

    const incQty = () => {
        setQty((prevQty) => prevQty + 1)
    };

    const decQty = () => {
        setQty((prevQty) => {
            if (prevQty - 1 < 1) return 1;
            return prevQty - 1;
        })
    };

    return (
        <Context.Provider value={{
            qty,
            incQty,
            decQty,
            showCart,
            setShowCart,
            totalQuantities,
            setTotalQuantities,
            cartItems,
            setCartItems,
            totalPrice,
            setTotalPrice,
        }}>
            {children}
        </Context.Provider>
    );
};


export const useStateContext = () => useContext(Context);

