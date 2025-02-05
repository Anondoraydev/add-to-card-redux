import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Fetch products from API
export const fetchProducts = createAsyncThunk("products/fetch", async (_, { getState }) => {
  const response = await fetch("https://fakestoreapi.com/products");
  const allProducts = await response.json();
  const { currentPage } = getState().products;
  const startIndex = (currentPage - 1) * 6;
  return allProducts.slice(startIndex, startIndex + 6);
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
      });
  },
});

export const { setPage } = productsSlice.actions;
export default productsSlice.reducer;
