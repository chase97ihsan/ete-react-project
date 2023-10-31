import { children, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useLocalStorage from "../hooks/UseLocalStorage";

export const AuthContext = createContext();
function AuthContextProvider({ children }) {
  const [authInfo, setAuthInfo] = useLocalStorage("User", {});
  const navigate = useNavigate();
  const storedData = localStorage.getItem("User");
  const parsedData = JSON.parse(storedData);
  let token;
  let email;
  let firstName;
  let lastName;
  if (storedData) {
    token = parsedData.token;
    email = parsedData.email;
    firstName = parsedData.firstName;
    lastName = parsedData.lastName;
  } else {
    console.log("Local storage value is empty!");
  }

  const logIn = (credentials) => {
    axios
      .post("http://localhost:9000/auth/login", credentials)
      .then((res) => {
        if (res.data.token !== "") {
          setAuthInfo(res.data);
          const expirationTime = new Date().getTime() + 3 * 60 * 60 * 1000; // 3 saatlik süre
          localStorage.setItem("userExpiration", expirationTime);
          console.log(res.data);
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
  const tokenExpiration = localStorage.getItem("userExpiration");
  if (tokenExpiration && new Date().getTime() > tokenExpiration) {
    // Token süresi dolmuş, token'i temizle
    localStorage.removeItem("User");
    localStorage.removeItem("userExpiration");
  }

  const logOut = () => {
    axios
      .post("http://localhost:9000/auth/logout", { email })
      .then((res) => {
        console.log(res.data);
        if (res.data !== "" || res.data !== null) {
          navigate("/login");
          localStorage.removeItem("User");
          localStorage.removeItem("userExpiration");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const signIn = (formdata) => {
    axios.post("http://localhost:9000/auth/register", formdata).then((res) => {
      if (res.data !== "") {
        navigate("/logIn");
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
        logOut,
        signIn,
        authInfo,
        token,
        email,
        parsedData,
        storedData,
        firstName,
        lastName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
export default AuthContextProvider;
