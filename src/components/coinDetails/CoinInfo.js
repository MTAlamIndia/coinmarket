import { useSelector } from "react-redux";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";
import { BsLink45Deg } from "react-icons/bs";
import { BiSearch } from "react-icons/bi";
import { MdKeyboardArrowDown } from "react-icons/md";

import Title from "../../components/ui/title";
import Badge from "../ui/badge";

import Loader from "../ui/loader";

import "./coinInfo.scss";

const CoinInfo = () => {
  const { coinDetails } = useSelector((state) => state.cryptoSliceReducer);

  if (!coinDetails) return <Loader />;

  const { name, image, symbol, market_cap_rank, categories, links } =
    coinDetails;

  const { homepage, blockchain_site } = links;

  return (
    <>
      {coinDetails && (
        <div className="coin__info">
          <div className="coin__info__head">
            <div className="top">
              <img
                src={image?.small || image?.large || image?.thumb}
                alt={name}
              />
              <Title title={name} />

              <Badge classes="symbol">{symbol.toUpperCase()}</Badge>

              <div className="wishlist">
                <AiOutlineStar />
              </div>
            </div>

            <div className="bottom">
              <Badge classes="rank">Rank #{market_cap_rank}</Badge>
              {categories?.map((category, i) => (
                <Badge key={i}>{category}</Badge>
              ))}
            </div>
          </div>

          <div className="coin__info__links">
            {homepage?.map(
              (url, i) =>
                url && (
                  <Badge key={i}>
                    <a href={url} target="_blank" rel="noreferrer">
                      <BsLink45Deg />
                      {url?.toLowerCase()}
                    </a>
                  </Badge>
                )
            )}

            {blockchain_site && (
              <Badge classes="hoverable">
                <BiSearch />
                Explorers
                <MdKeyboardArrowDown />
                <div className="items">
                  {blockchain_site?.map(
                    (url, i) =>
                      url && (
                        <a key={i} href={url} target="_blank" rel="noreferrer">
                          {`${new URL(url).hostname.toLowerCase()}${new URL(
                            url
                          ).pathname.toLowerCase()}`}
                        </a>
                      )
                  )}
                </div>
              </Badge>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default CoinInfo;
