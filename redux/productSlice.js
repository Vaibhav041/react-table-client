import { createSlice } from "@reduxjs/toolkit";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    originalData: null,
    productsData: null,
  },
  reducers: {
    setOriginalData: (state, action) => {
      state.originalData = action.payload;
    },
    setProductsData: (state, action) => {
      state.productsData = action.payload;
    },
    setProductPrice: (state, action) => {
      state.productsData[action.payload.category] = state.productsData[
        action.payload.category
      ].map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            price: action.payload.newPrice,
          };
        }
        return product;
      });
    },
  },
});

export const { setProductsData, setProductPrice, setOriginalData } = productSlice.actions;
export default productSlice.reducer;
