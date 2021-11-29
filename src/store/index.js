import { configureStore } from "@reduxjs/toolkit";

import { cryptoApi } from "../services/cryptoApi";
import { cryptoSlice } from "./cryptoSlice";
import { modalSlice } from "./modalSlice";
import { searchSlice } from "./searchSlice";
import { wishlistSlice } from "./wishlistSlice";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    cryptoSliceReducer: cryptoSlice.reducer,
    modalSliceReducer: modalSlice.reducer,
    searchSliceReducer: searchSlice.reducer,
    wishlistReducer: wishlistSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});
