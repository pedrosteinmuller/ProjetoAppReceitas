import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import myContext from '../context/myContext';
import 'bootstrap/dist/css/bootstrap.css';

function CarouselMeals() {
  const { mealsData } = useContext(myContext);
  const SIX = 6;
  const recommendationMeals = mealsData?.slice(0, SIX);
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <div className="cardCarousel" data-testid="0-recommendation-card">
            <h6 data-testid="0-recommendation-title">
              {recommendationMeals[0]?.strMeal}
            </h6>
            <img
              src={ recommendationMeals[0]?.strMealThumb }
              alt={ recommendationMeals }
            />
          </div>
          <div className="cardCarousel" data-testid="1-recommendation-card">
            <h6 data-testid="1-recommendation-title">
              {recommendationMeals[1]?.strMeal}
            </h6>
            <img
              src={ recommendationMeals[1]?.strMealThumb }
              alt={ recommendationMeals }
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="cardCarousel" data-testid="2-recommendation-card">
            <h6 data-testid="2-recommendation-title">
              {recommendationMeals[2]?.strMeal}
            </h6>
            <img
              src={ recommendationMeals[2]?.strMealThumb }
              alt={ recommendationMeals }
            />
          </div>
          <div className="cardCarousel" data-testid="3-recommendation-card">
            <h6 data-testid="3-recommendation-title">
              {recommendationMeals[3]?.strMeal}
            </h6>
            <img
              src={ recommendationMeals[3]?.strMealThumb }
              alt={ recommendationMeals }
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div className="cardCarousel" data-testid="4-recommendation-card">
            <h6 data-testid="4-recommendation-title">
              {recommendationMeals[4]?.strMeal}
            </h6>
            <img
              src={ recommendationMeals[4]?.strMealThumb }
              alt={ recommendationMeals }
            />
          </div>
          <div className="cardCarousel" data-testid="5-recommendation-card">
            <h6 data-testid="5-recommendation-title">
              {recommendationMeals[5]?.strMeal}
            </h6>
            <img
              src={ recommendationMeals[5]?.strMealThumb }
              alt={ recommendationMeals }
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselMeals;
