import { useContext, useEffect, useState } from "react";
import { CompanyContext } from "../contexts/CompanyContext";

import { ProductContext } from "../contexts/ProductContext";

export default function MainPage() {
  const { allCompanies, getCompanies } = useContext(CompanyContext);
  const { allProducts, getProducts } = useContext(ProductContext);
  const cLast = allCompanies.length - 1;
  const pLast = allProducts.length - 1;
  const c2 = allCompanies.length - 2;
  const p2 = allProducts.length - 2;
  const c3 = allCompanies.length - 3;
  const p3 = allProducts.length - 3;
  const c4 = allCompanies.length - 4;
  const p4 = allProducts.length - 4;

  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    setLoading(true);
    try {
      await getCompanies();
      await getProducts();
      setLoading(false);
    } catch (error) {
      console.error("Veriler yüklenirken hata oluştu:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  if (
    !allCompanies ||
    allCompanies.length === 0 ||
    allCompanies == {} ||
    !allProducts ||
    allProducts.length === 0 ||
    allProducts == {}
  ) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main">
      <h1 style={{ fontSize: "40px" }}>Lastly Uploaded</h1>
      <section className="main-section">
        <div className="main-box">
          <h3>Companies</h3>
          <ul>
            <li>{allCompanies[cLast].name}</li>
            <li>{allCompanies[c2].name}</li>
            <li>{allCompanies[c3].name}</li>
            <li>{allCompanies[c4].name}</li>
          </ul>
        </div>
        <div className="main-box">
          <h3>Products</h3>
          <ul>
            <li>{allProducts[cLast].name}</li>
            <li>{allProducts[c2].name}</li>
            <li>{allProducts[c3].name}</li>
            <li>{allProducts[c4].name}</li>
          </ul>
        </div>
      </section>
    </div>
  );
}
