import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchApiRecipesDetails } from '../services/fetchApi';
import '../css/RecipeDetails.css';
import 'bootstrap/dist/css/bootstrap.css';

export default function IngredientList() {
  const param = useParams();
  const [mealsDetails, setMealsDetails] = useState({});
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchApiDetails = async () => {
      const path = pathname.includes('meals') ? 'themealdb' : 'thecocktaildb';
      const URL = await fetchApiRecipesDetails(param.id, path);
      setMealsDetails(URL[0]);
    };
    fetchApiDetails();
  }, []);
  const ingredientList = Object.entries(mealsDetails)
    .filter((item) => item[0].includes('strIngredient') && item[1] !== '')
    .filter((item) => item[1] !== null)
    .map((ingredient) => ingredient[1]);
  const measureList = Object.entries(mealsDetails)
    .filter((item) => item[0].includes('strMeasure'))
    .filter((item) => item[1] !== ' ')
    .filter((item) => item[1] !== null)
    .filter((item) => item[1] !== undefined)
    .map((measure) => measure[1]);

  return (
    <ul>
      {ingredientList.map((ingredient, index) => (
        <li
          data-testid={ `${index}-ingredient-name-and-measure` }
          key={ index }
        >
          {`${measureList[index] || ''} ${ingredient}`}
        </li>))}
    </ul>

  );
}
