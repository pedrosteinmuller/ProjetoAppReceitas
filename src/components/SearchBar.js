import React, { useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { fetchApiIngredients, fetchFirstLetter, fetchName } from '../services/fetchApi';
import myContext from '../context/myContext';

function SearchBar() {
  const [radio, setRadio] = useState('');
  const { pathname } = useLocation();
  const history = useHistory();

  const { search, setSearch } = useContext(myContext);

  const handleFilterResults = async () => {
    const path = pathname.includes('meals') ? 'themealdb' : 'thecocktaildb';
    const verifyId = pathname.includes('meals') ? 'idMeal' : 'idDrink';
    let data = '';
    switch (radio) {
    case 'ingredient':
      data = await fetchApiIngredients(search, path);
      setSearch('');
      break;
    case 'name':
      data = await fetchName(search, path);
      setSearch('');
      break;
    default:
      if (search.length === 1) {
        data = await fetchFirstLetter(search, path);

        setSearch('');
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    }
    if (data.length === 1) {
      history.push(`${pathname}/${data[0][verifyId]}`);
    }
  };

  const handleChangeRadio = ({ target: { value } }) => { setRadio(value); };
  return (
    <div>
      <div>
        <label htmlFor="ingredient-name">
          <input
            type="radio"
            id="ingredient-name"
            data-testid="ingredient-search-radio"
            name="product"
            value="ingredient"
            onChange={ handleChangeRadio }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            type="radio"
            id="name"
            data-testid="name-search-radio"
            name="product"
            value="name"
            onChange={ handleChangeRadio }

          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            type="radio"
            id="first-letter"
            data-testid="first-letter-search-radio"
            name="product"
            value="first-letter"
            onChange={ handleChangeRadio }

          />
          First Letter
        </label>
        <button
          type="button"
          data-testid="exec-search-btn"
          onClick={ handleFilterResults }
        >
          Search
        </button>
      </div>
    </div>

  );
}

export default SearchBar;
