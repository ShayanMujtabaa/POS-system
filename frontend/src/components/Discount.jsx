import React, { useState } from 'react';

const DiscountPopup = ({ show, onClose, onSave }) => {
    const [inputValue, setInputValue] = useState('');

    if (!show) {
        return null;
    }

    const handleSave = () => {
        const discount = parseFloat(inputValue) / 100;
        onSave(discount);
        onClose();
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded shadow-lg">
                <h2 className="text-xl mb-4">Enter Discount Percentage</h2>
                <input
                    type="number"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="border p-2 rounded w-full"
                />
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 mr-2 bg-gray-300 rounded"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="px-4 py-2 bg-blue-500 text-white rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DiscountPopup;