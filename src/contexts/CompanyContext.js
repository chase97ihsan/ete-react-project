import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const CompanyContext = createContext();
function CompanyContextProvider({ children }) {
  const [allCompanies, setAllCompanies] = useState([]);
  const { parsedData } = useContext(AuthContext);

  const navigate = useNavigate();
  if (!parsedData) {
    navigate("/");
  }

  const deleteCompany = (id) => {
    axios
      .delete(`http://localhost:3000/company/${id}`)
      .then((res) => {
        getCompanies();
        toast.success("Deleted successfully!", {
          position: "top-left",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateCompany = (company) => {
    const id = company.id;
    axios
      .put(`http://localhost:3000/company/${id}`, company)
      .then((res) => {
        getCompanies();
        toast.success("Edited successfully!", {
          position: "top-left",
        });
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
      })
      .catch((err) => {
        console.log("Unauthorized" + ":" + err);
        navigate("/logIn");
      });
  };

  const createCompany = (company) => {
    axios
      .post(`http://localhost:3000/company/create`, company)
      .then((res) => {
        getCompanies();
        toast.success("Added successfully!", {
          position: "top-left",
        });
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
        setAllCompanies,
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
}
export default CompanyContextProvider;
