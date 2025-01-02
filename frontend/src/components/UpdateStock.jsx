import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import SearchField from './SearchField';
import StockListCard from './StockListCard';

const UpdateStock = () => {
    const navigate = useNavigate();
    const [ItemID, setItemID] = useState('');
    const [stock, setStock] = useState('');
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch Items
    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:9000/item/getItems");
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

    // Create search string for SearchField
    const ItemsSearchString = items.map(item => `${item.id} (${item.name}: ${item.stock})`);

    const handleUpdateStock = async (e) => {
        e.preventDefault();
      
        if (!ItemID || !stock) {
          alert('Please fill in all the fields');
          return;
        }
      
        try {
          const parsedId = ItemID.match(/^(\d+)\s*\(/)?.[1];
          const ItemData = {
            id: parsedId,
            field: 'stock', 
            value: stock, 
          };
      
          const response = await axios.put("http://localhost:9000/item/updateItem", ItemData);
          if (response.status === 200) {
            console.log("Item Stock Updated successfully");
            alert("Item Stock Updated Successfully");
      
            const updatedItems = await axios.get("http://localhost:9000/item/getItems");
            setItems(updatedItems.data);
      
            navigate('/updateStock');
          }
        } catch (error) {
          console.log("Error while Updating item Stock: ", error.message);
          alert("Failed to Update item Stock");
        }
      };
      

    return (
        <div className="container mt-24 mx-auto px-12 py-4">
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">UPDATE STOCK</h1>
            <form onSubmit={handleUpdateStock}>
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
                    <label className="text-white block mb-2 text-2xl font-medium my-2">Update Stock</label>
                    <input
                        type="text"
                        className="bg-gray-200 border border-[#33353F] placeholder-[#9CA2A9] text-gray-800 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Updated Stock'
                        value={stock}
                        onChange={(e) => setStock(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600 text-white font-medium py-2.5 px-5 rounded-lg w-48 h-12 border border-gray-300 my-5"
                >
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
                            <StockListCard item={item} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UpdateStock;
