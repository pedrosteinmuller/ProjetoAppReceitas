import React, { useContext } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import myContext from '../context/myContext';

function Drinks() {
  const { data } = useContext(myContext);
  const MAX_LENGTH = 12;
  return (
    <div>
      <Header verifyPage={ false } />
      <h1 data-testid="page-title">Drinks</h1>
      {
        data?.map((drink, index) => index < MAX_LENGTH && (
          <div data-testid={ `${index}-recipe-card` } key={ drink.idDrink }>
            <img
              data-testid={ `${index}-card-img` }
              src={ drink.strDrinkThumb }
              alt={ drink.strDrink }
            />
            <h1 data-testid={ `${index}-card-name` }>{ drink.strDrink }</h1>
          </div>
        ))
      }
      <Footer />
    </div>
  );
}

export default Drinks;
