import { useState, useEffect } from "react";
import { GET, POST, DELETE } from "../fetch/fetch";

const URL = "units/";

const error = () => {
  console.error("Something went wrong!");
};

const useUnits = (isUpdated) => {
  const [units, setUnits] = useState([]);

  const processUnits = (response) => {
    return response.json();
  };

  const fetchUnits = () => {
    GET(URL).then(processUnits, error).then(setUnits).catch(error);
  };

  useEffect(() => {
    fetchUnits();
  }, [isUpdated]);

  return units;
};

const deleteUnit = async (body) => {
  return DELETE(URL, body).catch(error);
};

const addUnit = async (unit) => {
  return POST(URL, unit).catch(error);
};

export { useUnits, deleteUnit, addUnit };
