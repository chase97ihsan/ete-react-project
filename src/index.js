import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import CompanyContextProvider from "./contexts/CompanyContext";
import ProductContextProvider from "./contexts/ProductContext";

/*if (process.env.NODE_ENV === "development") {
  const { worker } = import("./mocks/browser");
  return worker.start();
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
}*/
async function deferRender() {
  if (process.env.NODE_ENV !== "development") {
    return;
  }

  const { worker } = await import("./mocks/browser");

  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start();
}

deferRender().then(() => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <AuthContextProvider>
          <CompanyContextProvider>
            <ProductContextProvider>
              <App />
            </ProductContextProvider>
          </CompanyContextProvider>
        </AuthContextProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
