import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categoriesList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategoryListRequest: (state, action) => {
      state.categoriesList.loading = true;
      state.categoriesList.error = null;
    },
    getCategoryListSuccess: (state, action) => {
      const { data } = action.payload;
      state.categoriesList.loading = false;
      state.categoriesList.data = data;
    },
    getCategoryListFailure: (state, action) => {
      const { error } = action.payload;
      state.categoriesList.loading = false;
      state.categoriesList.error = error;
    },
  },
});

export const {
  getCategoryListRequest,
  getCategoryListSuccess,
  getCategoryListFailure,
} = categorySlice.actions;

export default categorySlice.reducer;
