import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { getSelectedCurrency } from "../../../store/cryptoSlice";
import { closeModal } from "../../../store/modalSlice";
import { AiFillCheckCircle } from "react-icons/ai";

const CurrencyCard = ({ currency }) => {
  const { selectedCurrency } = useSelector((state) => state.cryptoSliceReducer);
  const dispatch = useDispatch();

  const setCurrenctHandler = () => {
    dispatch(getSelectedCurrency(currency));
    dispatch(closeModal());
  };

  return (
    <>
      <div className="currency_card" onClick={setCurrenctHandler}>
        {currency}
        {selectedCurrency === currency && <AiFillCheckCircle />}
      </div>
    </>
  );
};

export default CurrencyCard;
