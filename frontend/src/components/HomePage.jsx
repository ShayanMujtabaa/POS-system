import React, { useState, useEffect } from "react";
import axios from 'axios';
import ItemCard from "./ItemCard";
import {useDispatch} from "react-redux";
import { addToCart, removeFromCart } from "./redux/cartSlice";
import {useSelector} from "react-redux";
import Cart from "./Cart";
import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout';


const HomePage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cart)
    let quantity =4;
    console.log(cartItems.length);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            const response = await axios.post("http://localhost:9000/getItems");
            const data = response.data;
            setItems(data);
            setLoading(false);
        };
        
        fetchItems();
    }, []);

    const handleCheckout = async (e) => {
        e.preventDefault();
        console.log(cartItems);
        if (cartItems.length <= 0) {
            alert('Please add items to cart');
            return;
        }
        try {
            const response = await axios.post("http://localhost:9000/checkout", cartItems);
            if (response.status === 200) {
                for (let i = 0; i < cartItems.length; i++) {
                    dispatch(removeFromCart({id: cartItems[i].id}))
                }
                window.location.reload();
                console.log("Checkout successful");
                alert("Checkout successful, Proceed to payment");
            }
        } catch (error) {
            console.log("Error while checking out: ", error.msg);
            alert("Failed to checkout");
        }
    }

    return (
        <div className="flex">
            <div className={`p-4 ${cartItems.length > 0 ? 'w-full lg:w-2/3' : 'w-full'}`}>
                {loading && <p>Loading...</p>}
                <div className="flex flex-wrap -mx-2">
                    {items.map(item => (
                        <div key={item.id} className={`w-full px-2 ${cartItems.length <=  0 ? 'sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6'  :  'sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/4 '}`} onClick={() => { dispatch(addToCart({ id: item.id, name: item.name, price: item.price, quantity: quantity })) }}>
                            <ItemCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
            {cartItems.length > 0 && (
                <div className="w-full lg:w-1/3 p-4 border-l border-gray-300">
                    <Cart items={cartItems} />
                    <button 
                        onClick={handleCheckout} 
                        className="flex items-center justify-center w-1/4 py-2 px-4 bg-purple-500 text-white font-semibold rounded-md hover:bg-purple-700 transition-colors duration-300"
                    >
                        Checkout <ShoppingCartCheckoutIcon className="ml-2" />
                    </button>
                </div>
            )}
        </div>
    );
}

export default HomePage;