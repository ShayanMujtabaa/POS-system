import React from 'react';

const ItemCard = ({ item, onClick }) => { 
    return (
        <div className="bg-[#0077b6] text-white rounded-lg p-2 m-1 shadow-md flex-1 border-2 border-purple-500 hover:shadow-lg hover:border-purple-700 transition duration-300 ease-in-out"
        onClick={onClick}>
        <h1 className='text-base font-semibold leading-5'>{item.name}</h1>
        <p className='text-sm mt-1'>Price: {item.price} /-</p>
        </div>
    )
}

export default ItemCard;