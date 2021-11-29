import { useSelector } from "react-redux";
import CryptoList from "../components/cryptoList";
import CryptoListHead from "../components/cryptoList/CryptoListHead";
import Main from "../components/layout/main";
import Container from "../components/ui/container";
import Loader from "../components/ui/loader";
import {
  useGetCoinsMarketsQuery,
  useGetCryptoCoinsQuery,
} from "../services/cryptoApi";

const Home = () => {
  const { selectedCurrency, currentPage, coinsPerPage } = useSelector(
    (state) => state.cryptoSliceReducer
  );
  const { data: coinsList, isLoading } = useGetCoinsMarketsQuery({
    currency: selectedCurrency,
    page: currentPage,
    perPage: coinsPerPage,
  });

  const { data: coinsCount } = useGetCryptoCoinsQuery();

  if (isLoading) return <Loader />;

  return (
    <>
      <Main>
        <Container>
          <div className="crypto__list">
            <CryptoListHead title="Today's Cryptocurrency Prices by Market Cap" />
            <CryptoList coinsList={coinsList} coinsCount={coinsCount} />
          </div>
        </Container>
      </Main>
    </>
  );
};

export default Home;
