import { children, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../hooks/UseLocalStorage";
import { toast } from "react-toastify";

export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [authInfo, setAuthInfo] = useLocalStorage("Token", {});

  const storedData = localStorage.getItem("Token");
  const parsedData = JSON.parse(storedData);
  let token;

  const navigate = useNavigate();

  const logIn = (credentials) => {
    axios
      .post("http://localhost:3000/auth/login", credentials)
      .then((res) => {
        if (res.data.token && res.data.token !== "") {
          setAuthInfo(res.data);
          const expirationTime = new Date().getTime() + 3 * 60 * 60 * 1000; //*** Token'a süre uygulama :  3 saatlik süre
          localStorage.setItem("tokenExpiration", expirationTime);
          navigate("/home-page/");
          toast.success("Successfully logged in!");
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        toast.error("Incorrect user credentials!", {
          position: "top-center",
        });
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
        localStorage.removeItem("Token");
        localStorage.removeItem("tokenExpiration");
        navigate("/logIn");
        toast.successful("Successfully logged out!");
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
          toast.success("Successfully registered!", {
            position: "top-center",
          });
        } else {
          console.log(res.data);
        }
      })
      .catch((error) => {
        toast.warning("This user is already registered!", {
          position: "top-right",
        });
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
