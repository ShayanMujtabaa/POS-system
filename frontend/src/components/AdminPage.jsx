import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminPage = () => {
    const navigate = useNavigate();





    return (
    <div className="flex flex-col items-center justify-center min-h-screen">

    <button className="w-4/12 lg:py-14 sm:py-7 my-4 border-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl  text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600" onClick={() => {navigate("/addItem")}}>Add Item</button>
    <br/>
    <button className="w-4/12 lg:py-14 sm:py-7 my-4 border-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl  text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600"  onClick={() => {navigate("/deleteItem")}}>Delete Item</button>
    <br/>
    <button className="w-4/12 lg:py-14 sm:py-7 my-4 border-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl  text-white bg-gradient-to-r from-blue-500 to-green-500 rounded-lg hover:from-blue-600 hover:to-green-600"  onClick={() => {navigate("/updateItem")}}>Update Item</button>
    </div>
    )


}

export default AdminPage;