import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
// import Recipes from '../components/Recipes';
import myContext from '../context/myContext';

function Meals() {
  const { data } = useContext(myContext);
  return (
    <div>
      <Header verifyPage={ false } />
      {/* <Recipes /> */}
      <h1 data-testid="page-title">Meals</h1>
      {
        data?.map((meal, index) => (
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
      <Footer />
    </div>
  );
}

export default Meals;
