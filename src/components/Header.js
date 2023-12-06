import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { NavLink } from "react-router-dom";

function Header() {
  const { logOut } = useContext(AuthContext);
  function handle() {
    logOut();
  }
  const headerLink = "";
  return (
    <div className="container" style={{ width: "1000px" }}>
      <nav
        className="navbar navbar-expand  bg-dark justify-content-between border border-3  rounded border-info border-top-0  "
        data-bs-theme="dark"
      >
        <ul class="navbar-nav ms-2 mt-4">
          <li className="nav-item me-4">
            <NavLink to="/home-page/" className="nav-link">
              <h2>HOME PAGE</h2>
            </NavLink>
          </li>

          <li className="nav-item me-4">
            <NavLink to="home-page/companies" className="nav-link">
              <h2>COMPANIES</h2>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="home-page/products" className="nav-link">
              <h2>PRODUCTS</h2>
            </NavLink>
          </li>
        </ul>
        <button
          className="btn btn-outline-info me-3 d-flex  align-items-center justify-content-between mt-3"
          type="button"
          onClick={() => {
            handle();
          }}
        >
          <h2 className="mt-1">LOG OUT</h2>
          <i class="fa-solid fa-right-from-bracket fa-2xl ms-2 text-light"></i>
        </button>
      </nav>
    </div>
  );
}
export default Header;
