import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CompanyContext = createContext();
function CompanyContextProvider({ children }) {
  const [allCompanies, setAllCompanies] = useState([]);
  const { parsedData } = useContext(AuthContext);

  const navigate = useNavigate();
  if (!parsedData) {
    navigate("/");
  }

  const deleteCompany = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/company/${id}`)
      .then((res) => {
        console.log(res.data);
        getCompanies();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCompany = (company) => {
    const id = company.id;
    // console.log(company);
    axios
      .put(`http://localhost:3000/company/${id}`, company)
      .then((res) => {
        getCompanies();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCompanies = () => {
    axios
      .get("http://localhost:3000/company/")
      .then((res) => {
        setAllCompanies(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createCompany = (company) => {
    axios
      .post(`http://localhost:3000/company/create`, company)
      .then((res) => {
        getCompanies();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <CompanyContext.Provider
      value={{
        getCompanies,
        updateCompany,
        deleteCompany,
        allCompanies,
        createCompany,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
export default CompanyContextProvider;
