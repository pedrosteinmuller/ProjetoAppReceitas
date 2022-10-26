import React from 'react';
import { useHistory } from 'react-router-dom';

export default function ProfileComponent() {
  const email = JSON.parse(localStorage.getItem('user'));
  const history = useHistory();

  const clearLocalStorage = () => {
    localStorage.clear();
    history.push('/');
  };
  return (
    <div>
      {
        email && <p data-testid="profile-email">{email.email}</p>
      }
      <button
        data-testid="profile-done-btn"
        type="button"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        data-testid="profile-favorite-btn"
        type="button"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        data-testid="profile-logout-btn"
        type="button"
        onClick={ clearLocalStorage }
      >
        Logout
      </button>

    </div>
  );
}
