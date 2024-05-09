import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchCatalogProducts = createAsyncThunk(
  'catalog/fetchCatalogProducts',
  async (categoryName) => {
    try {
      const response = await fetch(`http://localhost:4000/api/products/category=${categoryName}`,);
      if (!response.ok) {
        throw new Error('Failed to fetch catalog');
      }
      const { data } = await response.json();
      // console.log('fetched catalog', data);
      return data;
    } catch (error) {
      console.error('Error fetching catalog:', error);
      throw error;
    }
  }
);

const catalogSlice = createSlice({
  name: 'categories',
  initialState: {
    categoriesProducts: [],
    // categoryNames: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCatalogProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCatalogProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.categoriesProducts = action.payload;

        // console.log('fetch catalegories:', state.categoriesProducts);
      })
      .addCase(fetchCatalogProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// export const { } = catalogSlice.actions;

export default catalogSlice.reducer;