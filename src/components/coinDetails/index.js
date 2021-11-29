import CoinInfo from "./CoinInfo";
import CoinPriceData from "./CoinPriceData";
import PriceChart from "./PriceChart";

import "./coinDetails.scss";
import CurrencyConverter from "../ui/currencyConverter";

const CoinDetails = () => {
  return (
    <>
      <div className="coin__details">
        <div className="info__price__data">
          <CoinInfo />
          <CoinPriceData />
        </div>
        <div className="coin__chart__statistics">
          <PriceChart />
          <div className="statistics">
            <CurrencyConverter />
          </div>
        </div>
      </div>
    </>
  );
};

export default CoinDetails;
