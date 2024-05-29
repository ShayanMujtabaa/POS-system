import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({ 
    name: "cart", //connection of reducer actions
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const index = state.cart.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                state.cart[index].quantity++;
            } else {
                state.cart.push({...action.payload, quantity: 1});
            }

           
        },
        removeFromCart: (state, action) => {
            const index = state.cart.findIndex((item) => item.id === action.payload.id);
            let newCart = [...state.cart];
            if (index >= 0) {
                newCart.splice(index, 1);
            } else {
                console.warn(`Can't remove product (id: ${action.payload.id}) as it's not in cart!`);
            }
            state.cart = newCart;
        },
    }
})

export default cartSlice.reducer;

export const { addToCart } = cartSlice.actions;