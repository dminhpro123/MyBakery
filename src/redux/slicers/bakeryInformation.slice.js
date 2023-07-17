import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  bakeryInformationList: {
    data: {},
    loading: false,
    error: null,
  },
};

export const bakeryInformationSlice = createSlice({
  name: 'bakeryInformation',
  initialState,
  reducers: {
    getBakeryInformationRequest: (state, action) => {
      state.bakeryInformationList.loading = true;
      state.bakeryInformationList.error = null;
    },
    getBakeryInformationSuccess: (state, action) => {
      const { data } = action.payload;
      state.bakeryInformationList.loading = false;
      state.bakeryInformationList.data = data;
    },
    getBakeryInformationFailure: (state, action) => {
      const { error } = action.payload;
      state.bakeryInformationList.loading = false;
      state.bakeryInformationList.error = error;
    },
  },
});

export const {
  getBakeryInformationRequest,
  getBakeryInformationSuccess,
  getBakeryInformationFailure,
} = bakeryInformationSlice.actions;

export default bakeryInformationSlice.reducer;
