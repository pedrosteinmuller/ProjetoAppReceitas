import PropTypes from 'prop-types';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import MyContext from './myContext';
import { fetchApiIngredients,
  fetchFirstLetter, fetchName, fetchApiCategoryRecipes } from '../services/fetchApi';

let toggleMeals = [];
let toggleDrinks = [];

function Provider({ children }) {
  const [email, setEmaill] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [radio, setRadio] = useState('');
  const [drinksData, setDrinks] = useState([]);
  const [mealsData, setMeals] = useState([]);
  const [toggleCategory, setToggleCategory] = useState('');
  const [verifyRender, setVerifyRender] = useState(false);
  const [categoryFilterDrink, setCategoryFilterDrink] = useState([]);
  const [categoryFilterMeals, setCategoryFilterMeals] = useState([]);

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
    if (getProducts?.length === 1) {
      history.push(`${pathname}/${getProducts[0][verifyIdProduct]}`);
    }
    if (!getProducts) {
      global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (verifyRender === false) {
      setVerifyRender(true);
    }
  }, [data, history, pathname, radio, search, verifyRender]);

  const searchByCategory = useCallback(async (category) => {
    const path = pathname.includes('meals') ? 'themealdb' : 'thecocktaildb';
    const URL = await fetchApiCategoryRecipes(category, path);
    setToggleCategory(category);

    if (toggleCategory !== category) {
      setDrinks(URL);
      setMeals(URL);
    } else {
      setMeals(toggleMeals);
      setDrinks(toggleDrinks);
      setToggleCategory('');
    }
  }, [pathname, toggleCategory]);

  const removeFilters = () => {
    setMeals(toggleMeals);
    setDrinks(toggleDrinks);
    setToggleCategory('');
  };

  useEffect(() => {
    const fetchAPIs = async () => {
      const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const urlMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const responseMeals = await fetch(urlMeals);
      const { meals } = await responseMeals.json();
      const responseDrinks = await fetch(urlDrinks);
      const { drinks } = await responseDrinks.json();
      setDrinks(drinks);
      setMeals(meals);
      toggleMeals = meals;
      toggleDrinks = drinks;
    };
    fetchAPIs();
  }, []);

  useEffect(() => {
    const fetchApiCategory = async () => {
      const urlMealsCategory = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      const urlDrinksCategory = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      const responseMeals = await fetch(urlMealsCategory);
      const meals = await responseMeals.json();
      const responseDrinks = await fetch(urlDrinksCategory);
      const drinks = await responseDrinks.json();
      setCategoryFilterDrink(drinks);
      setCategoryFilterMeals(meals);
    };
    fetchApiCategory();
  }, []);

  const context = useMemo(() => ({
    handleEmail,
    handleSearch,
    handleFilterResults,
    handleChangeRadio,
    searchByCategory,
    removeFilters,
    categoryFilterDrink,
    categoryFilterMeals,
    verifyRender,
    mealsData,
    drinksData,
    data,
    search,
    email,
    setSearch,
    handlePassword,
    password,
  }), [categoryFilterDrink, categoryFilterMeals, data,
    drinksData, email, handleFilterResults, mealsData,
    password, search, verifyRender, searchByCategory]);

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
