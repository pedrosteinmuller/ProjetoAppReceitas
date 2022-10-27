import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import myContext from '../context/myContext';

function Recipes({ verify }) {
  const { drinksData, mealsData,
    categoryFilterDrink, categoryFilterMeals } = useContext(myContext);
  const MAX_LENGTH = 12;
  const five = 5;
  const mealsList = categoryFilterMeals.meals;
  const drinksList = categoryFilterDrink.drinks;
  return (
    <div>
      {
        verify ? (
          <div>
            <div>
              {
                mealsList?.map((meal, index) => (
                  <div key={ index }>
                    <button
                      data-testid={ `${meal.strCategory}-category-filter` }
                      type="button"
                    >
                      {meal.strCategory}
                    </button>
                  </div>
                )).splice(0, five)
              }
            </div>
            {
              mealsData
                ?.map((meal, index) => index < MAX_LENGTH && (
                  <div data-testid={ `${index}-recipe-card` } key={ meal.idMeal }>
                    <img
                      data-testid={ `${index}-card-img` }
                      src={ meal.strMealThumb }
                      alt={ meal.strMeal }
                    />
                    <h1 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h1>
                  </div>
                ))
            }

          </div>
        ) : (
          <div>
            <div>
              {
                drinksList?.map((drink, index) => (
                  <div key={ index }>
                    <button
                      data-testid={ `${drink.strCategory}-category-filter` }
                      type="button"
                    >
                      {drink.strCategory}
                    </button>
                  </div>
                )).splice(0, five)
              }
            </div>
            {drinksData?.map((drink, index) => index < MAX_LENGTH && (
              <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
                <img
                  data-testid={ `${index}-card-img` }
                  src={ drink.strDrinkThumb }
                  alt={ drink.strDrink }
                />
                <h1 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h1>
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}

Recipes.propTypes = { verify: PropTypes.bool.isRequired };

export default Recipes;
