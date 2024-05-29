import React, { useState, useEffect } from "react";
import axios from 'axios';
import ItemCard from "./ItemCard";
import {useDispatch} from "react-redux";
import { addToCart } from "./redux/cartSlice";
import {useSelector} from "react-redux";
import Cart from "./Cart";


const HomePage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cart)
    let quantity =4;
    console.log(cartItems);
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

    return (
        <div>
            {loading && <p>Loading...</p>}
            <div className="flex flex-wrap -mx-2" >
            {items.map(item => (
                <div key={item.id} className="w-1/6 px-2" onClick={()=>{dispatch(addToCart({id: item.id, name: item.name, price: item.price, quantity: quantity}))}}>
                <ItemCard item={item} />
                </div>
            ))}
            </div>
            <div >
                <Cart items={cartItems} />
            </div>
        </div>
    );
}

export default HomePage;