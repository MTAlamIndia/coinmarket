import { useSelector } from "react-redux";
import getSymbolFromCurrency from "currency-symbol-map";

import millify from "millify";

import Container from "../../ui/container";
import TopStatistics from "./TopStatistics";

import SelectCurrency from "./SelectCurrency";

import "./topHeader.scss";

const TopHeader = () => {
  const { globalStats, selectedCurrency } = useSelector(
    (state) => state.cryptoSliceReducer
  );
  const currencySubmol = getSymbolFromCurrency(selectedCurrency);

  const currency = currencySubmol
    ? currencySubmol
    : `${selectedCurrency.toUpperCase()} `;

  if (!globalStats) return null;

  const { active_cryptocurrencies, total_volume, markets, total_market_cap } =
    globalStats?.data;

  return (
    <>
      {globalStats && (
        <div className="top__header">
          <Container>
            <div className="wrapper">
              <div className="left">
                <TopStatistics text="Cryptos" value={active_cryptocurrencies} />
                <TopStatistics
                  text="Total vol"
                  value={`${currency}${millify(total_volume[selectedCurrency], {
                    precision: 3,
                  })}`}
                />
                <TopStatistics
                  text="market cap"
                  value={`${currency}${millify(
                    total_market_cap[selectedCurrency],
                    { precision: 3 }
                  )}`}
                />
                <TopStatistics text="markets" value={markets} />
              </div>
              <div className="right">
                <SelectCurrency />
              </div>
            </div>
          </Container>
        </div>
      )}
    </>
  );
};

export default TopHeader;
