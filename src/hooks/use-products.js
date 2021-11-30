import { useState, useEffect } from "react";
import { GET, POST, DELETE } from "../fetch/fetch";

const URL = "products/";

const error = () => {
  console.error("Something went wrong!");
};

const useProducts = (isUpdated) => {
  const [products, setProducts] = useState([]);

  const processProducts = (response) => {
    return response.json();
  };

  const fetchProducts = () => {
    GET(URL).then(processProducts, error).then(setProducts).catch(error);
  };

  useEffect(() => {
    fetchProducts();
  }, [isUpdated]);

  return products;
};

const deleteProduct = async (body) => {
  return DELETE(URL, body).catch(error);
};

const addProduct = async (product) => {
  return POST(URL, product).catch(error);
};

export { useProducts, deleteProduct, addProduct };
