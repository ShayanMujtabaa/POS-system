import React, { useState } from 'react';

const QuantityCard = ({ item, show, onClose, onSave }) => {
    const [inputValue, setInputValue] = useState('');

    if (!show) {
        return null;
    }

    const handleSave = () => {
        const quantity = parseInt(inputValue, 10);
        if (!isNaN(quantity) && quantity > 0) {
            onSave(quantity);
        } else {
            alert("Please enter a valid quantity.");
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg w-3/4 max-w-lg">
                <h1 className='text-black text-3xl py-2 font-semibold'>{item.name}</h1>
                <p className='text-black mb-2'>
                <span className='font-bold text-gray-700'>Category:</span> {item.category}
                </p>
                <p className='text-black'>
                <span className='font-bold text-gray-700'>Remaining in Stock:</span> {item.stock}
                </p>
                <br/>
                <h2 className="text-xl mb-4">Enter Quantity</h2>
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border p-2 rounded w-full"
                    min="1"
                />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 mr-2 bg-gray-300 rounded"
                    >
                        Back
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Enter
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuantityCard;
