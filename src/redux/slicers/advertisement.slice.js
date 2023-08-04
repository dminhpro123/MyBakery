import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  advertisementList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const advertisementSlice = createSlice({
  name: 'advertisement',
  initialState,
  reducers: {
    getAdvertisementListRequest: (state, action) => {
      state.advertisementList.loading = true;
      state.advertisementList.error = null;
    },
    getAdvertisementListSuccess: (state, action) => {
      const { data } = action.payload;
      state.advertisementList.loading = false;
      state.advertisementList.data = data;
    },
    getAdvertisementListFailure: (state, action) => {
      const { error } = action.payload;
      state.advertisementList.loading = false;
      state.advertisementList.error = error;
    },
  },
});

export const {
  getAdvertisementListRequest,
  getAdvertisementListSuccess,
  getAdvertisementListFailure,
} = advertisementSlice.actions;

export default advertisementSlice.reducer;
