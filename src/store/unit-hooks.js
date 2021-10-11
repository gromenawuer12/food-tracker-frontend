import { useState, useEffect } from 'react';
import { GETv2, POST, DELETE, DELETEv2 } from "../fetch/fetch";

const URL = "units/";

const error = () => {
  console.error("Something went wrong!")
};

const useUnits = (isUpdated) => {
  const [units, setUnits] = useState([]);

  const processUnits = (response) => {
    return response.json();
  };

  const fetchUnits = () => {
      GETv2(URL)
      .then(processUnits, error)
      .then(setUnits)
      .catch(error);
  };

  useEffect(() => {
    fetchUnits();
  }, [isUpdated]);

  return units;
};

const deleteUnit = (body) => {
  return DELETEv2(URL, body).catch(error);
};

export {useUnits, deleteUnit};