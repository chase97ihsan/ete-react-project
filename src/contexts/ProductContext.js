import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const ProductContext = createContext();
function ProductContextProvider({ children }) {
  const { token, email, storedData, parsedData } = useContext(AuthContext);
  const [allProducts, setAllProducts] = useState([]);

  const navigate = useNavigate();
  if (!parsedData) {
    navigate("/");
  }

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3000/product/${id}`)
      .then((res) => {
        console.log(res.data);
        getProducts();
        toast.success("Deleted successfully!", {
          position: "top-left",
        });
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
        toast.success("Edited successfully!", {
          position: "top-left",
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProducts = () => {
    axios
      .get("http://localhost:3000/products/")
      .then((res) => {
        setAllProducts(res.data);
      })
      .catch((err) => {
        console.log("Unauthorized" + ":" + err);
        navigate("/logIn");
      });
  };

  const createProduct = (product) => {
    axios
      .post(`http://localhost:3000/product/create`, product)
      .then((res) => {
        getProducts();
        toast.success("Added successfully!", {
          position: "top-left",
        });
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
