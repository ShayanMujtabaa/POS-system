import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import ReportIcon from '@mui/icons-material/Report';

const ItemPage = ()=>{
    const navigate = useNavigate();
    const [lowItems, setLowItems] = useState([]);
    const THRESHOLD = 15;

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await axios.get("http://localhost:9000/item/getItems");
                const data = response.data;
                const filteredLowItems = data.filter(item => item.stock < THRESHOLD);
                setLowItems(filteredLowItems);
                console.log("Low items:", filteredLowItems);
            } catch (error) {
                console.error("Error fetching items:", error);
            }
        };

        fetchItems();
    }, []);
    return (
        <>
            <h1 className="lg:text-8xl sm:text-4xl text-white font-bold text-center my-4">Item Control</h1>

            {lowItems.length > 0 && (
                <div className="bg-red-100 p-4 rounded-lg mb-4 w-full max-w-2xl mx-auto">
                    <h2 className="text-2xl font-bold text-red-700 mb-2"> <ReportIcon /> Low Stock Items</h2>
                    <ul className="list-disc pl-5">
                        {lowItems.map(item => (
                            <li key={item.id} className="text-black">
                                {item.name} - {item.stock}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <div className="flex flex-col items-center justify-center">
                <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
                    <button
                        className="w-full lg:py-14 sm:py-7 my-4 border-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600"
                        onClick={() => { navigate("/addItem") }}
                    >
                        Add Item  <AddIcon className="text-5xl" />
                    </button>
                    <button
                        className="w-full lg:py-14 sm:py-7 my-4 border-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600"
                        onClick={() => { navigate("/deleteItem") }}
                    >
                        Delete Item <DeleteIcon className="text-5xl" />
                    </button>
                    <button
                        className="w-full lg:py-14 sm:py-7 my-4 border-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600"
                        onClick={() => { navigate("/updateItem") }}
                    >
                        Update Item <AutoFixHighIcon className="text-5xl" />
                    </button>

                </div>
            </div >
        </>
    );
}

export default ItemPage;