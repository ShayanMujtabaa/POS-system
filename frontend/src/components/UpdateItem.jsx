import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const UpdateItem = () => {
    const navigate = useNavigate();
    const [ItemID, setItemID] = useState('');
    const [field, setField] = useState('');
    const [value, setValue] = useState('');
    //if want to add images functionality later on

    const handleUpdateItem = async (e) => {
        e.preventDefault();

        if(!ItemID || !field || !value) {
            alert('Please fill in all the fields');
            return;
        }

        try {
            const ItemData = {
              id: ItemID, field, value,
            };
            const response = await axios.post("http://localhost:9000/updateItem", ItemData);
            if (response.status === 200) {
                console.log("ItemUpdated successfully");
                alert("Item Updated Successfuly")
                navigate('/home');
            }
        } catch (error) {
            console.log("Error while Updating item: ", error.msg);
            alert("Failed to Update item");
        }
    };

    return (
        <div className="container mt-24 mx-auto px-12 py-4">
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">UPDATE ITEM</h1>
            <form onSubmit={handleUpdateItem}>
                 <div>
                    <label  className="text-white block mb-2 text-2xl font-medium my-2" >Item ID</label>
                    <input
                        type="text"
                        className="bg-gray-200 border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Item ID'
                        value={ItemID}
                        onChange={(e) => setItemID(e.target.value)}
                    />
                </div>
                <div>
                    <label  className="text-white block mb-2 text-2xl font-medium my-2" >Update Field</label>
                    <select 
                    className="bg-gray-200 border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 mb-6"
                    onChange={(e) => {setField(e.target.value)}}>
                        <option value = "">Select Field</option>
                        <option value = "name">Item Name</option>
                        <option value = "price">Item Price</option>
                        <option value = "cost">Item Cost</option>
                        <option value = "stock">Item Stock</option>
                    </select>
                </div>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2">Update Value</label>
                    <input
                        type="text"
                        className="bg-gray-200 border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Updated Value'
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                    />
                </div>
                <button type="submit" className="bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600 text-white font-medium py-2.5 px-5 rounded-lg w-48 h-12 border border-gray-300 my-5">
                Update Item
                </button>

            </form>
        </div>
    )
}

export default UpdateItem;