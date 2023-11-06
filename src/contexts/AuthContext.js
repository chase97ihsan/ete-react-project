import { children, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../hooks/UseLocalStorage";

export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [authInfo, setAuthInfo] = useLocalStorage("Token", {});

  const storedData = localStorage.getItem("Token");
  const parsedData = JSON.parse(storedData);
  let token;

  const navigate = useNavigate();
  useEffect(() => {
    if (!storedData) {
      navigate("/");
    }
  }, [parsedData]);

  const logIn = (credentials) => {
    axios
      .post("http://localhost:3000/auth/login", credentials)
      .then((res) => {
        if (res.data.token && res.data.token !== "") {
          setAuthInfo(res.data);
          const expirationTime = new Date().getTime() + 3 * 60 * 60 * 1000; //*** Token'a süre uygulama :  3 saatlik süre
          localStorage.setItem("tokenExpiration", expirationTime);
          navigate("/home-page/");
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /*Token süresi*/
  const tokenExpiration = localStorage.getItem("tokenExpiration");
  if (tokenExpiration && new Date().getTime() > tokenExpiration) {
    // Token süresi dolmuş, token'i temizle
    localStorage.removeItem("Token");
    localStorage.removeItem("tokenExpiration");
    navigate("/");
  }

  const logOut = () => {
    axios
      .post("http://localhost:3000/auth/logout")
      .then((res) => {
        navigate("/logIn");
        localStorage.removeItem("Token");
        localStorage.removeItem("tokenExpiration");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signIn = (formdata) => {
    axios
      .post("http://localhost:3000/auth/register", formdata)
      .then((res) => {
        if (res.data === true) {
          navigate("/logIn");
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 409) {
          console.log("oldu");
        }
      });
  };
  return (
    <AuthContext.Provider
      value={{
        logIn,
        logOut,
        signIn,
        authInfo,
        parsedData,
        storedData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
