import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

function Header() {
  const { logOut } = useContext(AuthContext);
  function handle() {
    logOut();
  }

  return (
    <div className="header">
      <NavLink to="/home-page/" className="header-link">
        <h2>HOME PAGE</h2>
      </NavLink>
      <NavLink to="home-page/companies" className="header-link">
        <h2>COMPANIES</h2>
      </NavLink>
      <NavLink to="home-page/products" className="header-link">
        <h2>PRODUCTS</h2>
      </NavLink>
      <button
        className="header-link logOut"
        type="button"
        style={{
          fontWeight: "bolder",
          fontSize: "24px",
          color: "navy",
          backgroundColor: "white",
          paddingBottom: "41px",
          borderRadius: "15px",
        }}
        onClick={() => {
          handle();
        }}
      >
        <h2 style={{ marginTop: "73px" }}>LOG OUT</h2>
      </button>
    </div>
  );
}
export default Header;
