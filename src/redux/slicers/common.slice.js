import { createSlice } from '@reduxjs/toolkit';
import qs from 'qs';

const locationSearch = qs.parse(window.location.search, {
  ignoreQueryPrefix: true,
});

const initialState = {
  filterParams: {
    categoryId: locationSearch.categoryId
      ? locationSearch.categoryId.map((id) => parseInt(id))
      : [],
    keyword: locationSearch.keyword || '',
    sort: locationSearch.sort || undefined,
  },
};

export const commonSlice = createSlice({
  name: 'common',
  initialState,
  reducers: {
    setFilterParams: (state, action) => {
      state.filterParams = action.payload;
    },
    clearFilterParams: (state) => {
      state.filterParams = {
        categoryId: [],
        keyword: '',
        sort: undefined,
      };
    },
  },
});

export const { setFilterParams, clearFilterParams } = commonSlice.actions;

export default commonSlice.reducer;
