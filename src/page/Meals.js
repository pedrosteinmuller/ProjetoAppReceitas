import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import myContext from '../context/myContext';
import CardRecipes from '../components/CardRecipes';
import '../css/Meals.css';

function Meals() {
  const { data, verifyRender } = useContext(myContext);
  const MAX_LENGTH = 12;
  return (
    <div>
      <Header verifyPage={ false } />
      <div className="mealstitle">
        <h1 data-testid="page-title">Meals</h1>
      </div>
      {
        data?.slice(0, MAX_LENGTH).map((meal, index) => (
          <CardRecipes
            index={ index }
            recipes="meals"
            id={ meal.idMeal }
            key={ meal.idMeal }
            tag={ meal.strMeal }
            img={ meal.strMealThumb }
          />
        ))
      }
      {
        !verifyRender && <Recipes verify />
      }
      <Footer />
    </div>
  );
}

export default Meals;
