import React from 'react';
import {useSelector} from "react-redux";
import {useDispatch} from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromCart } from './redux/cartSlice';


const Cart = () => {
    const cartItems = useSelector(state => state.cart.cart)
    const dispatch = useDispatch();
    console.log(cartItems)

    const handleRemoveCart = (id) => {
        dispatch(removeFromCart({id: id}))
    }
    return (
        <div className="w-full p-4 border-l border-gray-300">
            <h1 className="text-white mb-4 text-2xl sm:text-3xl lg:text-4xl lg:leading-normal font-extrabold">CART</h1>
            {
                cartItems.map(item => {
                    return (
                        <div key={item.id} className="bg-white border border-purple-500 p-4 mb-2 flex justify-between items-center">
                        <div>
                            <h4 className="text-lg font-semibold">{item.name} x{item.quantity}</h4>
                            <p>Sub-total: {item.price * item.quantity}</p>
                        </div>
                        <button className="text-red-400 px-2 py-2 hover:text-red-700 transition-colors duration-300" onClick={() => {handleRemoveCart(item.id)}}> <DeleteIcon/> </button>
                    </div>
                    )
                })
            }


           
        </div>
    );
};

export default Cart;