import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AddItem = () => {
    const navigate = useNavigate();
    const [ItemID, setItemID] = useState('');
    const [ItemName, setItemName] = useState('');
    const [price, setItemPrice] = useState(0);
    const [cost, setItemCost] = useState(0);
    const [stock, setItemStock] = useState(0);
    const [category, setItemCategory] = useState('');
    //if want to add images functionality later on
    const [imageURL, setItemImage] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.post("http://localhost:9000/getcategories");
                const data = response.data;
                setCategories(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching items:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleAddItem = async (e) => {
        e.preventDefault();

        if (!ItemID || !ItemName || !price || !cost || !stock || !category) {
            alert('Please fill in all the fields');
            return;
        }

        try {
            const ItemData = {
                id: ItemID, name: ItemName, price, cost, stock, category, imageURL
            };
            const response = await axios.post("http://localhost:9000/addItem", ItemData);
            if (response.status === 200) {
                console.log("ItemAdded successfully");
                alert("Item Added Successfuly")
                navigate('/itemPage');
            }
        } catch (error) {
            console.log("Error while adding item: ", error.msg);
            alert("Failed to Add item");
        }
    };

    return (
        <div className="container mt-24 mx-auto px-12 py-4">
            <h1 className="text-white  mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">ADD ITEM</h1>
            <form onSubmit={handleAddItem}>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2" >Item ID</label>
                    <input
                        type="text"
                        className="bg-gray-200 border border-[#33353F] placeholder-black text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Item ID'
                        value={ItemID}
                        onChange={(e) => setItemID(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2" >Item Name</label>
                    <input
                        type="text"
                        className="bg-gray-200 border border-[#33353F] placeholder-black text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Item Name'
                        value={ItemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2" >Category</label>
                    <input
                        type="text"
                        className="bg-gray-200 border border-[#33353F] placeholder-black text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='category'
                        value={category}
                        onChange={(e) => setItemCategory(e.target.value)}
                    />
                </div>

                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2" >Category</label>
                    <select
                        className="bg-gray-200 border border-[#33353F] placeholder-black text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                        <option value="" disabled>Select a category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2">Price</label>
                    <input
                        type="number"
                        className="bg-gray-200 border border-[#33353F] placeholder-black text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Price'
                        value={price}
                        onChange={(e) => setItemPrice(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2" >Cost</label>
                    <input
                        type="number"
                        className="bg-gray-200 border border-[#33353F] placeholder-black text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Cost'
                        value={cost}
                        onChange={(e) => setItemCost(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2" >Stock</label>
                    <input
                        type="number"
                        className="bg-gray-200 border border-[#33353F] placeholder-black text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Stock'
                        value={stock}
                        onChange={(e) => setItemStock(parseInt(e.target.value))}
                    />
                </div>
                <button type="submit" className="text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600 font-medium py-2.5 px-5 rounded-lg w-48 h-12 border border-gray-300 my-5">
                    Add Item
                </button>

            </form>

        </div>
    )
}

export default AddItem;