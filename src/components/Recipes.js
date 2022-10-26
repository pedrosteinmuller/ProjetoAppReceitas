import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';

import { apiRecipes } from '../services/fetchApi';

function Recipes({ verify }) {
  const { pathname } = useLocation();
  const MAX_LENGTH = 11;

  const [data, setdata] = useState([]);

  useEffect(() => {
    const requestApi = async () => {
      const path = pathname.includes('meals') ? 'themealdb' : 'thecocktaildb';
      const response = await apiRecipes(path);
      setdata(response);
    };
    requestApi();
  }, [pathname]);

  return (
    <div>
      {
        verify ? (
          <div>
            {
              data?.map((meal, index) => index <= MAX_LENGTH && (
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
          data?.map((drink, index) => index <= MAX_LENGTH && (
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
