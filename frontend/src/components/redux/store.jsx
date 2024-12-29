import {configureStore} from "@reduxjs/toolkit";
import cartSlice from './cartSlice';
import ItemsSlice from './ItemsSlice';
import CategoriesSlice from './CategoriesSlice';
import StockSlice from './StockSlice';

const store = configureStore({
    reducer: { 
        cart: cartSlice,
        items: ItemsSlice,
        categories: CategoriesSlice,
        stock: StockSlice
    }, 

});

export default store