import getSymbolFromCurrency from "currency-symbol-map";
import millify from "millify";

import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BiCaretDown, BiCaretUp } from "react-icons/bi";
import { floatingNumbers } from "../../custom-functions";
import { useDispatch } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../store/wishlistSlice";

const CryptoCoin = ({
  index,
  id,
  name,
  image,
  symbol,
  current_price,
  price_change_percentage_24h,
  market_cap,
  market_cap_change_24h,
  circulating_supply,
}) => {
  const dispatch = useDispatch();
  const { selectedCurrency } = useSelector((state) => state.cryptoSliceReducer);
  const { wishlist } = useSelector((state) => state.wishlistReducer);

  const currencySubmol = getSymbolFromCurrency(selectedCurrency);

  const currency = currencySubmol
    ? currencySubmol
    : `${selectedCurrency.toUpperCase()}`;

  const addToWishlistHandler = () => {
    const item = {
      id,
      name,
      image,
      symbol,
      current_price,
      price_change_percentage_24h,
      market_cap,
      market_cap_change_24h,
      circulating_supply,
    };
    dispatch(addToWishlist(item));
  };
  const wishlistExist = wishlist?.find((item) => item.id === id);

  return (
    <>
      <tr>
        <td className="wish__icon">
          {!wishlistExist ? (
            <span onClick={addToWishlistHandler}>
              <AiOutlineStar />
            </span>
          ) : (
            <span onClick={() => dispatch(removeFromWishlist(id))}>
              <AiFillStar />
            </span>
          )}
        </td>
        <td>{index}</td>

        {/* Name */}
        <td className="name">
          <Link to={`/currencies/${id}`}>
            <img src={image} alt={name} />
            {name}
            <span>{symbol?.toUpperCase()}</span>
          </Link>
        </td>

        {/* Price */}
        <td
          className={
            price_change_percentage_24h > 0 ? "market__up" : "market__down"
          }
        >
          <span className="currency">{currency}</span>
          {floatingNumbers(current_price)}
        </td>

        {/* 24h change in % */}
        <td
          className={
            price_change_percentage_24h > 0 ? "market__up" : "market__down"
          }
        >
          {price_change_percentage_24h && (
            <>
              {price_change_percentage_24h > 0 ? (
                <>
                  <BiCaretUp />
                  {price_change_percentage_24h?.toFixed(2)}%
                </>
              ) : (
                <>
                  <BiCaretDown />
                  {price_change_percentage_24h?.toFixed(2).replace("-", "")}%
                </>
              )}
            </>
          )}
        </td>

        {/* Market Cap 24h */}
        <td>
          {market_cap_change_24h && (
            <>
              <span className="currency">{currency}</span>
              {market_cap_change_24h > 0
                ? market_cap_change_24h.toFixed(0)
                : market_cap_change_24h.toFixed(0).replace("-", "")}
            </>
          )}
        </td>

        {/* Market Cap */}
        <td>
          {market_cap && (
            <>
              <span className="currency">{currency}</span>

              {millify(market_cap?.toFixed(0))}
            </>
          )}
        </td>

        {/* Circulating Supply */}
        <td>
          {circulating_supply && (
            <>
              <span className="currency">{currency}</span>
              {millify(Number(circulating_supply)?.toFixed(0))}
            </>
          )}
        </td>
      </tr>
    </>
  );
};

export default CryptoCoin;
