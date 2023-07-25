import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  productList: {
    data: [],
    meta: {},
    loading: false,
    error: null,
  },

  productDetail: {
    data: {},
    loading: false,
    error: null,
  },

  outstandingProductList: {
    data: [],
    loading: false,
    error: null,
  },

  newProductList: {
    data: [],
    loading: false,
    error: null,
  },
};

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // product list
    getProductListRequest: (state, action) => {
      state.productList.loading = true;
      state.productList.error = null;
    },
    getProductListSuccess: (state, action) => {
      const { data, meta, more } = action.payload;
      state.productList.loading = false;
      state.productList.data = more
        ? [...state.productList.data, ...data]
        : data;
      state.productList.meta = meta;
    },
    getProductListFailure: (state, action) => {
      const { error } = action.payload;
      state.productList.loading = false;
      state.productList.error = error;
    },

    // product detail
    getProductDetailRequest: (state, action) => {
      state.productDetail.loading = true;
      state.productDetail.error = null;
    },
    getProductDetailSuccess: (state, action) => {
      const { data } = action.payload;
      state.productDetail.loading = false;
      state.productDetail.data = data;
    },
    getProductDetailFailure: (state, action) => {
      const { error } = action.payload;
      state.productDetail.loading = false;
      state.productDetail.error = error;
    },

    //addViewProduct
    addViewProductRequest: (state, action) => {
      state.productDetail.loading = true;
      state.productDetail.error = null;
    },
    addViewProductSuccess: (state, action) => {
      state.productDetail.error = null;
    },
    addViewProductFailure: (state, action) => {
      const { error } = action.payload;
      state.productDetail.loading = false;
      state.productDetail.error = error;
    },

    //outstandingProductList
    getOutstandingProductListRequest: (state, action) => {
      state.outstandingProductList.loading = true;
      state.outstandingProductList.error = null;
    },
    getOutstandingProductListSuccess: (state, action) => {
      const { data } = action.payload;
      state.outstandingProductList.error = null;
      state.outstandingProductList.data = data;
    },
    getOutstandingProductListFailure: (state, action) => {
      const { error } = action.payload;
      state.outstandingProductList.loading = false;
      state.outstandingProductList.error = error;
    },

    //newProductList
    getNewProductListRequest: (state, action) => {
      state.newProductList.loading = true;
      state.newProductList.error = null;
    },
    getNewProductListSuccess: (state, action) => {
      const { data } = action.payload;
      state.newProductList.error = null;
      state.newProductList.data = data;
    },
    getNewProductListFailure: (state, action) => {
      const { error } = action.payload;
      state.newProductList.loading = false;
      state.newProductList.error = error;
    },
  },
});

export const {
  getProductListRequest,
  getProductListSuccess,
  getProductListFailure,
  getProductDetailRequest,
  getProductDetailSuccess,
  getProductDetailFailure,
  addViewProductRequest,
  addViewProductSuccess,
  addViewProductFailure,
  getOutstandingProductListRequest,
  getOutstandingProductListSuccess,
  getOutstandingProductListFailure,
  getNewProductListRequest,
  getNewProductListSuccess,
  getNewProductListFailure,
} = productSlice.actions;

export default productSlice.reducer;
