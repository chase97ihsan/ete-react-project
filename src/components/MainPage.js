import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "../contexts/CompanyContext";

import { ProductContext } from "../contexts/ProductContext";
import { AuthContext } from "../contexts/AuthContext";

export default function MainPage() {
  const { allCompanies } = useContext(CompanyContext);
  const { allProducts } = useContext(ProductContext);
  const last4Companies = allCompanies.slice(-3).reverse();
  const last4Products = allProducts.slice(-3).reverse();

  return (
    <div className=" text-light border rounded-5 border-light border-4 ">
      <h1
        className=" fw-bold mb-5 text-info text-center"
        style={{ textShadow: "0 0 10px rgba(255, 255, 255, 0.8)" }}
      >
        Lastly Added
      </h1>
      <section className="container d-flex justify-content-around g-5 text-light">
        <div className=" container">
          <h2
            className="mb-3  "
            style={{
              width: "182px",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
            }}
          >
            COMPANIES
          </h2>
          <div className="row">
            <ul className="list-group">
              <li
                className="col align-self-start list-group-item list-group-item-info "
                style={{ paddingRight: "150px" }}
              >
                {last4Companies[0] ? (
                  <h3>{last4Companies[0].name}</h3>
                ) : (
                  <h3>Empty</h3>
                )}
              </li>
              <li
                className="col align-self-center list-group-item list-group-item-light"
                style={{ paddingRight: "150px" }}
              >
                {last4Companies[1] ? (
                  <h3>{last4Companies[1].name}</h3>
                ) : (
                  <h3>Empty</h3>
                )}
              </li>
              <li
                className="col align-self-end list-group-item list-group-item-primary"
                style={{ paddingRight: "150px" }}
              >
                {last4Companies[2] ? (
                  <h3>{last4Companies[2].name}</h3>
                ) : (
                  <h3>Empty</h3>
                )}
              </li>
            </ul>
          </div>
        </div>
        <div className=" container">
          <h2
            className=" mb-3 "
            style={{
              width: "165px",
              marginLeft: "268px",
              textShadow: "0 0 10px rgba(255, 255, 255, 0.8)",
            }}
          >
            PRODUCTS
          </h2>
          <div className="row ">
            <ul className="list-group">
              <li
                className=" col align-self-end list-group-item list-group-item-primary "
                style={{ paddingRight: "150px" }}
              >
                {last4Products[0] ? (
                  <h3>{last4Products[0].name}</h3>
                ) : (
                  <h3>Empty</h3>
                )}
              </li>
              <li
                className="col align-self-center list-group-item list-group-item-light"
                style={{ paddingRight: "150px" }}
              >
                {last4Products[1] ? (
                  <h3>{last4Products[1].name}</h3>
                ) : (
                  <h3>Empty</h3>
                )}
              </li>
              <li
                className="col align-self-start list-group-item list-group-item-info"
                style={{ paddingRight: "150px" }}
              >
                {last4Products[2] ? (
                  <h3>{last4Products[2].name}</h3>
                ) : (
                  <h3>Empty</h3>
                )}
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
