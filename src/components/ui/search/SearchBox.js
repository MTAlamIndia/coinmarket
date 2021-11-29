import { BiSearch } from "react-icons/bi";
import { RiCloseCircleFill } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { deactivateSearch, getSearchedCoins } from "../../../store/searchSlice";

const SearchBox = () => {
  const { allCoins, topCoins } = useSelector(
    (state) => state.cryptoSliceReducer
  );

  const dispatch = useDispatch();

  const searchChangeHandler = (e) => {
    const { value } = e.target;
    let filteredCoins;
    if (value) {
      filteredCoins = allCoins?.filter(
        (coin) =>
          coin?.name?.toLowerCase()?.includes(value) ||
          coin?.symbol?.toLowerCase()?.includes(value)
      );
    }
    dispatch(getSearchedCoins(filteredCoins || topCoins));
  };

  return (
    <>
      <div className="search__box">
        <div className="search__input">
          <label htmlFor="search__coin">
            <BiSearch />
          </label>
          <input
            type="text"
            id="search__coin"
            placeholder="what are looking for?"
            onChange={searchChangeHandler}
            autoComplete="off"
          />
        </div>
        <div className="close" onClick={() => dispatch(deactivateSearch())}>
          <RiCloseCircleFill />
        </div>
      </div>
    </>
  );
};

export default SearchBox;
