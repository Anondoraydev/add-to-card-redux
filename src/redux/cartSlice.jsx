import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const cartSlice = createSlice({
  name: "cart",
  initialState: { cartItems: [] },
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item) {
        toast.error("❌ Product is already in the cart!", {
          position: "top-right",
          autoClose: 2000,
        });
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
        toast.success("✅ Product added to cart!", {
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
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
