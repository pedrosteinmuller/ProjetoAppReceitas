import React, { useContext } from 'react';
import myContext from '../context/myContext';

function SearchBar() {
  const { handleFilterResults, handleChangeRadio } = useContext(myContext);

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
