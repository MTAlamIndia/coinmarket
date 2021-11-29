import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

import Header from "./components/header";
import Home from "./pages/Home";

import {
  useGetCoinsMarketsQuery,
  useGetCryptoCoinsQuery,
  useGetGlobalStatsQuery,
} from "./services/cryptoApi";
import { getAllCoins, getGlobalStats, getTopCoins } from "./store/cryptoSlice";

import "./App.scss";
import CurrencyModal from "./components/ui/currencyModal";
import { useSelector } from "react-redux";
import { getSearchedCoins } from "./store/searchSlice";
import CurrencyDetails from "./pages/CurrencyDetails";
import Wishlist from "./pages/Wishlist";

const App = () => {
  const { data: currencyList } = useGetCryptoCoinsQuery();
  const { data: globalStats } = useGetGlobalStatsQuery();
  const { data: topCoins } = useGetCoinsMarketsQuery({});

  const dispatch = useDispatch();

  const { isModalActive } = useSelector((state) => state.modalSliceReducer);

  useEffect(() => {
    dispatch(getAllCoins(currencyList));
  }, [currencyList, dispatch]);

  useEffect(() => {
    dispatch(getGlobalStats(globalStats));
  }, [globalStats, dispatch]);

  useEffect(() => {
    dispatch(getSearchedCoins(topCoins));
    dispatch(getTopCoins(topCoins));
  }, [topCoins, dispatch]);

  return (
    <>
      {isModalActive && <CurrencyModal />}

      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route
          exact
          path="/currencies/:currency"
          element={<CurrencyDetails />}
        />
        <Route exact path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
};

export default App;
