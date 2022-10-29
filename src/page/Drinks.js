import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Recipes from '../components/Recipes';
import myContext from '../context/myContext';
import CardRecipes from '../components/CardRecipes';
import '../css/Drinks.css';

function Drinks() {
  const { data, verifyRender } = useContext(myContext);
  const MAX_LENGTH = 12;
  return (
    <div>
      <Header verifyPage={ false } />
      <div className="drinkstitle">
        <h1 data-testid="page-title">Drinks</h1>
      </div>
      {
        data?.slice(0, MAX_LENGTH).map((drink, index) => (
          <CardRecipes
            index={ index }
            key={ drink.idDrink }
            tag={ drink.strDrink }
            img={ drink.strDrinkThumb }
          />
        ))
      }
      {
        !verifyRender && <Recipes verify={ false } />
      }
      <Footer />
    </div>
  );
}

export default Drinks;
