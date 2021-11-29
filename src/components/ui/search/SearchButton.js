import { BiSearch } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { activateSearch } from "../../../store/searchSlice";

const SearchButton = () => {
  const dispatch = useDispatch();
  return (
    <>
      <div
        className="search__button"
        onClick={() => dispatch(activateSearch())}
      >
        <BiSearch />
        Search Coins
      </div>
    </>
  );
};

export default SearchButton;
