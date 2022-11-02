import React, { useState, useEffect } from 'react';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import { fetchApiRecipesDetails } from '../services/fetchApi';
import '../css/RecipeDetails.css';
import 'bootstrap/dist/css/bootstrap.css';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import CarouselMeals from './CarouselMeals';
import CarouselDrinks from './CarouselDrinks';
import IngredientList from './IngredientList';

function RecipeDetails() {
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
  }, []);

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
    if (favoriteButton === false) {
      setFavoriteButton(true);
    } else {
      setFavoriteButton(false);
    }
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
          <IngredientList />
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
          <CarouselDrinks />
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
            <IngredientList />
            <p data-testid="instructions">{mealsDetails.strInstructions}</p>
            <CarouselMeals />
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
