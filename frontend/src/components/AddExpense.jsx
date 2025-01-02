import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddExpense = () => {
    const navigate = useNavigate();
    const [ExpenseName, setExpenseName] = useState('');
    const [ExpensePrice, setExpensePrice] = useState('');

    const handleAddExpense = async (e) => {
        e.preventDefault();

        if (!ExpenseName || !ExpensePrice) {
            alert('Please fill in all the fields');
            return;
        }

        try {
            const ExpenseData = {
                name: ExpenseName, 
                price: ExpensePrice
            };
            const response = await axios.post("http://localhost:9000/expense/addExpense", ExpenseData);
            if (response.status === 200) {
                console.log("Expense Added successfully");
                alert("Expense Added Successfully");
                navigate('/adminPage');
            }
        } catch (error) {
            console.log("Error while adding Expense: ", error.message);
            alert("Failed to Add Expense");
        }
    };

    return (
        <div className="container mt-24 mx-auto px-12 py-4">
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">ADD EXPENSE</h1>
            <form onSubmit={handleAddExpense}>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2">Expense Name</label>
                    <input
                        type="text"
                        className="bg-gray-200 border border-[#33353F] placeholder-black text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Expense Name'
                        value={ExpenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                    />
                </div>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2">Expense Price</label>
                    <input
                        type="text"
                        className="bg-gray-200 border border-[#33353F] placeholder-black text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Expense Price'
                        value={ExpensePrice}
                        onChange={(e) => setExpensePrice(e.target.value)}
                    />
                </div>

                <button type="submit" className="text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600 font-medium py-2.5 px-5 rounded-lg w-48 h-12 border border-gray-300 my-5">
                    Add Expense
                </button>
            </form>
        </div>
    )
}

export default AddExpense;
