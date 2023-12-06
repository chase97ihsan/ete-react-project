import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "../contexts/CompanyContext";
import CompaniesTable from "./CompaniesTable";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import ProductsTable from "./ProductsTable";
import { ProductContext } from "../contexts/ProductContext";
import { AuthContext } from "../contexts/AuthContext";
import CompanyUpdate from "./CompanyUpdate";
import ProductUpdate from "./ProductUpdate";
import MainPage from "./MainPage";

function HomePage() {
  const { getCompanies, deleteCompany, allCompanies } =
    useContext(CompanyContext);
  const { storedData, parsedData } = useContext(AuthContext);
  const { getProducts, deleteProduct, allProducts } =
    useContext(ProductContext);

  const navigate = useNavigate();
  const [companyId, setCompanyId] = useState(null);
  const [productId, setProductId] = useState(null);
  const [productCompanyId, setProductCompanyId] = useState(null);

  const toggleCompanyModal = (id) => {
    setCompanyId(id);
  };

  const toggleProductModal = (id, companyId) => {
    setProductId(id);
    setProductCompanyId(companyId);
  };

  useEffect(() => {
    if (parsedData && Object.keys(parsedData).length > 0) {
      getCompanies();
    } else {
      navigate("/");
    }
  }, [storedData]);

  useEffect(() => {
    getProducts();
  }, [allCompanies.length]);

  return (
    <>
      <div
        className=" min-vh-100"
        style={{ backgroundColor: "rgb(12, 5, 33)" }}
      >
        <Header />

        <section
          className="container"
          style={{ width: "1010px", marginTop: "140px" }}
        >
          <div className="container d-flex justify-content-center text-center">
            <div
              className="modal fade"
              id="staticBackdropcd"
              data-bs-backdrop="static"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content border border-danger border-3">
                  <div className="modal-header bg-light">
                    <h1
                      className="modal-title  text-dark fw-bold"
                      id="staticBackdropLabel"
                      style={{ fontSize: "23px" }}
                    >
                      Are you sure you want to delete this company
                      <i className="fa-solid fa-question ms-1 text-danger fa-xl"></i>
                    </h1>
                  </div>
                  <div className="modal-body text-start  ">
                    If you press the{" "}
                    <span className="text-primary fw-bold fs-5">YES</span>{" "}
                    button, products affiliated with the company will also be
                    deleted.
                  </div>
                  <div className="modal-footer bg-light">
                    <button
                      type="button"
                      className="btn btn-outline-danger"
                      data-bs-dismiss="modal"
                    >
                      <i className="fa-regular fa-thumbs-down me-1"></i>
                      NO
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      data-bs-dismiss="modal"
                      onClick={() => {
                        deleteCompany(companyId);
                      }}
                    >
                      <i class="fa-regular fa-thumbs-up me-1"></i>
                      YES
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade "
              id="staticBackdropc"
              data-bs-backdrop="static"
              data-bs-keyboard="false"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div
                className="modal-dialog  "
                style={{
                  width: "28rem",
                }}
              >
                <div className="modal-content">
                  <div className="row modal-header text-center  ">
                    <h3
                      className="col-11 modal-title text-secondary ps-4"
                      id="staticBackdropLabel"
                    >
                      Edit Company
                    </h3>
                    <button
                      type="button"
                      className="btn-close  mb-4 bg-secondary border-dark me-1 "
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    {" "}
                    {<CompanyUpdate id={companyId} />}
                  </div>
                </div>
              </div>
            </div>

            <div
              className="modal fade "
              id="staticBackdropu"
              data-bs-backdrop="static"
              aria-labelledby="staticBackdropLabel"
              aria-hidden="true"
            >
              <div
                class="modal-dialog   "
                style={{
                  width: "28rem",
                }}
              >
                <div className="modal-content">
                  <div className="row modal-header text-center">
                    <h3
                      className="col-11 modal-title text-secondary ps-4"
                      id="staticBackdropLabel"
                    >
                      Edit Product
                    </h3>
                    <button
                      type="button"
                      className="btn-close  mb-4 bg-secondary border-dark me-1"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    {" "}
                    {<ProductUpdate id={productId} />}
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                    { name: "Action", width: true },
                  ]}
                  body={
                    allCompanies &&
                    allCompanies.map((company, key) => [
                      <div className="ps-5">{company.id}</div>,
                      company.name,
                      company.legalNumber,
                      company.country,
                      company.website,
                      [
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdropc"
                          type="button"
                          key={`edit-${company.id}`}
                          className="btn btn-primary"
                          onClick={() => toggleCompanyModal(company.id)}
                        >
                          Edit
                        </button>,
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdropcd"
                          type="button"
                          key={`delete-${company.id}`}
                          className="btn btn-danger"
                          onClick={() => toggleCompanyModal(company.id)}
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
                    { name: "Company-Name", sortable: true },
                    { name: "Action", width: true },
                  ]}
                  body={
                    allProducts &&
                    allProducts.map((product, key) => [
                      <div className="ps-5">{product.id}</div>,
                      product.name,
                      product.category,
                      product.amount,
                      product.companyName,
                      [
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#staticBackdropu"
                          key={`edit-${product.id}`}
                          className="btn btn-primary"
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
                          className="btn btn-danger"
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
    </>
  );
}
export default HomePage;
