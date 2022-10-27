import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import myContext from '../context/myContext';

function Recipes({ verify }) {
  const { drinksData, mealsData } = useContext(myContext);

  const MAX_LENGTH = 12;

  return (
    <div>
      {
        verify ? (
          <div>
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
          drinksData?.map((drink, index) => index < MAX_LENGTH && (
            <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
              <img
                data-testid={ `${index}-card-img` }
                src={ drink.strDrinkThumb }
                alt={ drink.strDrink }
              />
              <h1 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h1>
            </div>
          ))
        )
      }
    </div>
  );
}

Recipes.propTypes = { verify: PropTypes.bool.isRequired };

export default Recipes;
