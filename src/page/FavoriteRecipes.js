import React from 'react';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <div>
      <Header verifyPage />
      <h1 data-testid="page-title">Favorite Recipes</h1>
    </div>
  );
}

export default FavoriteRecipes;
