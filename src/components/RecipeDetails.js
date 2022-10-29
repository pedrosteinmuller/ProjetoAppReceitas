import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchApiRecipesDetails } from '../services/fetchApi';

function RecipeDetails() {
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
    <div>
      {
        pathname.includes('meals') ? (
          <div>
            <img
              width="100px"
              data-testid="recipe-photo"
              src={ mealsDetails.strMealThumb }
              alt={ mealsDetails.strMeal }
            />

            <h2 data-testid="recipe-title">{mealsDetails.strMeal}</h2>
            <h3 data-testid="recipe-category">{mealsDetails.strCategory}</h3>
            <ul>
              {
                ingredientList
                  .map((ingredient, index) => (
                    <li
                      data-testid={ `${index}-ingredient-name-and-measure` }
                      key={ index }
                    >
                      {`${measureList[index] || ''} ${ingredient}`}

                    </li>))
              }
            </ul>
            <p data-testid="instructions">{mealsDetails.strInstructions}</p>
            { pathname.includes('meals')
        && <iframe
          width="560"
          height="315"
          src={ mealsDetails.strYoutube?.replace('watch?v=', 'embed/') }
          title="YouTube video player"
          data-testid="video"
          frameBorder="0"
          allow="
        accelerometer;
        autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />}
          </div>
        )
          : (
            <div>
              <img
                src={ mealsDetails.strDrinkThumb }
                alt={ mealsDetails.strDrink }
                data-testid="recipe-photo"
              />

              <h2 data-testid="recipe-title">{mealsDetails.strDrink}</h2>
              <p data-testid="recipe-category">{mealsDetails.strAlcoholic}</p>

              <ul>
                {
                  ingredientList
                    .map((ingredient, index) => (
                      <li
                        data-testid={ `${index}-ingredient-name-and-measure` }
                        key={ index }
                      >
                        {`${measureList[index] || ''} ${ingredient}`}

                      </li>))
                }
              </ul>

              <p data-testid="instructions">{mealsDetails.strInstructions}</p>
            </div>
          )
      }
    </div>
  );
}

export default RecipeDetails;
