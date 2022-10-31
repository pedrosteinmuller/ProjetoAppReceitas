import React, { useContext } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import myContext from '../context/myContext';
import 'bootstrap/dist/css/bootstrap.css';

function CarouselDrinks() {
  const { drinksData } = useContext(myContext);
  const SIX = 6;
  const recommendationDrinks = drinksData?.slice(0, SIX);
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <div data-testid="0-recommendation-card">
            <h6 data-testid="0-recommendation-title">
              {recommendationDrinks[0]?.strDrink}
            </h6>
            <img
              src={ recommendationDrinks[0]?.strDrinkThumb }
              alt={ recommendationDrinks }
            />
          </div>
          <div data-testid="1-recommendation-card">
            <h6 data-testid="1-recommendation-title">
              {recommendationDrinks[1]?.strDrink}
            </h6>
            <img
              src={ recommendationDrinks[1]?.strDrinkThumb }
              alt={ recommendationDrinks }
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div data-testid="2-recommendation-card">
            <h6 data-testid="2-recommendation-title">
              {recommendationDrinks[2]?.strDrink}
            </h6>
            <img
              src={ recommendationDrinks[2]?.strDrinkThumb }
              alt={ recommendationDrinks }
            />
          </div>
          <div data-testid="3-recommendation-card">
            <h6 data-testid="3-recommendation-title">
              {recommendationDrinks[3]?.strDrink}
            </h6>
            <img
              src={ recommendationDrinks[3]?.strDrinkThumb }
              alt={ recommendationDrinks }
            />
          </div>
        </Carousel.Item>
        <Carousel.Item>
          <div data-testid="4-recommendation-card">
            <h6 data-testid="4-recommendation-title">
              {recommendationDrinks[4]?.strDrink}
            </h6>
            <img
              src={ recommendationDrinks[4]?.strDrinkThumb }
              alt={ recommendationDrinks }
            />
          </div>
          <div data-testid="5-recommendation-card">
            <h6 data-testid="5-recommendation-title">
              {recommendationDrinks[5]?.strDrink}
            </h6>
            <img
              src={ recommendationDrinks[5]?.strDrinkThumb }
              alt={ recommendationDrinks }
            />
          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselDrinks;
