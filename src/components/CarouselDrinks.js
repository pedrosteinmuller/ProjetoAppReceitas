import React, { useContext } from 'react';
import myContext from '../context/myContext';

export default function CarouselDrinks() {
  const SIX = 6;
  const { drinksData } = useContext(myContext);
  const recommendationDrinks = drinksData?.slice(0, SIX);
  return (
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
  );
}
