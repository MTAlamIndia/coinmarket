import getSymbolFromCurrency from "currency-symbol-map";
import { useSelector } from "react-redux";

import PriceDataCard from "./PriceDataCard";

import "./coinPriceData.scss";
import millify from "millify";

const CoinPriceData = () => {
  const { coinDetails, selectedCurrency } = useSelector(
    (state) => state.cryptoSliceReducer
  );

  const currencySubmol = getSymbolFromCurrency(selectedCurrency);

  const currency = currencySubmol
    ? currencySubmol
    : `${selectedCurrency.toUpperCase()}`;

  const numberWithCommas = (x) => {
    return x?.toString()?.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
  };

  if (!coinDetails) return null;

  const { name, symbol, market_data } = coinDetails;
  const price = market_data?.current_price[selectedCurrency];
  const {
    low_24h,
    high_24h,
    market_cap,
    market_cap_change_percentage_24h,
    fully_diluted_valuation,
    market_cap_change_24h_in_currency,
    circulating_supply,

    total_supply,
  } = market_data;

  const lowPrice = low_24h?.[selectedCurrency];
  const highPrice = high_24h?.[selectedCurrency];

  const rangePercentage = ((price - lowPrice) * 100) / (highPrice - lowPrice);
  const circulatingPercentage = (circulating_supply / total_supply) * 100;

  return (
    <>
      {coinDetails && (
        <div className="coin__price__data">
          <div className="top">
            <p style={{ textTransform: "capitalize" }}>
              {name} price ({symbol?.toUpperCase()})
            </p>
            <p className="price">
              {currency}
              {Math.sign(Math.trunc(price)) === 0
                ? numberWithCommas(price)
                : numberWithCommas(price.toFixed(2))}
            </p>

            <p className="low__high__price">
              Low:{"  "}
              <span className="price__change">
                {currency}

                {Math.sign(Math.trunc(lowPrice)) === 0
                  ? numberWithCommas(lowPrice)
                  : numberWithCommas(lowPrice.toFixed(2))}
              </span>
              <span className="bar__holder">
                <span
                  className="bar"
                  style={{
                    width: `${rangePercentage}%`,
                  }}
                />
              </span>
              High:{" "}
              <span className="price__change">
                {currency}
                {Math.sign(Math.trunc(highPrice)) === 0
                  ? numberWithCommas(highPrice)
                  : numberWithCommas(highPrice.toFixed(2))}
              </span>
            </p>
          </div>
          <div className="bottom">
            <div className="price__data__cards">
              <PriceDataCard
                title="Market Cap"
                value={market_cap?.[selectedCurrency]}
              />
              <PriceDataCard
                title="Fully Diluted Market Cap"
                value={fully_diluted_valuation?.[selectedCurrency]}
              />
              <PriceDataCard
                title="Market Cap Change"
                badgeText="24h"
                value={market_cap_change_24h_in_currency?.[selectedCurrency]}
                percentage={market_cap_change_percentage_24h}
              />
              <PriceDataCard
                title="Circulating Supply"
                value={`${millify(circulating_supply)} ${symbol.toUpperCase()}`}
                percentageBar={circulatingPercentage.toFixed(2)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CoinPriceData;
