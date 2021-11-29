import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CryptoList from "../components/cryptoList";
import CryptoListHead from "../components/cryptoList/CryptoListHead";
import Layout from "../components/layout";
import Container from "../components/ui/container";

const Wishlist = () => {
  const { wishlist } = useSelector((state) => state.wishlistReducer);
  return (
    <>
      <Layout>
        <Container>
          <div className="crypto__list">
            <CryptoListHead title="Wishlist Coins" />
            {wishlist?.length > 0 ? (
              <CryptoList coinsList={wishlist} coinsCount={wishlist} />
            ) : (
              <div style={{ textAlign: "center", paddingTop: 30 }}>
                <p style={{ fontSize: 24, marginBottom: 5 }}>
                  Wishlist is empty
                </p>
                <Link to="/" style={{ fontSize: 16 }}>
                  Browse Coins
                </Link>
              </div>
            )}
          </div>
        </Container>
      </Layout>
    </>
  );
};

export default Wishlist;
