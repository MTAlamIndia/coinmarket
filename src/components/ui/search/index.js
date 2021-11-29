import { useSelector } from "react-redux";

import SearchButton from "./SearchButton";
import SearchContainer from "./SearchContainer";

import "./search.scss";

const Search = () => {
  const { isSearchActive } = useSelector((state) => state.searchSliceReducer);

  return (
    <>
      <div className="search">
        <SearchButton />
        {isSearchActive && <SearchContainer />}
      </div>
    </>
  );
};

export default Search;
