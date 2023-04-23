import { createSlice } from '@reduxjs/toolkit';

// default values for state modal
const initialState = {
  isOpen: false,
  header: '',
};

// create slice
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    closeModal: (state) => {
      return { ...state, isOpen: false };
    },
    openModal: (state, action) => {
      const { header } = action.payload;

      return {
        isOpen: true,
        header,
      };
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;
export default modalSlice.reducer;
