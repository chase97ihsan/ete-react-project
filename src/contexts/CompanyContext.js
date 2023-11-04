import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const CompanyContext = createContext();
function CompanyContextProvider({ children }) {
  const { token, parsedData, storedData } = useContext(AuthContext);
  const [allCompanies, setAllCompanies] = useState([]);

  const deleteCompany = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:9000/company/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("çalıştı");
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCompany = (company) => {
    // console.log(company);
    axios
      .put(`http://localhost:9000/company/update`, company, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getCompanies();
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCompanies = () => {
    console.log(storedData);
    axios
      .post("http://localhost:9000/company/", {
        headers: {
          Authorization: storedData.token,
        },
      })
      .then((res) => {
        if (res.data.length !== 0) {
          setAllCompanies(res.data.slice().reverse());
          console.log(res.data);
        } else if (res.data.length !== 0) {
          console.log("There is no any company to show");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <CompanyContext.Provider
      value={{
        getCompanies,
        updateCompany,
        deleteCompany,
        allCompanies,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
export default CompanyContextProvider;
