import { BiCaretUp, BiCaretDown } from "react-icons/bi";
import getSymbolFromCurrency from "currency-symbol-map";
import { useSelector } from "react-redux";

import Badge from "../ui/badge";

const PriceDataCard = ({
  title,
  badgeText,
  value,
  percentage,
  percentageBar,
}) => {
  const { selectedCurrency } = useSelector((state) => state.cryptoSliceReducer);

  const currencySubmol = getSymbolFromCurrency(selectedCurrency);

  const currency = currencySubmol
    ? currencySubmol
    : `${selectedCurrency.toUpperCase()}`;

  const numberWithCommas = (x) => {
    return x?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <div className="price__data__card">
        <div className="card__title">
          {title}
          {badgeText && <Badge>{badgeText}</Badge>}
        </div>
        <p className="value">
          {!isNaN(value) && (
            <>
              {value > 0 ? (
                <>
                  {currency}
                  {numberWithCommas(value.toFixed(2))}
                </>
              ) : (
                <>
                  {currency}
                  {numberWithCommas(value?.toFixed(2).replace("-", ""))}
                </>
              )}
            </>
          )}

          {isNaN(value) && value}
        </p>
        {percentage && (
          <p className={percentage > 0 ? "market__up" : "market__down"}>
            {percentage > 0 ? (
              <>
                <BiCaretUp />
                {percentage?.toFixed(2)}%
              </>
            ) : (
              <>
                <BiCaretDown />
                {percentage?.toFixed(2).replace("-", "")}%
              </>
            )}
          </p>
        )}
        {percentageBar && (
          <div className="percentage__bar">
            <span
              className="bar__width"
              style={{ width: `${percentageBar}%` }}
              data-percent={`${percentageBar}%`}
            ></span>
          </div>
        )}
      </div>
    </>
  );
};

export default PriceDataCard;
