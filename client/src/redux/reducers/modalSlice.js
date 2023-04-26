import { createSlice } from '@reduxjs/toolkit';

// default values for state modal
const initialState = {
  isOpen: false,
};

// create slice
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: (state) => {
      state.isOpen = false;
    },
    openModal: (state, actions) => {
      state.isOpen = true;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
