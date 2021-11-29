import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  wishlist: [],
};

export const wishlistSlice = createSlice({
  name: "wishlistSlice",
  initialState,
  reducers: {
    addToWishlist(state, { payload }) {
      state.wishlist.push(payload);
    },
    removeFromWishlist(state, { payload }) {
      const filteredWishlist = state?.wishlist?.filter(
        (item) => item?.id !== payload
      );
      state.wishlist = filteredWishlist;
    },
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
