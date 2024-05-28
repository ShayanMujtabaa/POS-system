import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();





    return (
    <>
    <button className="w-full py-2 text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600" onClick={() => {navigate("/addItem")}}>Add Item</button>
    <button className="w-full py-2 text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600"  onClick={() => {navigate("/deleteItem")}}>Delete Item</button>
    <button className="w-full py-2 text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600"  onClick={() => {navigate("/updateItem")}}>Update Item</button>
    </>
    )


}

export default AdminPage;