import { create } from "zustand";

const useCartStore = create((set, get) => ({
  cart: [],

  addToCart: (item) => {
    set((state) => {
      const index = state.cart.findIndex((cartItem) => cartItem.id === item.id);
      if (index >= 0) {
        // Item already in cart, increment its quantity
        const updatedCart = [...state.cart];
        updatedCart[index].quantity += 1;
        return { cart: updatedCart };
      }
      // Add new item to cart with initial quantity
      return {
        cart: [...state.cart, { ...item, quantity: item.quantity || 1 }],
      };
    });
  },

  removeFromCart: (itemId) => {
    set((state) => {
      const index = state.cart.findIndex((cartItem) => cartItem.id === itemId);
      if (index >= 0) {
        const updatedCart = [...state.cart];
        updatedCart.splice(index, 1);
        return { cart: updatedCart };
      }
      console.warn(`Can't remove product (id: ${itemId}) as it's not in cart!`);
      return {};
    });
  },

  clearCart: () => set({ cart: [] }),

  incQuantity: (itemId) => {
    set((state) => {
        console.log(`in increment quantity: id received: ${JSON.stringify(itemId)}, cart: ${JSON.stringify(state.cart)}`)
      const index = state.cart.findIndex((cartItem) => Number(cartItem.id) === Number(itemId));
      if (index >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[index].quantity += 1;
        return { cart: updatedCart };
      }
      console.warn(
        `Error while increasing quantity (id: ${itemId}) as it's not in cart!`
      );
      return {};
    });
  },

  decQuantity: (itemId) => {
    set((state) => {
      const index = state.cart.findIndex((cartItem) => cartItem.id === itemId);
      if (index >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[index].quantity -= 1;
        if (updatedCart[index].quantity <= 0) {
          updatedCart.splice(index, 1);
        }
        return { cart: updatedCart };
      }
      console.warn(
        `Error while decreasing quantity (id: ${itemId}) as it's not in cart!`
      );
      return {};
    });
  },

  setQuantity: (itemId, quantity) => {
    set((state) => {
      const index = state.cart.findIndex((cartItem) => cartItem.id === itemId);
      if (index >= 0) {
        const updatedCart = [...state.cart];
        updatedCart[index].quantity = quantity;
        return { cart: updatedCart };
      }
      console.warn(
        `Error while setting quantity (id: ${itemId}) as it's not in cart!`
      );
      return {};
    });
  },
}));

export default useCartStore;
