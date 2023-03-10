import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchApiRecipesDetails } from '../services/fetchApi';
import RecipeComponent from './RecipeComponent';

function RecipeInProgress() {
  const [recipeInProgress, setRecipeInProgress] = useState([]);

  const param = useParams();
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchApiDetails = async () => {
      const path = pathname.includes('meals') ? 'themealdb' : 'thecocktaildb';
      const URL = await fetchApiRecipesDetails(param.id, path);
      setRecipeInProgress(URL[0]);
    };
    fetchApiDetails();
  }, [param.id, pathname]);
  return (
    <RecipeComponent recipeInProgress={ recipeInProgress } />
  );
}

export default RecipeInProgress;
