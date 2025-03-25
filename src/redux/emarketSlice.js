import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: [],
    lastFetched: null,
    loading: false,
    error: null,
    selectedCategory: '',
    cart: [],
    categoryData: {} // Cache for category data
};
const emarketSlice = createSlice({
  name: 'emarket',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
      state.lastFetched = new Date().toISOString();
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setSelectedCategory: (state, action) => {
        state.selectedCategory = action.payload;
        state.products = [];
    },
    setCategoryData: (state, action) => {
        const { category, data } = action.payload;
        state.categoryData[category] = {
            data,
            timestamp: new Date().toISOString()
        };
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.cart.find(item => item.name === action.payload.name);
      if (existingItem) {
        state.cart = state.cart.map(item =>
          item.name === action.payload.name 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }
    },
    clearProducts: (state) => {
      state.products = [];
      state.lastFetched = null;
    }
  }
});


export const { 
    setLoading, 
    setProducts, 
    setError, 
    setSelectedCategory,
    setCart,
    addToCart,
    clearProducts,
    setCategoryData 
} = emarketSlice.actions;

export default emarketSlice.reducer;