import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// Fetch products from API
export const fetchProducts = createAsyncThunk("products/fetch", async (_, { getState, rejectWithValue }) => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) throw new Error("Failed to fetch products");
    
    const allProducts = await response.json();
    const { currentPage } = getState().products;
    const startIndex = (currentPage - 1) * 6;
    return allProducts.slice(startIndex, startIndex + 6);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const productsSlice = createSlice({
  name: "products",
  initialState: { products: [], loading: false, currentPage: 1 },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        toast.success("Products loaded successfully!", {
          position: "top-right",
          autoClose: 2000,
        }
    );
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        toast.error(`Error: ${action.payload}`, {
          position: "top-right",
          autoClose: 2000,
        });
      });
  },
});

export const { setPage } = productsSlice.actions;
export default productsSlice.reducer;
