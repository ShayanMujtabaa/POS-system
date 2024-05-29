import React, { useState, useEffect } from "react";
import axios from 'axios';
import ItemCard from "./ItemCard";


const HomePage = () => {
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
            <div className="flex flex-wrap -mx-2">
            {items.map(item => (
                <div key={item.id} className="w-1/6 px-2">
                <ItemCard item={item} />
                </div>
            ))}
            </div>
        </div>
    );
}

export default HomePage;