import getSymbolFromCurrency from "currency-symbol-map";
import { BiCaretDown } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { openModal } from "../../../store/modalSlice";

const SelectCurrency = () => {
  const { selectedCurrency } = useSelector((state) => state.cryptoSliceReducer);
  const currencyIcon = getSymbolFromCurrency(selectedCurrency);

  const dispatch = useDispatch();

  const currencyModalHandler = () => {
    dispatch(openModal());
  };

  return (
    <>
      <div className="select__currency" onClick={currencyModalHandler}>
        {currencyIcon && <span className="currency__icon">{currencyIcon}</span>}
        {selectedCurrency.toUpperCase()}
        <BiCaretDown />
      </div>
    </>
  );
};

export default SelectCurrency;
