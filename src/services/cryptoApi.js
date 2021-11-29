import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

require("dotenv").config();

const baseUrl = process.env.REACT_APP_RAPID_API_COINGECKO_URL;

const cryptoApiHeaders = {
  "x-rapidapi-host": process.env.REACT_APP_RAPID_API_COINGECKO_HOST,
  "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
};

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({ baseUrl }),
  endpoints: (builder) => ({
    getCryptoCoins: builder.query({
      query: () => createRequest("/coins/list"),
    }),
    getCoinsMarkets: builder.query({
      query: ({ currency = "usd", page = 1, perPage = 20 }) =>
        createRequest(
          `/coins/markets/?vs_currency=${currency}&page=${page}&per_page=${perPage}&order=market_cap_desc`
        ),
    }),
    getSupportedCurrency: builder.query({
      query: () => createRequest("/simple/supported_vs_currencies"),
    }),
    getGlobalStats: builder.query({
      query: () => createRequest(`/global`),
    }),
    getCoinDetails: builder.query({
      query: (id) => createRequest(`/coins/${id}`),
    }),
    getCoinMarketChat: builder.query({
      query: ({ coin, currency = "usd", days = 1 }) =>
        createRequest(
          `/coins/${coin}/market_chart?vs_currency=${currency}&days=${days}`
        ),
    }),
  }),
});

export const {
  useGetCryptoCoinsQuery,
  useGetCoinsMarketsQuery,
  useGetSupportedCurrencyQuery,
  useGetGlobalStatsQuery,
  useGetCoinDetailsQuery,
  useGetCoinMarketChatQuery,
} = cryptoApi;
