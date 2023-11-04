import { children, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../hooks/UseLocalStorage";

export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [authInfo, setAuthInfo] = useLocalStorage("Token", {});
  const navigate = useNavigate();

  const storedData = localStorage.getItem("Token");
  const parsedData = JSON.parse(storedData);
  let token;
  if (storedData) {
    token = parsedData.token;
  } else {
    console.log("Local storage value is empty!");
  }

  const logIn = (credentials) => {
    axios
      .post("http://localhost:9000/auth/login", credentials)
      .then((res) => {
        if (res.data.token && res.data.token !== "") {
          setAuthInfo(res.data);
          const expirationTime = new Date().getTime() + 3 * 60 * 60 * 1000; // 3 saatlik süre
          localStorage.setItem("tokenExpiration", expirationTime);
          console.log(res.data);
          console.log("olduu");
          navigate("/home-page");
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log("Error:" + err);
      });
  };
  /*Token süresi*/
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (tokenExpiration && new Date().getTime() > tokenExpiration) {
    // Token süresi dolmuş, token'i temizle
    localStorage.removeItem("Token");
    localStorage.removeItem("tokenExpiration");
  }

  /* const logOut = () => {
    axios
      .post("http://localhost:9000/auth/logout", { email })
      .then((res) => {
        console.log(res.data);
        if (res.data !== "" || res.data !== null) {
          navigate("/login");
          localStorage.removeItem("Token");
          localStorage.removeItem("tokenExpiration");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };*/
  const signIn = (formdata) => {
    axios.post("http://localhost:9000/auth/register", formdata).then((res) => {
      if (res.data !== "") {
        navigate("/logIn");
        console.log(res.data);
      } else {
        navigate("/");
        console.log(res.data);
      }
    });
  };
  return (
    <AuthContext.Provider
      value={{
        logIn,
        // logOut,
        signIn,
        authInfo,
        token,
        parsedData,
        storedData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
