import React from 'react';

const StockListCard = ({ item }) => {
    return (

        <div className="bg-[#0077b6] text-white rounded-lg p-5 m-2 shadow-md
         flex-1 border-2 border-purple-500 hover:shadow-lg hover:border-purple-700
          transition duration-300 ease-in-out">

            <h1 className='text-xl font-bold'>{item.name}</h1>
            <h2 className='text-l font-semibold'>Item ID: {item.id}</h2>
            <br></br>
            <p className='text-l font-semibold'>Stock: {item.stock}</p>

        </div>
    )
}

export default StockListCard;