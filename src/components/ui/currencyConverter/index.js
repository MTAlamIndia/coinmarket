import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CgArrowsExchangeAlt } from "react-icons/cg";

import "./currencyConverter.scss";
import Title from "../title";
import { floatingNumbers } from "../../../custom-functions";

const CurrencyConverter = () => {
  const { selectedCurrency, coinDetails } = useSelector(
    (state) => state.cryptoSliceReducer
  );
  const [baseCurrency, setBaseCurrency] = useState({
    name: coinDetails?.symbol,
    value: 1,
  });
  const [targetCurrency, setTargetCurrency] = useState({
    name: selectedCurrency,
    value: 0,
  });

  const exChangeHandler = () => {
    setBaseCurrency({
      name: targetCurrency?.name,
      value: targetCurrency?.value,
    });
    setTargetCurrency({
      name: baseCurrency?.name,
      value: baseCurrency?.value,
    });
  };

  const baseCurrencyHandler = (e) => {
    const value = e.target.value;

    setBaseCurrency((prev) => ({
      ...prev,
      value,
    }));

    if (baseCurrency?.name === coinDetails?.symbol) {
      setTargetCurrency((prev) => ({
        ...prev,
        value:
          value * coinDetails?.market_data?.current_price?.[selectedCurrency],
      }));

      return;
    }

    setTargetCurrency((prev) => ({
      ...prev,
      value:
        value / coinDetails?.market_data?.current_price?.[selectedCurrency],
    }));
  };

  const targetCurrencyHandler = (e) => {
    const value = e.target.value;
    setTargetCurrency((prev) => ({
      ...prev,
      value,
    }));

    if (targetCurrency?.name === selectedCurrency) {
      setBaseCurrency((prev) => ({
        ...prev,
        value:
          value / coinDetails?.market_data?.current_price?.[selectedCurrency],
      }));
      return;
    }

    setBaseCurrency((prev) => ({
      ...prev,
      value:
        value * coinDetails?.market_data?.current_price?.[selectedCurrency],
    }));
  };

  useEffect(() => {
    setBaseCurrency({
      name: coinDetails?.symbol,
      value: 1,
    });

    setTargetCurrency({
      name: selectedCurrency,
      value: coinDetails?.market_data?.current_price?.[selectedCurrency],
    });
  }, [coinDetails, selectedCurrency]);

  return (
    <>
      <Title
        title={`${baseCurrency?.name?.toUpperCase()} to ${targetCurrency?.name?.toUpperCase()} Converter`}
      />
      <div className="currency__converter">
        <div className="base__currency">
          <label htmlFor="base">{baseCurrency?.name?.toUpperCase()}</label>
          <input
            type="number"
            id="base"
            value={floatingNumbers(baseCurrency?.value)}
            onChange={baseCurrencyHandler}
          />
        </div>
        <div className="exchangeButton" onClick={exChangeHandler}>
          <CgArrowsExchangeAlt />
        </div>
        <div className="target__currency">
          <label htmlFor="target">{targetCurrency?.name?.toUpperCase()}</label>

          <input
            type="number"
            id="target"
            value={floatingNumbers(targetCurrency?.value) || 0}
            onChange={targetCurrencyHandler}
          />
        </div>
      </div>
    </>
  );
};

export default CurrencyConverter;
