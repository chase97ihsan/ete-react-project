import logo from "./logo.svg";
import "./App.css";
import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn";
import HomePage from "./components/HomePage";
import { CompanyContext } from "./contexts/CompanyContext";
import { useContext, useEffect } from "react";
import { AuthContext } from "./contexts/AuthContext";
import { ProductContext } from "./contexts/ProductContext";
import ProductsTable from "./components/ProductsTable";
import CompaniesTable from "./components/CompaniesTable";

function App() {
  const { getCompanies } = useContext(CompanyContext);
  const { storedData } = useContext(AuthContext);
  const { getProducts } = useContext(ProductContext);
  useEffect(() => {
    getProducts();
    getCompanies();
  }, [storedData]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/home-page/" element={<HomePage />}>
          <Route path="home-page/products" element={<ProductsTable />} />
          <Route path="home-page/companies" element={<CompaniesTable />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
