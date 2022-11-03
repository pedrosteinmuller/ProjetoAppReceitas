import React, { useEffect, useState } from 'react';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import BlackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';

function FavoriteRecipes() {
  const [favorites, setFavorites] = useState([]);
  const [click, setClick] = useState(false);
  // const [shareRecipe, setShareRecipe] = useState([]);

  useEffect(() => {
    setFavorites(JSON.parse(localStorage.getItem('favoriteRecipes')) || []);
  }, []);

  const btnCopy = (e) => {
    if (e.type === 'meal') {
      copy(`http://localhost:3000/meals/${e.id}`);
    } else {
      copy(`http://localhost:3000/drinks/${e.id}`);
    }
    setClick(true);
  };

  return (
    <div>
      <Header verifyPage />
      <h1 data-testid="page-title">Favorite Recipes</h1>
      {favorites?.map((item, index) => (
        <div key={ item.id }>

          <a href={ `/${item.type}s/${item.id}` }>
            <img
              data-testid={ `${index}-horizontal-image` }
              alt={ item.name }
              src={ item.image }
              width="100px"
            />

            <p
              data-testid={ `${index}-horizontal-name` }
            >
              {item.name}
            </p>
          </a>

          <p data-testid={ `${index}-horizontal-top-text` }>
            {item.type === 'drink'
              ? item.alcoholicOrNot : `${item.nationality} - ${item.category}`}
          </p>
          <input
            data-testid={ `${index}-horizontal-favorite-btn` }
            type="image"
            alt="blackHeartIcon"
            src={ BlackHeartIcon }
          />
          <input
            data-testid={ `${index}-horizontal-share-btn` }
            type="image"
            alt="shareButton"
            src={ shareIcon }
            onClick={ () => btnCopy(item) }
          />
          {click && <span>Link copied!</span>}
        </div>))}
    </div>
  );
}

export default FavoriteRecipes;
