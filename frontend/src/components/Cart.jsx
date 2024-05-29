import React from 'react';
import {useSelector} from "react-redux";


const Cart = () => {
    const cartItems = useSelector(state => state.cart.cart)
    console.log(cartItems)
    return (
        <div className="w-2/5 p-4 border-l border-gray-300">
            <h1 className="text-white mb-4 text-2xl sm:text-3xl lg:text-4xl lg:leading-normal font-extrabold">CART</h1>
            {
                cartItems.map(item => {
                    return (
                        <div key={item.id}>
                            <h4>{item.name}</h4>
                            <p>Price: {item.price}</p>
                            <p>Quantity: {item.quantity}</p>
                        </div>
                    )
                })
            }


           
        </div>
    );
};

export default Cart;