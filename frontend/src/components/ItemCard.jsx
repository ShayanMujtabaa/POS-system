import React from 'react';

const ItemCard = ({ item }) => { 
    return (
        <div className="bg-[#0077b6] text-white rounded-lg p-5 m-2 shadow-md flex-1 border-2 border-purple-500 hover:shadow-lg hover:border-purple-700 transition duration-300 ease-in-out">
        <h1 className='text-xl font-semibold'>{item.name}</h1>
        <p>ID:       {item.id}</p>
        <p>Price:    {item.price}</p>
        <p>Quantity: {item.stock}</p>
        </div>
    )
}

export default ItemCard;