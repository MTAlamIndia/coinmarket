import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  deactivateSearch,
  getRecentlySearchedCoins,
  getSearchedCoins,
} from "../../../store/searchSlice";

const SearchResultsCoins = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { allCoins, topCoins } = useSelector(
    (state) => state.cryptoSliceReducer
  );
  const { searchedCoins } = useSelector((state) => state.searchSliceReducer);

  const coinRedirectHandler = (id) => {
    navigate(`currencies/${id}`);

    const addToRecentlySearched = allCoins?.find((coin) => coin?.id === id);

    dispatch(getRecentlySearchedCoins(addToRecentlySearched));
    dispatch(deactivateSearch());
    dispatch(getSearchedCoins(topCoins));
  };

  return (
    <>
      <div className="search__results">
        {searchedCoins?.map((coin) => (
          <div
            key={coin?.id}
            className="result"
            onClick={() => coinRedirectHandler(coin?.id)}
          >
            <span className="name">{coin?.name}</span>
            <span className="symbol">{coin?.symbol}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default SearchResultsCoins;
