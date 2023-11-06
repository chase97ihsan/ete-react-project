import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "../contexts/CompanyContext";
import CompaniesTable from "./CompaniesTable";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import ProductsTable from "./ProductsTable";
import { ProductContext } from "../contexts/ProductContext";
import { AuthContext } from "../contexts/AuthContext";
import CompanyUpdate from "./CompanyUpdate";
import ProductUpdate from "./ProductUpdate";
import MainPage from "./MainPage";

function HomePage() {
  const { deleteCompany, allCompanies } = useContext(CompanyContext);

  const { deleteProduct, allProducts } = useContext(ProductContext);

  const [companyModal, setCompanyModal] = useState(false);
  const [productModal, setProductModal] = useState(false);
  const [companyId, setCompanyId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [productCompanyId, setProductCompanyId] = useState(null);

  const toggleCompanyModal = (id) => {
    setCompanyId(id);
    setCompanyModal(!companyModal);
  };

  const toggleProductModal = (id, companyId) => {
    setProductId(id);
    setProductCompanyId(companyId);
    setProductModal(!productModal);
  };

  const closeModal = () => {
    setCompanyModal(false);
    setProductModal(false);
  };

  if (companyModal || productModal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="container">
      <Header />
      <section>
        {companyModal && <CompanyUpdate onClose={closeModal} id={companyId} />}
        {productModal && (
          <ProductUpdate
            onClose={closeModal}
            id={productId}
            companyId={productCompanyId}
          />
        )}
        <Routes>
          <Route index={true} element={<MainPage />} />
          <Route
            path="home-page/companies"
            element={
              <CompaniesTable
                searchable={true}
                head={[
                  { name: "Company ID", sortable: true },
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
                        onClick={() => toggleCompanyModal(company.id)}
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
                  { name: "Product ID", sortable: true },
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
                        onClick={() =>
                          toggleProductModal(product.id, product.companyId)
                        }
                      >
                        Edit
                      </button>,
                      <button
                        key={`delete-${product.id}`}
                        onClick={() => {
                          deleteProduct(product.id);
                        }}
                        className="action-button"
                        style={{
                          backgroundColor: " #ef4444",
                        }}
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
