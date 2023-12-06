import "./App.css";
import SignIn from "./components/SignIn";
import { Route, Routes } from "react-router-dom";
import LogIn from "./components/LogIn";
import HomePage from "./components/HomePage";
import ProductsTable from "./components/ProductsTable";
import CompaniesTable from "./components/CompaniesTable";
import { Slide, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
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
      <ToastContainer transition={Slide} />
    </div>
  );
}

export default App;
