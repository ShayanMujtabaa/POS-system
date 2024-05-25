import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
    const navigate = useNavigate();
    const [ItemName, setItemName] = useState('');
    const [price, setItemPrice] = useState(0);
    const [cost, setItemCost] = useState(0);
    const [stock, setItemStock] = useState(0);
    //if want to add images functionality later on
    const [imageURL, setItemImage] = useState('');

    const handleAddItem = async (e) => {
        e.preventDefault();

        if(!ItemName || !price || !cost || !stock) {
            alert('Please fill in all the fields');
            return;
        }

        try {
            const ItemData = {
               name: ItemName, price, cost, stock, imageURL
            };
            const response = await axios.post("http://localhost:9000/addItem", ItemData);
            if (response.status === 200) {
                console.log("ItemAdded successfully");
                alert("Item Added Successfuly")
                navigate('/home');
            }
        } catch (error) {
            console.log("Error while adding item: ", error.msg);
            alert("Failed to Add item");
        }
    };

    return (
        <div>
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">ADD ITEM</h1>
            <form onSubmit={handleAddItem}>
                <div>
                    <label  className="text-white block mb-2 text-2xl font-medium my-2" >Item Name</label>
                    <input
                        type="text"
                        className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Item Name'
                        value={ItemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2">Price</label>
                    <input
                        type="number"
                        className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Price'
                        value={price}
                        onChange={(e) => setItemPrice(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label  className="text-white block mb-2 text-2xl font-medium my-2" >Cost</label>
                    <input
                        type="number"
                        className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Cost'
                        value={cost}
                        onChange={(e) => setItemCost(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label  className="text-white block mb-2 text-2xl font-medium my-2" >Stock</label>
                    <input
                        type="number"
                        className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Stock'
                        value={stock}
                        onChange={(e) => setItemStock(parseInt(e.target.value))}
                    />
                </div>
                <button type="submit" className="bg-[#495057] hover:bg-[#343a40] text-white font-medium py-2.5 px-5 rounded-lg w-48 h-12 border border-gray-300 my-5">
                Add Item
                </button>

            </form>
        </div>
    )
}

export default AddItem;