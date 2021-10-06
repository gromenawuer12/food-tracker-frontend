import React, { useState } from "react";
import { GET, POST, DELETE } from "../fetch/fetch";

const ProductContext = React.createContext({
  products: [],
  getProducts: async (url) => {},
  addProduct: async (url, body) => {},
  deleteProduct: async (url, body) => {},
  error: "",
});

export const ProductContextProvider = (props) => {
  const [products, setProducts] = useState(null);
  const [error, setError] = useState(null);

  const getProductsHandler = async (url) => {
    try {
      const response = await GET(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const addProductHandler = async (url, body) => {
    try {
      const response = await POST(url, body);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteProductHandler = async (url, body) => {
    try {
      const response = await DELETE(url, body);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      return response;
    } catch (error) {
      setError(error.message);
    }
  };

  const contextValue = {
    products: products,
    getProducts: getProductsHandler,
    addProduct: addProductHandler,
    deleteProduct: deleteProductHandler,
    error: error,
  };

  return (
    <ProductContext.Provider value={contextValue}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
