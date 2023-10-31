import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";

export const ProductContext = createContext();
function ProductContextProvider({ children }) {
  const { token, email } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState([]);

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:9000/product/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProduct = (product) => {
    // console.log(product);
    axios
      .put(`http://localhost:9000/product/update`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        getProducts();
        //console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProducts = () => {
    console.log("gelmisş");
    axios
      .get("http://localhost:9000/product/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res.data.length !== 0) {
          setAllProducts(res.data.slice().reverse());
          console.log(res.data);
          console.log("oldumuki");
        } else if (res.data.length !== 0) {
          console.log("There is no any product to show");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <ProductContext.Provider
      value={{
        getProducts,
        updateProduct,
        deleteProduct,
        allProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
export default ProductContextProvider;
