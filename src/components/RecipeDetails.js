import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchApiRecipesDetails } from '../services/fetchApi';
import myContext from '../context/myContext';
import '../css/RecipeDetails.css';
import 'bootstrap/dist/css/bootstrap.css';

function RecipeDetails() {
  const { drinksData, mealsData } = useContext(myContext);
  const SIX = 6;
  const recommendationMeals = mealsData?.slice(0, SIX);
  const recommendationDrinks = drinksData?.slice(0, SIX);
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
    <div className="conteiner-recipe-details ">
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
                 allow="accelerometer;
                 autoplay; clipboard-write;
                 encrypted-media; gyroscope;
                 picture-in-picture"
                 allowFullScreen
               />}
            {/* <CarouselDrinks /> */}
            <div className="carousel">
              {recommendationDrinks?.map((recipe, index) => (
                <div
                  data-testid={ `${index}-recommendation-card` }
                  key={ index }
                  className="card"
                >
                  <h6
                    data-testid={ `${index}-recommendation-title` }
                  >
                    {recipe.strDrink}
                  </h6>
                  <div className="image">
                    <img
                      src={ recipe.strDrinkThumb }
                      alt={ recipe.strDrink }
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              data-testid="start-recipe-btn"
              className="btnStartRecipe"
            >
              Start Recipe
            </button>
          </div>
        )
          : (
            <div>
              <img
                width="100px"
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
              {/* <CarouselMeals /> */}
              <div className="carousel">
                {recommendationMeals?.map((recipe, index) => (
                  <div
                    data-testid={ `${index}-recommendation-card` }
                    key={ index }
                  >
                    <h6 data-testid={ `${index}-recommendation-title` }>
                      {recipe.strMeal}
                    </h6>
                    <img src={ recipe.strMealThumb } alt={ recipe.strMeal } />
                  </div>
                ))}
              </div>
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="btnStartRecipe"
              >
                Start Recipe
              </button>
            </div>
          )
      }
    </div>
  );
}

export default RecipeDetails;
