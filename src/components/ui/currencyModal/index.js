import Modal from "../modal";
import Title from "../title";
import { BiSearch } from "react-icons/bi";

import { useGetSupportedCurrencyQuery } from "../../../services/cryptoApi";

import "./currencyModal.scss";
import CurrencyCard from "./CurrencyCard";
import { useEffect, useState } from "react";

const CurrencyModal = () => {
  const { data: supportedCurrencies } = useGetSupportedCurrencyQuery();
  const [SearchResultCurrency, setSearchResultCurrency] = useState([]);

  const searchCurrencyHandler = (e) => {
    const { value } = e.target;

    const filteredCurrency = supportedCurrencies?.filter((curr) =>
      curr?.includes(value)
    );

    setSearchResultCurrency(filteredCurrency);
  };

  useEffect(() => {
    setSearchResultCurrency(supportedCurrencies);
  }, [supportedCurrencies]);

  return (
    <>
      <Modal>
        <div className="currency__modal">
          <div className="fixed__title">
            <Title title="Select Currency" />
            <div className="search__currency">
              <label htmlFor="search__currency">
                <BiSearch />
              </label>
              <input
                type="text"
                placeholder="Search currency..."
                id="search__currency"
                onChange={searchCurrencyHandler}
                autoComplete="off"
              />
            </div>
          </div>

          <div className="currency_cards">
            {SearchResultCurrency?.map((currency, i) => (
              <CurrencyCard key={i} currency={currency} />
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CurrencyModal;
