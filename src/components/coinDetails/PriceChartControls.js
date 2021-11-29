import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { useGetCoinMarketChatQuery } from "../../services/cryptoApi";
import { getChartDetails, getChartTimeStamp } from "../../store/cryptoSlice";

import Title from "../ui/title";

import "./priceChartControls.scss";

const PriceChartControls = () => {
  const dispatch = useDispatch();

  const { coinDetails, selectedCurrency, chartTimeStamp } = useSelector(
    (state) => state.cryptoSliceReducer
  );

  const { data: coinChart, isLoading } = useGetCoinMarketChatQuery({
    coin: coinDetails?.id,
    currency: selectedCurrency,
    days: chartTimeStamp,
  });

  const chartTimeHandler = (timestamp) => {
    dispatch(getChartTimeStamp(timestamp));
  };

  useEffect(() => {
    if (!isLoading) {
      const { prices } = coinChart;

      const updatedPrices = prices.map((price) => {
        if (price[1] < 1) {
          return price;
        }

        return [price[0], Number(price[1].toFixed(2))];
      });

      dispatch(getChartDetails([{ name: "price", data: updatedPrices }]));
    }
  }, [
    coinDetails,
    coinChart,
    selectedCurrency,
    chartTimeStamp,
    dispatch,
    isLoading,
  ]);

  return (
    <>
      <div className="time__stamp__controls">
        <Title
          title={`${
            coinDetails?.name
          }(${coinDetails?.symbol.toUpperCase()}) to ${selectedCurrency?.toUpperCase()} Chart`}
        />
        <ul>
          {[1, 7, 30, 90, 180, 365]?.map((item, i) => (
            <li
              key={i}
              onClick={() => chartTimeHandler(item)}
              className={chartTimeStamp === item ? "active" : null}
            >
              {item < 30 && `${item}D`}
              {item === 30 && `1M`}
              {item > 30 && item < 365 && `${item / 30}M`}
              {item === 365 && `1Y`}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default PriceChartControls;
