import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  newsList: {
    data: [],
    loading: false,
    error: null,
  },

  newsDetail: {
    data: {},
    loading: false,
    error: null,
  },
};

export const newsSlice = createSlice({
  name: 'news',
  initialState,
  reducers: {
    getNewsListRequest: (state, action) => {
      state.newsList.loading = true;
      state.newsList.error = null;
    },
    getNewsListSuccess: (state, action) => {
      const { data } = action.payload;
      state.newsList.loading = false;
      state.newsList.data = data;
    },
    getNewsListFailure: (state, action) => {
      const { error } = action.payload;
      state.newsList.loading = false;
      state.newsList.error = error;
    },

    getNewsDetailRequest: (state, action) => {
      state.newsDetail.loading = true;
      state.newsDetail.error = null;
    },
    getNewsDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.newsDetail.loading = false;
      state.newsDetail.data = data;
    },
    getNewsDetailFailure: (state, action) => {
      const { error } = action.payload;
      state.newsDetail.loading = false;
      state.newsDetail.error = error;
    },

    clearNewsDetailRequest: (state, action) => {
      state.newsDetail.data = {};
    },
  },
});

export const {
  getNewsListRequest,
  getNewsListSuccess,
  getNewsListFailure,
  getNewsDetailRequest,
  getNewsDetailSuccess,
  getNewsDetailFailure,
  clearNewsDetailRequest,
} = newsSlice.actions;

export default newsSlice.reducer;
