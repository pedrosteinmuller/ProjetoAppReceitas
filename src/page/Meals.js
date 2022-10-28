import React, { useContext } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Recipes from '../components/Recipes';
import myContext from '../context/myContext';
import CardRecipes from '../components/CardRecipes';
// import RecipeDetails from '../components/RecipeDetails';

function Meals() {
  const { data, verifyRender } = useContext(myContext);
  const MAX_LENGTH = 12;
  return (
    <div>
      <Header verifyPage={ false } />
      <h1 data-testid="page-title">Meals</h1>
      {
        data?.map((meal, index) => index < MAX_LENGTH && (
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
