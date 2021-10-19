import { useState, useEffect } from "react";
import { GET, POST, DELETE } from "../fetch/fetch";

const URL = "nutritional_value/";

const error = () => {
  console.error("Something went wrong!");
};

const useNutritionalValue = (isUpdated) => {
  const [nutritionalValue, setNutritionalValue] = useState([]);

  const processNutritionalValue = (response) => {
    return response.json();
  };

  const fetchNutritionalValue = () => {
    GET(URL)
      .then(processNutritionalValue, error)
      .then(setNutritionalValue)
      .catch(error);
  };

  useEffect(() => {
    fetchNutritionalValue();
  }, [isUpdated]);

  return nutritionalValue;
};

const deleteNutritionalValue = async (body) => {
  return DELETE(URL, body).catch(error);
};

const addNutritionalValue = async (unit) => {
  return POST(URL, unit).catch(error);
};

export { useNutritionalValue, deleteNutritionalValue, addNutritionalValue };
