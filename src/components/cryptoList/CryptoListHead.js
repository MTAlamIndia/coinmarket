import getSymbolFromCurrency from "currency-symbol-map";
import { useSelector } from "react-redux";
import millify from "millify";

import Title from "../ui/title";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";

const CryptoListHead = ({ title }) => {
  const { globalStats, selectedCurrency } = useSelector(
    (state) => state.cryptoSliceReducer
  );
  const currencySubmol = getSymbolFromCurrency(selectedCurrency);
  const currency = currencySubmol
    ? currencySubmol
    : `${selectedCurrency.toUpperCase()} `;

  if (!globalStats) return null;

  const { total_market_cap, market_cap_change_percentage_24h_usd } =
    globalStats?.data;

  const changePercent = market_cap_change_percentage_24h_usd;

  const changeStatus =
    changePercent > 0 ? (
      <>
        <span className="market__up">
          <BiCaretUp />
          {changePercent.toFixed(2)}%
        </span>{" "}
        increase
      </>
    ) : (
      <>
        <span className="market__down">
          <BiCaretDown />
          {changePercent.toFixed(2).toString().replace("-", "")}%
        </span>{" "}
        decrease
      </>
    );
  return (
    <>
      {globalStats && (
        <>
          <Title title={title} />
          <p style={{ marginTop: 10 }}>
            The global crypto market cap is{" "}
            {`${currency}${millify(total_market_cap[selectedCurrency], {
              precision: 3,
            })}`}
            , a {changeStatus} over the last day.
          </p>
        </>
      )}
    </>
  );
};

export default CryptoListHead;
