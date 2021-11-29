import { Link, NavLink } from "react-router-dom";

import Container from "../../ui/container";
import Search from "../../ui/search";

import "./bottomHeader.scss";

const BottomHeader = () => {
  return (
    <>
      <div className="bottom__header">
        <Container>
          <div className="wrapper">
            <Link to="/" className="logo">
              <img src="/logo.svg" alt="Coin Market" />
            </Link>
            <nav>
              <ul>
                <li>
                  <NavLink to="/" activeClassName="active">
                    Cryptocurrencies
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/wishlist" activeClassName="active">
                    Wishlist
                  </NavLink>
                </li>
              </ul>
            </nav>
            <Search />
          </div>
        </Container>
      </div>
    </>
  );
};

export default BottomHeader;
