import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deactivateSearch,
  getRecentlySearchedCoins,
  getSearchedCoins,
} from "../../../store/searchSlice";

const RecentlySearchedCoins = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { recentlySearchedCoins } = useSelector(
    (state) => state.searchSliceReducer
  );
  const { topCoins } = useSelector((state) => state.cryptoSliceReducer);

  const coinRedirectHandler = (id) => {
    navigate(`currencies/${id}`);
    dispatch(deactivateSearch());
    dispatch(getSearchedCoins(topCoins));

    const filteredCoin = recentlySearchedCoins?.find((coin) => coin?.id === id);
    dispatch(getRecentlySearchedCoins(filteredCoin));
  };
  return (
    <>
      {recentlySearchedCoins.length > 0 && (
        <>
          <p style={{ paddingTop: 20, paddingLeft: 10 }}>Recently Searched</p>
          <div className="recently__searched">
            {recentlySearchedCoins?.map((coin) => (
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
      )}
    </>
  );
};

export default RecentlySearchedCoins;
