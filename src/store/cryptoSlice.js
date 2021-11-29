import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCoins: [],
  topCoins: [],
  coinDetails: {},
  globalStats: null,
  selectedCurrency: "usd",
  currentPage: 1,
  coinsPerPage: 20,
  chartDetails: [],
  chartTimeStamp: 1,
};

export const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    getAllCoins(state, action) {
      state.allCoins = action.payload;
    },
    getTopCoins(state, action) {
      state.topCoins = action.payload;
    },
    getCoinDetails(state, action) {
      state.coinDetails = action.payload;
    },
    getGlobalStats(state, action) {
      state.globalStats = action.payload;
    },
    getSelectedCurrency(state, action) {
      state.selectedCurrency = action.payload;
    },
    getCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    getCoinsPerPage(state, action) {
      state.coinsPerPage = action.payload;
    },
    getChartDetails(state, action) {
      state.chartDetails = action.payload;
    },
    getChartTimeStamp(state, action) {
      state.chartTimeStamp = action.payload;
    },
  },
});

export const {
  getAllCoins,
  getTopCoins,
  getCoinDetails,
  getGlobalStats,
  getSelectedCurrency,
  getCurrentPage,
  getCoinsPerPage,
  getChartDetails,
  getChartTimeStamp,
} = cryptoSlice.actions;
