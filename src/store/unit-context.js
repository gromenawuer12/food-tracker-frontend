import React, { useState } from "react";
import { GET, POST, DELETE } from "../fetch/fetch";

const UnitContext = React.createContext({
  units: [],
  getUnits: async (url) => {},
  addUnit: async (url, body) => {},
  deleteUnit: async (url, body) => {},
  error: "",
});

export const UnitContextProvider = (props) => {
  const [units, setUnits] = useState(null);
  const [error, setError] = useState(null);

  const getUnitsHandler = async (url) => {
    try {
      const response = await GET(url);
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setUnits(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const addUnitHandler = async (url, body) => {
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

  const deleteUnitHandler = async (url, body) => {
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
    units: units,
    getUnits: getUnitsHandler,
    addUnit: addUnitHandler,
    deleteUnit: deleteUnitHandler,
    error: error,
  };

  return (
    <UnitContext.Provider value={contextValue}>
      {props.children}
    </UnitContext.Provider>
  );
};

export default UnitContext;
