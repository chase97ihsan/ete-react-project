import logo from "./logo.svg";
import "./App.css";
import SignIn from "./components/SignIn";
import { Route, Routes, useNavigate } from "react-router-dom";
import LogIn from "./components/LogIn";
import HomePage from "./components/HomePage";
import { CompanyContext } from "./contexts/CompanyContext";
import { useContext, useEffect } from "react";
import CompaniesTable from "./components/CompaniesTable";
import { AuthContext } from "./contexts/AuthContext";
import ProductsTable from "./components/ProductsTable";
import { ProductContext } from "./contexts/ProductContext";

function App() {
  //const { parsedData } = useContext(AuthContext);
  const { getCompanies, updateCompany, allCompanies } =
    useContext(CompanyContext);
  const { getProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  /*useEffect(() => {
    if (Object.keys(parsedData).length !== 0) {
      getProducts();
      getCompanies();
    } else if (Object.keys(parsedData).length === 0) {
      navigate("/");
    }
  }, []);*/
  useEffect(() => {
    getCompanies();
    //getProducts();
  }, []);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/home-page/" element={<HomePage />}>
          <Route index={true} element={<CompaniesTable />} />
          <Route path="home-page/products" element={<ProductsTable />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
