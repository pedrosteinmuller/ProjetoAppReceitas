import React from 'react';

function SearchBar() {
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
          />
          First Letter
        </label>
        <button type="button" data-testid="exec-search-btn">Search</button>
      </div>
    </div>

  );
}

export default SearchBar;
