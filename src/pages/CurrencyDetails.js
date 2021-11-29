import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { useGetCoinDetailsQuery } from "../services/cryptoApi";
import { getCoinDetails } from "../store/cryptoSlice";

import Main from "../components/layout/main";
import Container from "../components/ui/container";
import Loader from "../components/ui/loader";
import CoinDetails from "../components/coinDetails";

const CurrencyDetails = () => {
  const { currency } = useParams();
  const dispatch = useDispatch();

  const { data: coinDetails, isLoading } = useGetCoinDetailsQuery(currency);

  useEffect(() => {
    dispatch(getCoinDetails(coinDetails));
  }, [coinDetails, dispatch]);

  return (
    <>
      <Main>
        <Container>
          {isLoading && <Loader />}
          {!isLoading && (
            <>
              <CoinDetails />
            </>
          )}
        </Container>
      </Main>
    </>
  );
};

export default CurrencyDetails;
