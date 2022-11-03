import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useParams } from 'react-router-dom';
import copy from 'clipboard-copy';
import WhiteHeartIcon from '../images/whiteHeartIcon.svg';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import lsInProgressRecipes from '../services/recipesLocalStorage';

function RecipeComponent({ recipeInProgress }) {
  const { pathname } = useLocation();
  const param = useParams();
  const [favoriteButton, setFavoriteButton] = useState(false);
  const [click, setClick] = useState(false);
  // const [checked, setChecked] = useState(true);

  const ingredientList = Object.entries(recipeInProgress)
    .filter((item) => item[0].includes('strIngredient') && item[1] !== '')
    .filter((item) => item[1] !== null)
    .filter((item) => item[1] !== undefined)
    .map((ingredient) => ingredient[1]);
  const measureList = Object.entries(recipeInProgress)
    .filter((item) => item[0].includes('strMeasure'))
    .filter((item) => item[1] !== ' ')
    .filter((item) => item[1] !== null)
    .filter((item) => item[1] !== undefined)
    .map((measure) => measure[1]);

  const markCheckbox = (e) => {
    const label = document.querySelectorAll('label[class=label]')[e];
    if (label.style.textDecoration !== '') {
      label.style.textDecoration = '';
      return;
    }
    label.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
  };

  useEffect(() => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes')) || [];
    setFavoriteButton(favorite.some((item) => item.id === param.id));
  }, []);

  const btnCopy = () => {
    const path = pathname.includes('meals') ? 'meals' : 'drinks';
    copy(`http://localhost:3000/${path}/${param.id}`);
    setClick(true);
  };

  const favoriteRecipe = () => {
    const path = pathname.includes('meals') ? 'meal' : 'drink';
    const productName = pathname
      .includes('meals') ? recipeInProgress.strMeal : recipeInProgress.strDrink;
    const productImage = pathname
      .includes('meals') ? recipeInProgress.strMealThumb : recipeInProgress.strDrinkThumb;
    const productNationality = pathname
      .includes('meals') ? recipeInProgress.strArea : '';
    const objFavorite = {
      id: param.id,
      type: path,
      nationality: productNationality,
      category: recipeInProgress.strCategory,
      alcoholicOrNot: recipeInProgress.strAlcoholic || '',
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

  const getLsInfo = lsInProgressRecipes();

  if (!Object.keys(getLsInfo.meals).includes(param.id)) {
    getLsInfo.meals[param.id] = [];
  }

  return (
    <>
      <h1>Meal In progress</h1>
      <p data-testid="recipe-title">
        {recipeInProgress.strMeal || recipeInProgress.strDrink}
      </p>
      <img
        width="100px"
        data-testid="recipe-photo"
        src={ recipeInProgress.strMealThumb || recipeInProgress.strDrinkThumb }
        alt={ recipeInProgress.strMeal || recipeInProgress.strDrink }
      />
      <button
        className="btnShare"
        data-testid="share-btn"
        type="button"
        onClick={ btnCopy }
      >
        share
      </button>
      {click && <span>Link copied!</span>}

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
      <button
        type="button"
        data-testid="finish-recipe-btn"
        // disabled={ isDisabled }
      >
        finish
      </button>
      <p data-testid="recipe-category">
        {recipeInProgress.strCategory}
      </p>
      <p data-testid="instructions">
        {recipeInProgress.strInstructions}
      </p>
      {
        ingredientList?.map(
          (ingredient, index) => (
            <div key={ index }>
              <label
                htmlFor={ ingredient }
                data-testid={ `${index}-ingredient-step` }
                className="label"
              >
                {`${measureList[index] || ''} ${ingredient}`}
                <input
                  type="checkbox"
                  value={ ingredient }
                  // disabled={  }
                  onChange={ () => markCheckbox(index) }
                />
              </label>
            </div>
          ),
        )
      }
    </>
  );
}

RecipeComponent.propTypes = {
  recipeInProgress: PropTypes.arrayOf(),
}.isRequired;

export default RecipeComponent;
