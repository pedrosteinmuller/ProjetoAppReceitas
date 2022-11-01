import React, { useContext } from 'react';
import myContext from '../context/myContext';

export default function CarouselMeals() {
  const SIX = 6;
  const { mealsData } = useContext(myContext);
  const recommendationMeals = mealsData?.slice(0, SIX);
  return (
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
  );
}
