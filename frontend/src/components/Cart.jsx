import React from 'react';
import {useSelector} from "react-redux";


const Cart = () => {
    const cartItems = useSelector(state => state.cart.cart)
    console.log(cartItems)
    return (
        <div className="w-full p-4 border-l border-gray-300">
            <h1 className="text-white mb-4 text-2xl sm:text-3xl lg:text-4xl lg:leading-normal font-extrabold">CART</h1>
            {
                cartItems.map(item => {
                    return (
                        <div key={item.id} className="bg-white border border-purple-500 p-4 mb-2">
                            <h4 className="text-lg font-semibold" >{item.name} x{item.quantity} </h4>
                            <p>Total: {item.price * item.quantity}</p>
                        </div>
                    )
                })
            }


           
        </div>
    );
};

export default Cart;