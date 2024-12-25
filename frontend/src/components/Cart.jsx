import React, { useState, useRef } from 'react';
import { useSelector, useDispatch } from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import { removeFromCart, incQuantity, decQuantity, setQuantity, clearCart, addToCart } from './redux/cartSlice';
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';
import DiscountIcon from '@mui/icons-material/Discount';
import axios from 'axios';
import DiscountPopup from './Discount';
import { useReactToPrint } from 'react-to-print';
import Receipt from './Receipt';
import { totalAmount, discount, tax, changeAmtRecCondition, change, refundAmount } from '../config/fomulas'
import HeldCartsList from './HeldCartsList';

const Cart = () => {
    const [Discount, setDiscount] = useState(0);
    const [Tax, setTax] = useState(0.18);
    const cartItems = useSelector(state => state.cart.cart);
    const dispatch = useDispatch();
    const [discountPopup, setDiscountPopup] = useState(false);
    const printRef = useRef(null);
    const [amountReceived, setAmountReceived] = useState(0);
    //2 state vars added by Hassan
    const [RetrievePopup, setRetrievePopup] = useState(false);
    const [RetrievedCart, setRetrievedCart] = useState("");
    let Total = 0;

    // This method not working ask hassan about it

    // const changeVal = change(amountReceived, Total, Discount, Tax);
    // const discountVal = discount(Discount, Total);
    // const taxVal = tax(Tax, Total);
    // const totalAmountVal = totalAmount(Total, Discount, Tax);
    // const refundAmountVal = refundAmount(Total, Discount, Tax)

    const handleAmountChange = (e) => {
        const received = parseFloat(e.target.value);
        setAmountReceived(received);
    };

    const handleRemoveCart = (id) => {
        dispatch(removeFromCart({ id: id }));
    };

    const handleClearCart = (id) => {
        dispatch(clearCart({ id: id }));
    }

    const handleincrementQuantity = (id) => {
        dispatch(incQuantity({ id: id }));

    };

    const handledecrementQuantity = (id) => {
        dispatch(decQuantity({ id: id }));

    };

    const handlesetQuantity = (id, quantity) => {
        dispatch(setQuantity({ id: id, quantity: parseInt(quantity) }));
    };

    const handlePrint = useReactToPrint({
        content: () => printRef.current 
    });

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (cartItems.length <= 0) {
            alert('Please add items to cart');
            return;
        }
        try {
            const response = await axios.post("http://localhost:9000/checkout", {
                cartItems,
                total: totalAmount(Total, Discount, Tax),
                discount: discount(Total, Discount),
                tax: tax(Tax, Discount)
            });
            console.log("Response received: ", response.data);
            if (response.status === 200) {
                handlePrint()
                for (let i = 0; i < cartItems.length; i++) {
                    dispatch(removeFromCart({ id: cartItems[i].id }));
                }
                console.log("Checkout successful");
            }
            
        } catch (error) {
            console.log("Error while checking out: ", error.response ? error.response.data : error.message);
            alert("Failed to checkout");
        }
    };

    const handleRefund = async (e) => {
        e.preventDefault();
        if (cartItems.length <= 0) {
            alert('Please select items to refund');
            return;
        }
        try {
            const response = await axios.post("http://localhost:9000/refund", {
                cartItems,
                refundAmount: refundAmount(Total, Discount, Tax)
            });
            console.log("Response received: ", response.data);
            if (response.status === 200) {
                for (let i = 0; i < cartItems.length; i++) {
                    dispatch(removeFromCart({ id: cartItems[i].id }));
                }
                console.log("Refund successful");
                alert("Refund processed successfully");
            }
        } catch (error) {
            console.log("Error while processing refund: ", error.msg);
            alert("Failed to process refund");
        }
    };

    const handleAddDiscountHelper = () => {
        setDiscountPopup(true);
    };

    const handleAddDiscount = (discount) => {
        setDiscount(discount);
    };

    //function added by Hassan:
    const handleCartHold = async (e) => {
        e.preventDefault();
        // alert(`Cart items are: ${JSON.stringify(cartItems)}`);
        if (cartItems.length <= 0) {
            alert('Please select items to hold');
            return;
        }
        try {
            const response = await axios.post("http://localhost:9000/holdCart", {
                cartItems
            });
            console.log("Response received: ", response.data);
            if (response.status === 200) {
                dispatch(clearCart());
                console.log("Cart hold successful");
                alert("Cart held successfully");
            }
        } catch (error) {
            console.log("Error while holding cart: ", error.msg);
            alert("Failed to hold cart");
        }
    }

    const handleRetrieveCartHelper = async (e) => {
        e.preventDefault();
        
        setRetrievePopup(true);
    }

    
    return (
        <div className="w-full">
            <h1 className="text-white mb-4 text-2xl sm:text-2xl lg:text-3xl lg:leading-normal font-extrabold">CART</h1>
            {
                cartItems.map(item => {
                    Total += item.price * item.quantity;
                    return (
                        <div key={item.id} className="bg-white border border-purple-500 p-2 pl-4 mb-2 flex justify-between items-center">
                            <div className='items-center gap-x-1.5'>
                                <div className='flex mb-2'>
                                    <h4 className="text-base font-semibold mr-2">{item.name}</h4>
                                    <h4 className='text-sm justify-self-center mt-0.5'>@Rs. {item.price}</h4>
                                </div>
                                <div className='flex mb-1'>
                                    <div className="relative flex items-center max-w-[7rem]">
                                        <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-sm p-2.5 h-9
                                     focus:ring-gray-100 focus:ring-2 focus:outline-none"
                                            onClick={() => handleincrementQuantity(item.id)}>
                                            <svg class="w-2 h-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 1v16M1 9h16" />
                                            </svg>
                                        </button>
                                        <input
                                            className="bg-gray-50 border-x-0 border-gray-300 h-9 text-end
                                        text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 
                                        block w-1/3 py-2.5 dark:border-e-gray-700 dark:border-gray-700 dark:bg-gray-200"
                                            type="number"
                                            value={item.quantity}
                                            min="1"
                                            onChange={(e) => handlesetQuantity(item.id, e.target.value)}
                                        />
                                        <button className="bg-gray-100 hover:bg-gray-200 border border-gray-300 
                                    rounded-e-sm p-2.5 h-9 focus:ring-gray-100 focus:ring-2 focus:outline-none"
                                            onClick={() => handledecrementQuantity(item.id)}>
                                            <svg class="w-2 h-2 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h16" />
                                            </svg>
                                        </button>
                                    </div>
                                    <div className='flex mt-1.5 text-sm'>
                                        <p>Rs.&nbsp;</p>
                                        <p className='font-semibold'>{item.price * item.quantity}</p>
                                    </div>
                                </div>
                            </div>
                            <button className="text-red-400 px-2 py-2 hover:text-red-700 transition-colors duration-300" onClick={() => handleRemoveCart(item.id)}>
                                <DeleteIcon />
                            </button>
                        </div>
                    );
                })
            }

            {/* Use After FBR Integration */}

            {/* <div className="bg-white border border-purple-500 p-2 mb-2">
                <h4 className="text-lg font-semibold">POS fee </h4>
                <p>Amount: 1</p>
            </div> */}

            <div className="flex justify-between mt-3">
                <div className="w-2/4 pl-2 pb-2 bg-[#50b789] border border-purple-800">
                    <h5 className='text-left text-lg font-semibold'>Tax: {Tax * 100}%</h5>
                    <p className='text-left text-xl'>{tax(Total, Tax)}</p>
                </div>
                <div className="w-2/3 pl-2 pb-2 bg-[#57cc99] border border-purple-800">
                    <h5 className='text-left text-lg font-semibold'>Discount: {Discount * 100}%</h5>
                    <p className='text-left text-xl'>{discount(Total, Discount)}</p>
                </div>

                <div className="w-2/3 pl-2 pb-2 bg-[#60e0a6] border border-purple-800">
                    <h5 className='text-left text-lg font-semibold'>Total:</h5>
                    <p className='text-left text-xl'>{totalAmount(Total, Discount, Tax)}</p>
                </div>
            </div>

            <div className="flex justify-between mt-3">
                <div className="w-2/3 px-4 bg-[#0096C7] border border-purple-800">
                    <h5 className='font-semibold text-left text-lg'>Amount Received:</h5>
                    <input
                        id='amount-received'
                        className='pl-1 text-left text-xl bg-[#0096C7] mb-2'
                        type="number"
                        onChange={handleAmountChange} />
                </div>
                <div className="w-1/3 px-4 bg-[#30add3] border border-purple-800">
                    <h5 className='font-semibold text-left text-lg'>Change:</h5>
                    <p className='pl-1 text-left text-xl'>
                        {isNaN(amountReceived) || isNaN(Total)
                            || amountReceived < changeAmtRecCondition(Total, Discount, Tax)
                            || change(amountReceived, Total, Discount, Tax) < 0
                            ? ""
                            : change(amountReceived, Total, Discount, Tax)}

                    </p>
                </div>
            </div>

            <div className="flex justify-start h-16 mb-1 mt-3">

                <button
                    onClick={handleCheckout}
                    ref={printRef.current}
                    className="flex items-center my-1 mr-2 ml-1 justify-center w-2/4 py-2 px-2 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-300"
                >
                    Checkout <ShoppingCartCheckoutIcon className="ml-2" />
                </button>



                <button
                    onClick={handleAddDiscountHelper}
                    className="flex items-center my-1 justify-center w-2/4 py-2 px-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300"
                >
                    Add Discount <DiscountIcon className="ml-2" />
                </button>

                <button
                    onClick={handleClearCart}
                    className="flex items-center my-1 justify-center w-2/4 py-2 px-2 ml-2 bg-red-500 text-white font-semibold rounded-md hover:bg-green-700 transition-colors duration-300"
                >
                    Clear Cart <DeleteIcon className="ml-2" />
                </button>
            </div>

            <div className="flex justify-start">
                <button
                    onClick={handleRefund}
                    className="bg-[#ff5a5f] mx-1 text-white p-2 rounded w-1/2 hover:bg-red-700 transition-colors duration-300"
                >
                    Refund Purchase
                </button>

                <button className="bg-green-600 mx-1 text-white p-2 rounded w-1/2 hover:bg-green-700 transition-colors duration-300" onClick={handleCartHold}>
                    
                    Put on Hold
                </button>

                <button className="bg-green-600 mx-1 text-white p-2 rounded w-1/2 hover:bg-green-700 transition-colors duration-300" onClick={handleRetrieveCartHelper}>
                    Reterive Held Bills
                </button>
            </div>

            <div style={{ display: "none" }}>
                <Receipt ref={printRef} cartItems={cartItems} subTotal={(Total).toFixed(2)} Total={totalAmount(Total, Discount, Tax)}
                    Discount={Discount * 100} Tax={Tax * 100} taxAmount={tax(Total, Tax)} amountReceived={amountReceived} DiscountPrice={discount(Total, Discount)}
                    change={change(amountReceived, Total, Discount, Tax)} />
            </div>

            <DiscountPopup
                show={discountPopup}
                onClose={() => setDiscountPopup(false)}
                onSave={handleAddDiscount}
            />

            
            { RetrievePopup &&
            <HeldCartsList setRetrievePopup={setRetrievePopup} />}
        </div>
    );
};


export default Cart;

