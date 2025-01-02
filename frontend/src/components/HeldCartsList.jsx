import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { addToCart, clearCart } from './redux/cartSlice';

const HeldCartsList = ({setRetrievePopup}) => {
    const [HeldCarts, setHeldCarts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let RetrievedCart = {};
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchHeldCarts = async () => {
            try {
                const response = await axios.get("http://localhost:9000/sale/getHeldCarts");
                const data = response.data;
                setHeldCarts(data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching held carts:", error);
                setIsLoading(false);
            } 
        };

        fetchHeldCarts();
    }, []); // Added dependency array to prevent infinite loop

    const handleSelectedBill = (cart) => {
        console.log("Selected cart: ", JSON.stringify(cart));
        RetrievedCart = cart;
        setRetrievePopup(false);
        handleRetrieveCart();
    }

    const handleRetrieveCart = async () => {
        try {
            const response = await axios.delete("http://localhost:9000/sale/deleteHeldCart", {
                id: RetrievedCart.TempCartId
            });
            console.log("Response received from deletion: ", response.data);
            const response2 = await axios.get("http://localhost:9000/sale/getItems");
            if (response2.status === 200) {
                console.log("Items retrieved successfully: ", response2.data);
                console.log("Retrieved cart: ", JSON.stringify(RetrievedCart));
                dispatch(clearCart())
                for (let i = 0; i < RetrievedCart.itemIds.length; i++) {
                    dispatch(addToCart({
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
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg min-w-[300px]'>
            <div className="flex justify-between items-center mb-4">
                <h1 className='text-2xl font-bold'>Held Carts</h1>
                <button 
                    onClick={() => setRetrievePopup(false)}
                    className="text-gray-500 hover:text-gray-700"
                >
                    ×
                </button>
            </div>
            
            {isLoading ? (
                <p className="text-center text-gray-600">Loading...</p>
            ) : (
                <>
                    {HeldCarts.length > 0 && HeldCarts.some(cart => cart.TempCartId) ? (
                        <ul className="max-h-[400px] overflow-y-auto">
                            {HeldCarts.map((cart, index) => (
                                cart.TempCartId && (
                                    <li 
                                        key={index} 
                                        className='hover:bg-gray-200 p-3 rounded-lg cursor-pointer mb-2 border border-gray-100 transition-colors duration-200'
                                        onClick={() => handleSelectedBill(cart)}
                                    >
                                        <p className="font-medium">Cart ID: {cart.TempCartId}</p>
                                    </li>
                                )
                            ))}
                        </ul>
                    ) : (
                        <div className="text-center py-8">
                            <p className="text-gray-600">No held carts found</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}

export default HeldCartsList;