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
      <NavLink to="/home-page" className="header-link">
        <h3>Home Page</h3>
      </NavLink>
      <NavLink to="/home-page" className="header-link">
        <h3>Companies</h3>
      </NavLink>
      <NavLink to="/home-page/products" className="header-link">
        <h3 style={{ padding: "0 15px 0 15px" }}>Products Of Companies</h3>
      </NavLink>
      <button
        className="header-link"
        type="button"
        style={{
          fontWeight: "bolder",
          fontSize: "27px",
          color: "  #093267b3",
          backgroundColor: "#77baee",
        }}
        onClick={() => {
          handle();
        }}
      >
        Log out
      </button>
    </div>
  );
}
export default Header;
