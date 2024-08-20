import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromCart, incQuantity, decQuantity, setQuantity } from './redux/cartSlice';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DiscountIcon from '@mui/icons-material/Discount';
import axios from 'axios';
import DiscountPopup from './Discount';



const Cart = () => {
    const [Discount, setDiscount] = useState(0);
    const [Tax, setTax] = useState(0.18);
    const cartItems = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();
    const [discountPopup, setDiscountPopup] = useState(false);
    let Total = 0;

    const [amountReceived, setAmountReceived] = useState(0);

    const handleAmountChange = (e) => {
        const received = parseFloat(e.target.value);
        setAmountReceived(received);
    };


    const handleRemoveCart = (id) => {
        dispatch(removeFromCart({ id: id }));
    };

    const handleincrementQuantity = (id) => {
        dispatch(incQuantity({ id: id }));

    };

    const handledecrementQuantity = (id) => {
        dispatch(decQuantity({ id: id }));

    };

    const handlesetQuantity = (id) => {
        dispatch(setQuantity({ id: id }));

    }


    const handleCheckout = async (e) => {
        e.preventDefault();
        if (cartItems.length <= 0) {
            alert('Please add items to cart');
            return;
        }
        try {
            const response = await axios.post("http://localhost:9000/checkout", {
                cartItems,
                total: (Total - (Discount * Total) + (Tax * Total)).toFixed(2),
                discount: (Discount * Total).toFixed(2),
                tax: (Tax * Total).toFixed(2)
            });
            console.log("Response received: ", response.data);
            if (response.status === 200) {
                for (let i = 0; i < cartItems.length; i++) {
                    dispatch(removeFromCart({ id: cartItems[i].id }));
                }
                window.location.reload();
                console.log("Checkout successful");
                alert("Checkout successful, Proceed to payment");
            }
        } catch (error) {
            console.log("Error while checking out: ", error.msg);
            alert("Failed to checkout");
        }
    };

    const handleAddDiscountHelper = () => {
        setDiscountPopup(true);
    };

    const handleAddDiscount = (discount) => {
        setDiscount(discount);
    };

    return (
        <div className="w-full py-4">
            <h1 className="text-white mb-4 text-2xl sm:text-3xl lg:text-4xl lg:leading-normal font-extrabold">CART</h1>
            {
                cartItems.map(item => {
                    Total += item.price * item.quantity;
                    return (
                        <div key={item.id} className="bg-white border border-purple-500 p-4 mb-2 flex justify-between items-center">
                            <div className='items-center gap-x-1.5 '>
                                <h4 className="text-lg font-semibold">{item.name} x{item.quantity}</h4>
                                <div className="py-2 px-3 inline-block bg-white border border-gray-200 rounded-lg">
                                    <button className="text-sm md:text-xl font- md:font-bold size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md 
                                 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                        onClick={() => handleincrementQuantity(item.id)}>+</button>
                                    <input
                                        className="p-0 w-6 bg-transparent border-0 text-center focus:ring-0
                                     [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none "
                                        type="number"
                                        value={item.quantity}
                                        min="1"
                                        onChange={(e) => handlesetQuantity(item.id, e.target.value)}
                                    />
                                    <button className="text-sm md:text-2xl font- md:font-bold size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-md 
                                 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none"
                                        onClick={() => handledecrementQuantity(item.id)}>-</button>
                                </div>
                                <p>Sub-total: {item.price * item.quantity}</p>
                            </div>
                            <button className="text-red-400 px-2 py-2 hover:text-red-700 transition-colors duration-300" onClick={() => handleRemoveCart(item.id)}>
                                <DeleteIcon />
                            </button>
                        </div>
                    );
                })
            }
            <div className="bg-white border border-purple-500 p-2 mb-2">
                <h4 className="text-lg font-semibold">POS fee </h4>
                <p>Sub-total: 1</p>
            </div>

            <div className="flex justify-between mt-4">
                <div className="w-1/3 px-4 bg-[#57cc99] border border-purple-800">
                    <h5 className='text-left text-xl'>Discount: {Discount * 100}%</h5>
                    <p className='text-center text-3xl'>{(Discount * Total).toFixed(2)}</p>
                </div>
                <div className="w-1/3 px-4 bg-[#0096c7] border border-purple-800">
                    <h5 className='text-left text-xl'>Tax: {Tax * 100}%</h5>
                    <p className='text-center text-3xl'>{(Tax * Total).toFixed(2)}</p>
                </div>
                <div className="w-1/3 px-4 bg-[#80ed99] border border-purple-800">
                    <h5 className='text-left text-xl'>Total:</h5>
                    <p className='text-center text-3xl'>{(Total - (Discount * Total) + (Tax * Total)).toFixed(2)}</p>
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <div className="w-2/3 px-4 bg-[#80ed99] border border-purple-800">
                    <h5 className='text-left text-xl'>Amount Received:</h5>
                    <input
                        id='amount-received'
                        className='text-center text-3xl'
                        type="number"
                        value={amountReceived}
                        onChange={handleAmountChange} />
                </div>
                <div className="w-1/3 px-4 bg-[#80ed99] border border-purple-800">
                    <h5 className='text-left text-xl'>Change:</h5>
                    <p className='text-center text-3xl'>
                        {isNaN(amountReceived) || isNaN(Total) || (amountReceived - Total) < 0
                            ? ""
                            : (amountReceived - (Total - (Discount * Total) + (Tax * Total)).toFixed(0))}
                    </p>
                </div>
            </div>

            <div className="flex justify-start">

                <button
                    onClick={handleCheckout}
                    className="flex items-center my-4 mr-4 justify-center w-1/4 py-2 px-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-300"
                >
                    Checkout <ShoppingCartCheckoutIcon className="ml-2" />
                </button>

                <button
                    onClick={handleAddDiscountHelper}
                    className="flex items-center my-4 justify-center w-1/3 py-2 px-4 bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300"
                >
                    Add Discount <DiscountIcon className="ml-2" />
                </button>

            </div>

            <DiscountPopup
                show={discountPopup}
                onClose={() => setDiscountPopup(false)}
                onSave={handleAddDiscount}
            />
        </div>
    );
};

export default Cart;
