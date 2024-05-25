import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddItem = () => {
    const navigate = useNavigate();
    const [ItemName, setItemName] = useState('');
    const [price, setItemPrice] = useState(0);
    const [cost, setItemCost] = useState(0);
    const [stock, setItemStock] = useState(0);
    const [imageURL, setItemImage] = useState('');

    const handleAddItem = async (e) => {
        e.preventDefault();

        if(!ItemName || !price || !cost || !stock) {
            alert('Please fill in all the fields');
            return;
        }

        try {
            const ItemData = {
               id: '0', name: ItemName, price, cost, stock, imageURL
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
            <h1 className= "text-3xl font-bold underline">ADD ITEM</h1>
            <form onSubmit={handleAddItem}>
                <div>
                    <label>Item Name</label>
                    <input
                        type="text"
                        value={ItemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Price</label>
                    <input
                        type="number"
                        value={price}
                        onChange={(e) => setItemPrice(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label>Cost</label>
                    <input
                        type="number"
                        value={cost}
                        onChange={(e) => setItemCost(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label>Stock</label>
                    <input
                        type="number"
                        value={stock}
                        onChange={(e) => setItemStock(parseInt(e.target.value))}
                    />
                </div>
                <div>
                    <label>Image URL</label>
                    <input
                        type="text"
                        value={imageURL}
                        onChange={(e) => setItemImage(e.target.value)}
                    />
                </div>
                <button type="submit">Add Item</button>
            </form>
        </div>
    )
}

export default AddItem;