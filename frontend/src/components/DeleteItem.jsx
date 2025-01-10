import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchField from './SearchField';
import useItemsStore from '../ZustState/Items';
import axiosInstance from "../config/AxiosInstance";

const DeleteItem = () => {
    const navigate = useNavigate();
    const [id, setId] = useState(0);

   const { items, deleteItem } = useItemsStore();

    const ItemsSearchString = items.map(item => `${item.id} (${item.name})`);

    const handleDeleteItem = async (e) => {
        e.preventDefault();

        if (!id) {
            alert('Please fill in all the fields');
            return;
        }

        try {
            const parsedId = id.match(/^(\d+)\s*\(/)?.[1];
            const ItemData = {
                id: parsedId
            };
            const response = await axiosInstance.delete("/item/deleteItem", {data: ItemData });
            if (response.status === 200) {
              console.log("Item Deleted successfully");
              deleteItem(parsedId);
              alert("Item Deleted Successfuly");
              navigate("/itemPage");
            }
        } catch (error) {
            console.log("Error while deleting item: ", error.msg);
            alert("Failed to Delete item");
        }
    };

    return (
        <div className="container mt-24 mx-auto px-12 py-4">
            <h1 className="text-white mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold">DELETE ITEM</h1>
            <form onSubmit={handleDeleteItem}>
                <div>
                    <label className="text-white block mb-2 text-2xl font-medium my-2" >Item ID</label>
                    <SearchField
                    options={ItemsSearchString}
                    label="Item ID"
                    value={id}
                    onChange={(value) => setId(value)}
                    defaultOther={false}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-[#FF0000] text-white text-lg font-medium px-4 py-2 rounded-lg mt-4"
                >
                    Delete Item
                </button>
            </form>
        </div>
    );
};

export default DeleteItem;