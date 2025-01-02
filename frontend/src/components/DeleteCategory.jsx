import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import SearchField from './SearchField';
import { deleteCategory } from './redux/CategoriesSlice';
import { useDispatch } from 'react-redux';

const DeleteCategory = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [id, setId] = useState(0);

    const {categories, loading, error } = useSelector((state) => ({
        categories: state.categories.categories,
        loading: state.categories.loading,
        error: state.categories.error,
    }));

    const CategoriesSearchString = categories.map(category => `${category.id} (${category.name})`);

    const handleDeleteCategory = async (e) => {
        e.preventDefault();

        if (!id) {
            alert('Please fill in all the fields');
            return;
        }

        try {
            const parsedId = id.match(/^(\d+)\s*\(/)?.[1];
            console.log('Parsed ID:', parsedId);
            const CategoryData = {
                id: parsedId
            };
            const response = await axios.delete("http://localhost:9000/category/deleteCategory", {data: CategoryData});
            if (response.status === 200) {
                console.log("Category Deleted successfully");
                dispatch(deleteCategory(parsedId));
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
                    <SearchField
                    options={CategoriesSearchString}
                    label="Category ID"
                    value={id}
                    onChange={(value) => setId(value)}
                    defaultOther={false}
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