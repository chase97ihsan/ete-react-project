import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "../contexts/CompanyContext";
import CompaniesTable from "./CompaniesTable";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import ProductsTable from "./ProductsTable";
import { ProductContext } from "../contexts/ProductContext";
import { AuthContext } from "../contexts/AuthContext";

function HomePage() {
  const { getCompanies, updateCompany, deleteCompany, allCompanies } =
    useContext(CompanyContext);
  const { parsedData } = useContext(AuthContext);
  const { getProducts, updateProduct, deleteProduct, allProducts } =
    useContext(ProductContext);
  const navigate = useNavigate();
  /*useEffect(() => {
    if (Object.keys(parsedData).length !== 0) {
      getProducts();
    } else if (Object.keys(parsedData).length === 0) {
      navigate("/");
    }
  }, []);*/
  useEffect(() => {
    getCompanies();
  }, []);
  return (
    <div className="container">
      <Header />
      <section>
        <Routes>
          <Route
            index={true}
            element={
              <CompaniesTable
                searchable={true}
                head={[
                  { name: "No" },
                  { name: "Company-Name", sortable: true },
                  { name: "Legal-Number" },
                  { name: "Country" },
                  { name: "Website" },
                  { name: "Action", width: 100 },
                ]}
                body={
                  allCompanies &&
                  allCompanies.map((company, key) => [
                    company.id,
                    <div className="name" key={`${company.name}`}>
                      {company.name}
                    </div>,
                    company.legalNumber,
                    company.country,
                    company.website,
                    [
                      <button
                        key={`edit-${company.id}`}
                        className="action-button"
                      >
                        Edit
                      </button>,
                      <button
                        key={`delete-${company.id}`}
                        onClick={() => {
                          deleteCompany(company.id);
                        }}
                        className="action-button"
                        style={{ backgroundColor: " #ef4444" }}
                      >
                        Delete
                      </button>,
                    ],
                  ])
                }
              />
            }
          />
          (
          <Route
            path="home-page/products"
            element={
              <ProductsTable
                searchable={true}
                head={[
                  { name: "No" },
                  { name: "Product-Name", sortable: true },
                  { name: "Product-Category" },
                  { name: "Product-Amount" },
                  { name: "Amount-Unit" },
                  { name: "Action", width: 150 },
                ]}
                body={
                  allProducts &&
                  allProducts.map((product, key) => [
                    product.id,
                    <div
                      className="name"
                      style={{ paddingLeft: "65px" }}
                      key={`${product.name}`}
                    >
                      {product.name}
                    </div>,
                    product.category,
                    product.amount,
                    product.amountUnit,
                    [
                      <button
                        key={`edit-${product.id}`}
                        className="action-button"
                      >
                        Edit
                      </button>,
                      <button
                        key={`delete-${product.id}`}
                        onClick={() => {
                          deleteProduct(product.id);
                        }}
                        className="action-button"
                        style={{ backgroundColor: " #ef4444" }}
                      >
                        Delete
                      </button>,
                    ],
                  ])
                }
              />
            }
          />
          )
        </Routes>
      </section>
    </div>
  );
}
export default HomePage;
