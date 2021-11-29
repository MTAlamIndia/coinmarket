import { useEffect, useState } from "react";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentPage } from "../../store/cryptoSlice";

import Loader from "../ui/loader";
import CryptoCoin from "./CryptoCoin";

import "./cryptoList.scss";

const CryptoList = ({ coinsList, coinsCount }) => {
  const { currentPage, coinsPerPage } = useSelector(
    (state) => state.cryptoSliceReducer
  );

  const dispatch = useDispatch();

  const [sortedTitle, setSortedTitle] = useState("Name");
  const [sortType, setSortType] = useState("inc");

  const [pageCount, setPageCount] = useState(currentPage);

  useEffect(() => {
    setPageCount(Math.ceil(coinsCount?.length / coinsPerPage));
  }, [coinsCount, coinsPerPage, currentPage]);

  const handlePageClick = (event) => {
    dispatch(getCurrentPage(event.selected + 1));
  };

  const sortTitleHandle = (title) => {
    setSortedTitle(title);
    if (sortType === "inc") setSortType("dec");
    if (sortType === "dec") setSortType("inc");
    if (sortedTitle !== title) setSortType("inc");
  };

  const tableHeadtTitles = [
    "#",
    "Name",
    "Price",
    "24h %",
    "market cap (24h)",
    "market cap",
    "circulating supply",
  ];

  return (
    <>
      <div className="table__responsive">
        <table>
          <thead>
            <tr>
              <th></th>
              {tableHeadtTitles?.map((item, i) => (
                <th key={i} onClick={() => sortTitleHandle(item)}>
                  {item}
                  {sortedTitle === item && (
                    <>
                      {sortType === "inc" && <BiCaretUp />}
                      {sortType === "dec" && <BiCaretDown />}
                    </>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coinsList?.flatMap((coin, i) => (
              <CryptoCoin
                key={coin?.id}
                {...coin}
                index={(currentPage - 1) * coinsPerPage + (i + 1)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {pageCount > 1 && (
        <div className="pagination">
          <ReactPaginate
            breakLabel="..."
            nextLabel={<MdNavigateNext />}
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel={<MdNavigateBefore />}
          />
        </div>
      )}
    </>
  );
};

export default CryptoList;
