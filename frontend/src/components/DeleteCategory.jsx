import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DeleteCategory = () => {
    const navigate = useNavigate();
    const [id, setId] = useState(0);

    const handleDeleteCategory = async (e) => {
        e.preventDefault();

        if (!id) {
            alert('Please fill in all the fields');
            return;
        }

        try {
            const CategoryData = {
                id
            };
            const response = await axios.post("http://localhost:9000/deletecategory", CategoryData);
            if (response.status === 200) {
                console.log("Category Deleted successfully");
                alert("Category Deleted Successfuly")
                navigate('/categoryPage');
            }
        } catch (error) {
            console.log("Error while deleting category: ", error.msg);
            alert("Failed to Delete category");
        }
    };

    return (
        <div className="container mt-24 mx-auto px-12 py-4">
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">DELETE CATEGORY</h1>
            <form onSubmit={handleDeleteCategory}>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2" >Category ID</label>
                    <input
                        type="number"
                        className="bg-gray-200 border border-[#33353F] placeholder-[#9CA2A9] text-gray-900 text-sm rounded-lg block w-full p-2.5 mb-6"
                        placeholder='Category ID'
                        onChange={(e) => setId(parseFloat(e.target.value))}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#FF0000] text-white text-lg font-medium px-4 py-2 rounded-lg mt-4"
                >
                    Delete Category
                </button>
            </form>
        </div>
    );
};

export default DeleteCategory;