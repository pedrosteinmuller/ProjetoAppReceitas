import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { fetchApiRecipesDetails } from '../services/fetchApi';
import myContext from '../context/myContext';
import '../css/RecipeDetails.css';
import 'bootstrap/dist/css/bootstrap.css';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';

function RecipeDetails() {
  const { drinksData, mealsData } = useContext(myContext);
  const SIX = 6;
  const recommendationMeals = mealsData?.slice(0, SIX);
  const recommendationDrinks = drinksData?.slice(0, SIX);
  const param = useParams();
  const [mealsDetails, setMealsDetails] = useState({});
  const [favoriteButton, setFavoriteButton] = useState(false);
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
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteButton(favorite.some((item) => item.id === param.id));
    // const verifyId = Object.values(favorite).filter((e) => e.id === param.id);
    // if (favoriteButton === false) {
    //   setFavoriteButton(true);
    // } else {
    //   setFavoriteButton(false);
    // }
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

  const favoriteRecipe = () => {
    const path = pathname.includes('meals') ? 'meal' : 'drink';
    const productName = pathname
      .includes('meals') ? mealsDetails.strMeal : mealsDetails.strDrink;
    const productImage = pathname
      .includes('meals') ? mealsDetails.strMealThumb : mealsDetails.strDrinkThumb;
    const productNationality = pathname
      .includes('meals') ? mealsDetails.strArea : '';
    const objFavorite = {
      id: param.id,
      type: path,
      nationality: productNationality,
      category: mealsDetails.strCategory,
      alcoholicOrNot: mealsDetails.strAlcoholic || '',
      name: productName,
      image: productImage,
    };
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    localStorage.setItem('favoriteRecipes', JSON
      .stringify([...favorite, objFavorite]));
  };
  const btnCopy = () => {
    copy(`http://localhost:3000${pathname}`);
    setClick(true);
  };
  return (
    <div className="conteiner-recipe-details ">
      {pathname.includes('meals') ? (
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
            {ingredientList.map((ingredient, index) => (
              <li
                data-testid={ `${index}-ingredient-name-and-measure` }
                key={ index }
              >
                {`${measureList[index] || ''} ${ingredient}`}
              </li>))}
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
          <div className="carousel">
            {recommendationDrinks?.map((recipe, index) => (
              <div
                data-testid={ `${index}-recommendation-card` }
                key={ index }
                className="card"
              >
                <h6 data-testid={ `${index}-recommendation-title` }>
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
          {click && <span>Link copied!</span>}
          <br />
          {
            favoriteButton ? (
              <input
                data-testid="favorite-btn"
                type="image"
                alt="blackHeartIcon"
                onClick={ favoriteRecipe }
                src={ BlackHeartIcon }
              />
            ) : (
              <input
                data-testid="favorite-btn"
                type="image"
                alt="whiteHeartIcon"
                onClick={ favoriteRecipe }
                src={ WhiteHeartIcon }
              />
            )
          }
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
              {ingredientList.map((ingredient, index) => (
                <li
                  data-testid={ `${index}-ingredient-name-and-measure` }
                  key={ index }
                >
                  {`${measureList[index] || ''} ${ingredient}`}
                </li>))}
            </ul>
            <p data-testid="instructions">{mealsDetails.strInstructions}</p>
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
            {click && <span>Link copied!</span>}
            <br />
            {
              favoriteButton ? (
                <input
                  data-testid="favorite-btn"
                  type="image"
                  alt="BlackHeartIcon"
                  onClick={ favoriteRecipe }
                  src={ BlackHeartIcon }
                />
              ) : (
                <input
                  data-testid="favorite-btn"
                  type="image"
                  alt="whiteHeartIcon"
                  onClick={ favoriteRecipe }
                  src={ WhiteHeartIcon }
                />
              )
            }
          </div>
        )}
    </div>
  );
}

export default RecipeDetails;
