import PropTypes from 'prop-types';
import React, { useState, useMemo, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import MyContext from './myContext';
import { fetchApiIngredients, fetchFirstLetter, fetchName } from '../services/fetchApi';

function Provider({ children }) {
  const [email, setEmaill] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [radio, setRadio] = useState('');

  const { pathname } = useLocation();
  const history = useHistory();

  const handleEmail = ({ target }) => {
    setEmaill(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleSearch = ({ target: { value } }) => setSearch(value);

  const handleChangeRadio = ({ target: { value } }) => { setRadio(value); };

  const handleFilterResults = useCallback(async () => {
    const path = pathname.includes('meals') ? 'themealdb' : 'thecocktaildb';
    const verifyIdProduct = pathname.includes('meals') ? 'idMeal' : 'idDrink';
    let getProducts = data;
    switch (radio) {
    case 'ingredient':
      getProducts = await fetchApiIngredients(search, path);
      setData(getProducts);

      setSearch('');
      break;
    case 'name':
      getProducts = await fetchName(search, path);
      setData(getProducts);

      setSearch('');
      break;
    default:
      if (search.length === 1) {
        getProducts = await fetchFirstLetter(search, path);
        setData(getProducts);

        setSearch('');
      } else {
        global.alert('Your search must have only 1 (one) character');
      }
      break;
    }
    console.log(data);
    if (getProducts.length === 1) {
      history.push(`${pathname}/${getProducts[0][verifyIdProduct]}`);
    }
  }, [data, history, pathname, radio, search]);

  const context = useMemo(() => ({
    handleEmail,
    handleSearch,
    handleFilterResults,
    handleChangeRadio,
    search,
    email,
    setSearch,
    handlePassword,
    password,
  }), [email, handleFilterResults, password, search]);

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
