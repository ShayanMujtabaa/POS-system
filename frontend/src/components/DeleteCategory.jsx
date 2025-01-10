import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchField from './SearchField';
import useCategoriesStore from '../ZustState/Categories';
import axiosInstance from "../config/AxiosInstance";

const DeleteCategory = () => {
    const navigate = useNavigate();
    const [name, setName] = useState(0);

    const { categories, deleteCategory } = useCategoriesStore();

    console.log("categories are: ", categories);

    const CategoriesSearchString = categories.map(category => `${category.name}`);

    const handleDeleteCategory = async (e) => {
        e.preventDefault();

        if (!name) {
            alert('Please fill in all the fields');
            return;
        }

        try {

            const CategoryData = {
                name: name
            };
            const response = await axiosInstance.delete("/category/deleteCategory", {data: CategoryData});
            if (response.status === 200) {
                console.log("Category Deleted successfully");
                deleteCategory(name);
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
                    <label className="text-white block mb-2 text-2xl font-medium my-2" >Category Name</label>
                    <SearchField
                    options={CategoriesSearchString}
                    label="Category Name"
                    value={name}
                    onChange={(value) => setName(value)}
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