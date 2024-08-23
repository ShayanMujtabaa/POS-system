import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: "cart", //connection of reducer actions
    initialState: {
        cart: [],
    },
    reducers: {
        addToCart: (state, action) => {
            const index = state.cart.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                state.cart[index].quantity += 1;
            } else {
                state.cart.push({ ...action.payload, quantity: action.payload.quantity || 1 });
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
        incQuantity: (state, action) => {
            const index = state.cart.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                state.cart[index].quantity += 1;
            }
        },

        setQuantity: (state, action) => {
            const index = state.cart.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                state.cart[index].quantity = action.payload.quantity
                console.log(state.cart[index].quantity)
            }
        },

        decQuantity: (state, action) => {
            const index = state.cart.findIndex((item) => item.id === action.payload.id);
            if (index >= 0) {
                state.cart[index].quantity -= 1;
                if (state.cart[index].quantity <= 0) {
                    state.cart.splice(index, 1);
                }
            }
        },

    }
})

export default cartSlice.reducer;

export const { addToCart, removeFromCart, incQuantity, decQuantity, setQuantity } = cartSlice.actions;