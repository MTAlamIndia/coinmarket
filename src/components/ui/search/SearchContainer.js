import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { deactivateSearch } from "../../../store/searchSlice";
import RecentlySearchedCoins from "./RecentlySearchedCoins";
import SearchBox from "./SearchBox";
import SearchResultsCoins from "./SearchResultsCoins";

const SearchContainer = () => {
  const ref = useRef();
  const dispatch = useDispatch();

  const { isSearchActive } = useSelector((state) => state.searchSliceReducer);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (isSearchActive && ref.current && !ref.current.contains(e.target)) {
        dispatch(deactivateSearch());
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isSearchActive, dispatch]);

  return (
    <>
      <div className="search__container" ref={ref}>
        <SearchBox />
        <SearchResultsCoins />
        <RecentlySearchedCoins />
      </div>
    </>
  );
};

export default SearchContainer;
