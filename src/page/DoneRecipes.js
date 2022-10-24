import React from 'react';
import profileIcon from '../images/profileIcon.svg';

function DoneRecipes() {
  return (
    <div>
      <header>
        <h1>Recipes App</h1>
        <img
          src={ profileIcon }
          alt="profile"
          data-testid="profile-top-btn"
        />
        <h1 data-testid="page-title">Done Recipes</h1>
      </header>
    </div>
  );
}

export default DoneRecipes;
