import {configureStore} from "@reduxjs/toolkit";
import cartSlice from './cartSlice';
import ItemsSlice from './ItemsSlice';
import CategoriesSlice from './CategoriesSlice';

const store = configureStore({
    reducer: { 
        cart: cartSlice,
        items: ItemsSlice,
        categories: CategoriesSlice
    }, 

});

export default store