import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  advertismentList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const advertismentSlice = createSlice({
  name: 'advertisment',
  initialState,
  reducers: {
    getAdvertismentListRequest: (state, action) => {
      state.advertismentList.loading = true;
      state.advertismentList.error = null;
    },
    getAdvertismentListSuccess: (state, action) => {
      const { data } = action.payload;
      state.advertismentList.loading = false;
      state.advertismentList.data = data;
    },
    getAdvertismentListFailure: (state, action) => {
      const { error } = action.payload;
      state.advertismentList.loading = false;
      state.advertismentList.error = error;
    },
  },
});

export const {
  getAdvertismentListRequest,
  getAdvertismentListSuccess,
  getAdvertismentListFailure,
} = advertismentSlice.actions;

export default advertismentSlice.reducer;
