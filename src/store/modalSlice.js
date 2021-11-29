import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalActive: false,
};

export const modalSlice = createSlice({
  name: "modalSlice",
  initialState,
  reducers: {
    openModal(state) {
      state.isModalActive = true;
    },
    closeModal(state) {
      state.isModalActive = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
