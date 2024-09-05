import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart } from './redux/cartSlice';

const HeldCartsList = ({setRetrievePopup}) => {

    const [HeldCarts, setHeldCarts] = useState([]);
    let RetrievedCart = {};
    const dispatch = useDispatch();

    useEffect (() => {
        const fetchHeldCarts = async () => {
            try {
                const response = await axios.get("http://localhost:9000/getHeldCarts");
                const data = response.data;
                setHeldCarts(data);
            } catch (error) {
                console.error("Error fetching held carts:", error);
            } 
        };

        fetchHeldCarts();
    });

    const handleSelectedBill = (cart) => {
        console.log("Selected cart: ", JSON.stringify(cart));
        RetrievedCart = cart;
        setRetrievePopup(false);
        handleRetrieveCart();
    }

    const handleRetrieveCart = async () => {
        try {
            
            const response = await axios.post("http://localhost:9000/deleteHeldCart", {
                id: RetrievedCart.TempCartId
            });
            console.log("Response received from deletion: ", response.data);
            const response2 = await axios.post("http://localhost:9000/getItems");
            if (response2.status === 200) {
                console.log("Items retrieved successfully: ", response2.data);
                console.log("Retrieved cart: ", JSON.stringify(RetrievedCart));
                for (let i = 0; i < RetrievedCart.itemIds.length; i++) {
                    dispatch(addToCart( {
                        id: RetrievedCart.itemIds[i],
                        name: response2.data.find(item => item.id === RetrievedCart.itemIds[i]).name,
                        price: response2.data.find(item => item.id === RetrievedCart.itemIds[i]).price,
                        quantity: RetrievedCart.quantities[i]
                    }));
                }
            }
        } catch (error) {
            console.log("Error while retrieving cart: ", error);
            alert("Failed to retrieve cart");
        }

    }


  return (
    // This component will display the list of held carts, each clickable and have a hover effect, this will be positioned absolutely in the center of screen
    // use tailwind css
    <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg'>
        <h1 className='text-2xl font-bold text-center mb-4'>Held Carts</h1>
        <ul>
            {HeldCarts.map((cart, index) => (
                <li key={index} className='hover:bg-gray-200 p-2 rounded-lg cursor-pointer' onClick={() => handleSelectedBill(cart)}>
                    <p>{cart.TempCartId}</p>
                </li>
            ))}
        </ul>
    </div>

  )
}

export default HeldCartsList
