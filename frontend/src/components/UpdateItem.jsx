import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import SearchField from './SearchField';
import ListItemCard from './ListItemCard';

const UpdateItem = () => {
    const navigate = useNavigate();
    const [ItemID, setItemID] = useState('');
    const [field, setField] = useState('');
    const [value, setValue] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');

    const { items: reduxItems } = useSelector((state) => ({
        items: state.items.items,
    }));

    const ItemsSearchString = reduxItems.map(item => `${item.id} (${item.name})`);

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

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.post("http://localhost:9000/getcategories");
                const data = response.data;
                setCategories(data);
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    const handleUpdateItem = async (e) => {
        e.preventDefault();

        if (!ItemID || !field || (field !== 'category' && !value)) {
            alert('Please fill in all the fields');
            return;
        }

        try {
            const parsedId = ItemID.match(/^(\d+)\s*\(/)?.[1];
            const ItemData = {
                id: parsedId,
                field,
                value: field === 'category' ? selectedCategory : value
            };
            const response = await axios.post("http://localhost:9000/updateItem", ItemData);
            if (response.status === 200) {
                alert("Item Updated Successfully");
                navigate('/itemPage');
            }
        } catch (error) {
            console.log("Error while Updating item: ", error.message);
            alert("Failed to Update item");
        }
    };

    return (
        <div className="container mt-24 mx-auto px-12 py-4">
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">UPDATE ITEM</h1>
            <form onSubmit={handleUpdateItem}>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2">Item ID</label>
                    <SearchField
                        options={ItemsSearchString}
                        label="Item ID"
                        value={ItemID}
                        onChange={(value) => setItemID(value)}
                        defaultOther={false}
                    />
                </div>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2">Update Field</label>
                    <select
                        className="text-gray-800 bg-gray-200 border border-[#33353F] placeholder-[#9CA2A9] text-sm rounded-lg block w-full p-2.5 mb-6"
                        onChange={(e) => { setField(e.target.value); setValue(''); setSelectedCategory(''); }}
                    >
                        <option value="">Select Field</option>
                        <option value="name">Item Name</option>
                        <option value="category">Item Category</option>
                        <option value="price">Item Price</option>
                        <option value="cost">Item Cost</option>
                        <option value="stock">Item Stock</option>
                    </select>
                </div>

                {field === 'category' && (
                    <div>
                        <label className="text-white block mb-2 text-2xl font-medium my-2">Category</label>
                        <select
                            className="bg-gray-200 border border-[#33353F] text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                        >
                            <option value="" disabled>Select a category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category.name}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {field !== 'category' && (
                    <div>
                        <label className="text-white block mb-2 text-2xl font-medium my-2">Update Value</label>
                        <input
                            type="text"
                            className="bg-gray-200 border border-[#33353F] placeholder-[#9CA2A9] text-gray-800 text-sm rounded-lg block w-full p-2.5 mb-6"
                            placeholder='Updated Value'
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                )}

                <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600 text-white font-medium py-2.5 px-5 rounded-lg w-48 h-12 border border-gray-300 my-5">
                    Update Item
                </button>
            </form>
            <br />
            <h1 className="text-white mb-4 text-2xl sm:text-3xl lg:text-6xl lg:leading-normal font-bold">ALL ITEMS</h1>
            <div className={`p-4 w-full`}>
                {loading && <p>Loading...</p>}
                <div className="flex flex-wrap -mx-2">
                    {items.map(item => (
                        <div key={item.id} className={'sm:w-1/2 md:w-1/2 lg:w-1/2 xl:w-1/6'}>
                            <ListItemCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpdateItem;
