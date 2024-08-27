import React, { useState, useEffect } from "react";
import axios from 'axios';
import ItemCard from "../components/ItemCard";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../components/redux/cartSlice";
import Cart from "../components/Cart";
import QuantityCard from "../components/QuantityCard";

const HomePage = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.cart);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [quantityCard, setQuantityCard] = useState({ show: false, item: null });
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.post("http://localhost:9000/getItems");
                const data = response.data;
                setItems(data);
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchItems();
    }, []);

    const handleAddToCartHelper = (item) => {
        handleAddToCart(1, item);
    };

    const handleAddToCart = (quantity, item) => {
        dispatch(addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            quantity,
        }));
    };

    const handleAddToCartBarcode = (item) => {
        dispatch(addToCart({ id: item.id, name: item.name, price: item.price, quantity: 1 }));
    };


    const filteredItems = items.filter(item =>
        ((item.name.toLowerCase().includes(searchTerm.toLowerCase()))
            || item.id.toLowerCase().includes(searchTerm.toLowerCase()))
        && (selectedCategory === '' || item.category === selectedCategory)
    );

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && filteredItems.length === 1) {

            handleAddToCartBarcode(filteredItems[0])
            setSearchTerm('')
        }
    }


    const distinctCategories = [...new Set(items.map(item => item.category))];

    return (
        <div className="p-4">
            <div className="flex justify-start items-left mb-4">

                <input
                    type="text"
                    placeholder="Search..."
                    className="border p-2 mx-1 rounded w-1/2"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <select
                    className="border p-2 mx-1 rounded w-1/5"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">All</option>

                    {distinctCategories.map(category => (
                        <option key={category} value={category}>{category}</option>
                    ))}
                </select>
            </div>

            <div className="flex">
                <div className={`p-4 ${cartItems.length > 0 ? 'w-full lg:w-2/3' : 'w-full'}`}>
                    {loading && <p>Loading...</p>}
                    <div className="flex flex-wrap -mx-2">
                        {filteredItems.map(item => (
                            <div key={item.id} className={`w-full px-2 ${cartItems.length <= 0 ? 'sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/6' : 'sm:w-1/1 md:w-1/2 lg:w-1/2 xl:w-1/4'}`}>
                                <ItemCard item={item} onClick={() => handleAddToCartHelper(item)} />
                            </div>
                        ))}
                    </div>
                </div>
                {cartItems.length > 0 && (
                    <div className="w-full lg:w-1/3 p-4 border-l border-gray-300">
                        <Cart items={cartItems} />
                    </div>
                )}
                {quantityCard.show && (
                    <QuantityCard
                        item={quantityCard.item}
                        show={quantityCard.show}
                        onClose={() => setQuantityCard({ show: false, item: null })}
                        onSave={handleAddToCart}
                    />
                )}
            </div>
        </div>
    );
}

export default HomePage;
