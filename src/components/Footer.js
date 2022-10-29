import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../css/Footerr.css';

export default function Footer() {
  const history = useHistory();
  return (
    <footer data-testid="footer">
      <div className="footer-container">
        <button type="button" onClick={ () => history.push('/drinks') }>
          <img
            data-testid="drinks-bottom-btn"
            src={ drinkIcon }
            alt="drinkIcon"
            className="branco"
          />
        </button>
        <button type="button" onClick={ () => history.push('/meals') }>
          <img
            data-testid="meals-bottom-btn"
            src={ mealIcon }
            alt="mealIcon"
            className="branco"
          />
        </button>
      </div>
    </footer>
  );
}
