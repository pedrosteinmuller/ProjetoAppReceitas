import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { fetchApiRecipesDetails } from '../services/fetchApi';
import myContext from '../context/myContext';
import '../css/RecipeDetails.css';
import 'bootstrap/dist/css/bootstrap.css';

function RecipeDetails() {
  const { drinksData, mealsData } = useContext(myContext);
  // const [favorite, setFavotire] = useState([]);
  const SIX = 6;
  const recommendationMeals = mealsData?.slice(0, SIX);
  const recommendationDrinks = drinksData?.slice(0, SIX);
  const param = useParams();
  const [mealsDetails, setMealsDetails] = useState({});
  const [click, setClick] = useState(false);
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => {
    const fetchApiDetails = async () => {
      const path = pathname.includes('meals') ? 'themealdb' : 'thecocktaildb';
      const URL = await fetchApiRecipesDetails(param.id, path);
      setMealsDetails(URL[0]);
    };
    fetchApiDetails();
  }, []);
  console.log(mealsDetails);
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

  const nationality = mealsData.strArea;
  // const nationalityDrink = drinksData.strArea;

  const favoriteMeal = () => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorite) {
      const objFavorite = [...favorite, {
        id: param.id,
        type: 'meal',
        nationality: nationality || '',
        categoty: mealsDetails.strCategory || '',
        alcoholicOrNot: mealsDetails.strAlcoholic || '',
        name: mealsDetails.strMeal,
        image: mealsDetails.strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(objFavorite) || []);
    } else {
      console.log(mealsData);
      const objFavorite = [{
        id: param.id,
        type: 'meal',
        nationality: nationality || '',
        categoty: mealsDetails.strCategory || '',
        alcoholicOrNot: mealsDetails.strAlcoholic || '',
        name: mealsDetails.strMeal,
        image: mealsDetails.strMealThumb,
      }];
      console.log();
      localStorage.setItem('favoriteRecipes', JSON.stringify(objFavorite) || []);
    }
  };

  const btnCopy = () => {
    copy(`http://localhost:3000${pathname}`);
    setClick(true);
  };

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
              onClick={ () => history.push(`/meals/${param.id}/in-progress`) }
            >
              Start Recipe
            </button>
            <button
              className="btnShare"
              data-testid="share-btn"
              type="button"
              onClick={ btnCopy }
            >
              share

            </button>
            {
              click && <span>Link copied!</span>
            }
            <br />
            <button
              className="btnShare"
              data-testid="favorite-btn"
              type="button"
              onClick={ favoriteDrink }
            >
              favorito
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
              <p data-testid="favorecipe-category">{mealsDetails.strAlcoholic}</p>

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
                onClick={ () => history.push(`/drinks/${param.id}/in-progress`) }
              >
                Start Recipe
              </button>
              <button
                className="btnShare"
                data-testid="share-btn"
                type="button"
                onClick={ btnCopy }
              >
                share

              </button>
              {
                click && <span>Link copied!</span>
              }
              <br />
              <button
                className="btnShare"
                data-testid="favorite-btn"
                type="button"
                onClick={ favoriteMeal }
              >
                favorite
              </button>
            </div>
          )
      }
    </div>
  );
}

export default RecipeDetails;
