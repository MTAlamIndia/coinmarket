import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSearchActive: false,
  searchedCoins: [],
  recentlySearchedCoins: [],
};

export const searchSlice = createSlice({
  name: "searchSlice",
  initialState,
  reducers: {
    activateSearch(state) {
      state.isSearchActive = true;
    },
    deactivateSearch(state) {
      state.isSearchActive = false;
    },
    getSearchedCoins(state, action) {
      state.searchedCoins = action.payload;
    },
    getRecentlySearchedCoins(state, action) {
      const existingCoin = state.recentlySearchedCoins.find(
        (coin) => coin.id === action.payload.id
      );

      if (!existingCoin) {
        state.recentlySearchedCoins.unshift(action.payload);
      }

      if (existingCoin) {
        const existingCoinIndex = state.recentlySearchedCoins.findIndex(
          (coin) => coin.id === action.payload.id
        );

        state.recentlySearchedCoins.splice(existingCoinIndex, 1);
        state.recentlySearchedCoins.unshift(existingCoin);
      }

      if (state.recentlySearchedCoins.length > 10) {
        state.recentlySearchedCoins.pop();
      }
    },
  },
});

export const {
  activateSearch,
  deactivateSearch,
  getSearchedCoins,
  getRecentlySearchedCoins,
} = searchSlice.actions;
