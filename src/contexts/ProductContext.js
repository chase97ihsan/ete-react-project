import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ProductContext = createContext();
function ProductContextProvider({ children }) {
  const { token, email, storedData, parsedData } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();
  if (!parsedData) {
    navigate("/");
  }

  const deleteProduct = (id) => {
    console.log(id);
    axios
      .delete(`http://localhost:3000/product/${id}`)
      .then((res) => {
        console.log(res.data);
        getProducts();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProduct = (product) => {
    const id = product.id;
    axios
      .put(`http://localhost:3000/product/${id}`, product)
      .then((res) => {
        getProducts();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProducts = () => {
    axios
      .get("http://localhost:3000/products/")
      .then((res) => {
        if (res.data.length !== 0) {
          setAllProducts(res.data);
          console.log(res.data);
        } else if (res.data.length === 0) {
          console.log("There is no any product to show");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const createProduct = (product) => {
    axios
      .post(`http://localhost:3000/product/create`, product)
      .then((res) => {
        getProducts();
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        getProducts,
        updateProduct,
        deleteProduct,
        allProducts,
        createProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
export default ProductContextProvider;
