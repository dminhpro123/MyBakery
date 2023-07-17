import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  contactList: {
    data: [],
    loading: false,
    error: null,
  },
  contact: {
    loading: false,
    error: null,
  },
};

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    postContactRequest: (state, action) => {
      state.contact.loading = true;
      state.contact.error = null;
    },
    postContactSuccess: (state, action) => {
      state.contact.loading = false;
      state.contact.error = null;
    },
    postContactFailure: (state, action) => {
      const { error } = action.payload;
      state.contact.loading = false;
      state.contact.error = error;
    },

    getContactListRequest: (state, action) => {
      state.contactList.loading = true;
      state.contactList.error = null;
    },
    getContactListSuccess: (state, action) => {
      const { data } = action.payload;
      state.contactList.loading = false;
      state.contactList.data = data;
    },
    getContactListFailure: (state, action) => {
      const { error } = action.payload;
      state.contactList.loading = false;
      state.contactList.error = error;
    },
  },
});

export const {
  getContactListRequest,
  getContactListSuccess,
  getContactListFailure,
  postContactRequest,
  postContactSuccess,
  postContactFailure,
} = contactSlice.actions;

export default contactSlice.reducer;
