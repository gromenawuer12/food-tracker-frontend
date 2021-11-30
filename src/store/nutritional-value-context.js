import React, { useState } from "react";
import { GET, POST, DELETE } from "../fetch/fetch";

const NutritionalValueContext = React.createContext({
  nutritionalValue: [],
  getNutritionalValue: async (url) => {},
  addNutritionalValue: async (url, body) => {},
  deleteNutritionalValue: async (url, body) => {},
  error: "",
});

export const NutritionalValueContextProvider = (props) => {
  const [nutritionalValue, setNutritionalValue] = useState(null);
  const [error, setError] = useState(null);

  const getNutritionalValueHandler = async (url) => {
    try {
      const response = await GET(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setNutritionalValue(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const addNutritionalValueHandler = async (url, body) => {
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

  const deleteNutritionalValueHandler = async (url, body) => {
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
    nutritionalValue: nutritionalValue,
    getNutritionalValue: getNutritionalValueHandler,
    addNutritionalValue: addNutritionalValueHandler,
    deleteNutritionalValue: deleteNutritionalValueHandler,
    error: error,
  };

  return (
    <NutritionalValueContext.Provider value={contextValue}>
      {props.children}
    </NutritionalValueContext.Provider>
  );
};

export default NutritionalValueContext;
