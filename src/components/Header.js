import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';
import myContext from '../context/myContext';

function Header({ verifyPage }) {
  const [disabled, setDisabled] = useState(false);

  const { search, handleSearch,
  } = useContext(myContext);

  const history = useHistory();

  function handleClickSearch() {
    setDisabled(!disabled);
  }

  return (
    <header>
      <div>
        {
          verifyPage ? (
            <div>
              <h1 data-testid="page-title">Recipes App</h1>
              <button type="button" onClick={ () => history.push('/profile') }>
                <img
                  src={ profileIcon }
                  alt="profile"
                  data-testid="profile-top-btn"
                />
              </button>
            </div>
          ) : (
            <div>
              <h1 data-testid="page-title">Recipes App</h1>
              <button type="button" onClick={ () => history.push('/profile') }>
                <img
                  src={ profileIcon }
                  alt="profile"
                  data-testid="profile-top-btn"
                />
              </button>
              <button type="button" onClick={ handleClickSearch }>
                <img
                  src={ searchIcon }
                  alt="search"
                  data-testid="search-top-btn"
                />
              </button>
            </div>
          )
        }
        {
          disabled && (
            <div>
              <input
                type="text"
                value={ search }
                placeholder="Search Recipe"
                data-testid="search-input"
                onChange={ handleSearch }
                disabled={ !disabled }
              />
              <SearchBar />
            </div>
          )
        }
      </div>
    </header>
  );
}

Header.propTypes = { verifyPage: PropTypes.bool.isRequired };

export default Header;
