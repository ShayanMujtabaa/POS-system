import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddCategory = () => {
    const navigate = useNavigate();
    const [CategoryName, setCategoryName] = useState('');

    const handleAddCategory = async (e) => {
        e.preventDefault();

        if (!CategoryName) {
            alert('Please fill in the category name');
            return;
        }

        try {
            const CategoryData = {
                name: CategoryName
            };
            const response = await axios.post("http://localhost:9000/category/addCategory", CategoryData);
            if (response.status === 200) {
                console.log("Category Added successfully");
                alert("Category Added Successfully");
                navigate('/categoryPage');
            }
        } catch (error) {
            console.log("Error while adding Category: ", error.message);
            alert("Failed to Add Category");
        }
    };

    return (
        <div className="container mt-24 mx-auto px-12 py-4">
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">ADD CATEGORY</h1>
            <form onSubmit={handleAddCategory}>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2">Category Name</label>
                    <input
                        type="text"
                        className="bg-gray-200 border border-[#33353F] placeholder-black text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder="Category Name"
                        value={CategoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </div>

                <button type="submit" className="text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600 font-medium py-2.5 px-5 rounded-lg w-48 h-12 border border-gray-300 my-5">
                    Add Category
                </button>
            </form>
        </div>
    );
}

export default AddCategory;
