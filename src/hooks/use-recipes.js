import { useState, useEffect } from "react";
import { GET, POST, DELETE } from "../fetch/fetch";

const URL = "recipes/";

const error = () => {
  console.error("Something went wrong!");
};

const useRecipes = (isUpdated) => {
  const [recipes, setRecipes] = useState([]);

  const processRecipes = (response) => {
    return response.json();
  };

  const fetchRecipes = () => {
    GET(URL).then(processRecipes, error).then(setRecipes).catch(error);
  };

  useEffect(() => {
    fetchRecipes();
  }, [isUpdated]);

  return recipes;
};

const deleteRecipe = async (body) => {
  return DELETE(URL, body).catch(error);
};

const addRecipe = async (recipe) => {
  return POST(URL, recipe).catch(error);
};

export { useRecipes, deleteRecipe, addRecipe };
