import React, { useState, useEffect } from "react";
import axios from 'axios';
import ItemCard from "./ItemCard";
import {useDispatch} from "react-redux";
import { addToCart, removeFromCart } from "./redux/cartSlice";
import {useSelector} from "react-redux";
import Cart from "./Cart";

const HomePage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cart)
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

    const handleAddToCart = (event, item) => {
        event.preventDefault();
        const quantity = prompt("Enter Quantity: ");
        if (quantity === null) {
            return;
        }
        // setQuantity(quantity);
        dispatch(addToCart({ id: item.id, name: item.name, price: item.price, quantity: quantity }))
    }

    return (
        <div className="flex">
            <div className={`p-4 ${cartItems.length > 0 ? 'w-full lg:w-2/3' : 'w-full'}`}>
                {loading && <p>Loading...</p>}
                <div className="flex flex-wrap -mx-2">
                    {items.map(item => (
                        <div key={item.id} className={`w-full px-2 ${cartItems.length <=  0 ? 'sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6'  :  'sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/4 '}`} onClick={(event) => {handleAddToCart(event, item)}}>
                            <ItemCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
            {cartItems.length > 0 && (
                <div className="w-full lg:w-1/3 p-4 border-l border-gray-300">
                    <Cart items={cartItems} />
                </div>
            )}
        </div>
    );
}

export default HomePage;