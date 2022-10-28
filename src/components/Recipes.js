import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import myContext from '../context/myContext';

function Recipes({ verify }) {
  const { drinksData, mealsData,
    categoryFilterDrink, categoryFilterMeals, searchByCategory, removeFilters,
  } = useContext(myContext);
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
              <button
                type="button"
                data-testid="All-category-filter"
                onClick={ removeFilters }
              >
                All
              </button>
              {
                mealsList?.map((meal, index) => (
                  <div key={ index }>
                    <button
                      data-testid={ `${meal.strCategory}-category-filter` }
                      type="button"
                      onClick={ () => searchByCategory(meal.strCategory) }
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
                    <Link to={ `/meals/${meal.idMeal}` }>
                      <h1 data-testid={ `${index}-card-name` }>{ meal.strMeal }</h1>
                      <img
                        data-testid={ `${index}-card-img` }
                        src={ meal.strMealThumb }
                        alt={ meal.strMeal }
                      />
                    </Link>
                  </div>
                ))
            }
          </div>
        ) : (
          <div>
            <div>
              <button
                type="button"
                data-testid="All-category-filter"
                onClick={ removeFilters }
              >
                All
              </button>
              {
                drinksList?.map((drink, index) => (
                  <div key={ index }>
                    <button
                      data-testid={ `${drink.strCategory}-category-filter` }
                      type="button"
                      onClick={ () => searchByCategory(drink.strCategory) }

                    >
                      {drink.strCategory}
                    </button>
                  </div>
                )).splice(0, five)
              }
            </div>
            {drinksData?.map((drink, index) => index < MAX_LENGTH && (
              <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
                <Link to={ `/drinks/${drink.idDrink}` }>
                  <h1 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h1>
                  <img
                    data-testid={ `${index}-card-img` }
                    src={ drink.strDrinkThumb }
                    alt={ drink.strDrink }
                  />
                </Link>
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
