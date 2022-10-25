import React, { useState, useContext } from 'react';
import { fetchApiIngredients, fetchFirstLetter, fetchName } from '../services/fetchApi';
import myContext from '../context/myContext';

function SearchBar() {
  const [radio, setRadio] = useState('');

  const { search, setSearch } = useContext(myContext);

  const handleFilterResults = async () => {
    switch (radio) {
    case 'ingredient':
      await fetchApiIngredients(search, 'themealdb');
      setSearch('');
      break;
    case 'name':
      await fetchName(search, 'themealdb');
      setSearch('');
      break;
    case 'first-letter':
      if (search.length === 1) {
        await fetchFirstLetter(search, 'themealdb');
        setSearch('');
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    default:
      break;
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
