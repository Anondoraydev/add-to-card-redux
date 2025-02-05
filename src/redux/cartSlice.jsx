import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const cartSlice = createSlice({
    name: "cart",
    initialState: { cartItems: [] },
    reducers: {
        addToCart: (state, action) => {
            const item = state.cartItems.find((i) => i.id === action.payload.id);
            if (item) {
                item.quantity += 1;
                toast.info(`${action.payload.title} quantity updated!`, {
                    position: "top-right",
                    autoClose: 2000,
                }
                );
            } else {
                state.cartItems.push({ ...action.payload, quantity: 1 });
                toast.success(`${action.payload.title} added to cart!`, {
                    position: "top-right",
                    autoClose: 2000,
                });
            }
        },
        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
            toast.info("🗑️ Product removed from cart!", {
                position: "top-right",
                autoClose: 2000,
            });
        },
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const item = state.cartItems.find((i) => i.id === id);
            if (item && quantity > 0) {
                item.quantity = quantity;
            }
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;
