import {configureStore} from "@reduxjs/toolkit";
import cartSlice from './cartSlice';
import ItemsSlice from './ItemsSlice';

const store = configureStore({
    reducer: { 
        cart: cartSlice,
        items: ItemsSlice
    }, 

});

export default store