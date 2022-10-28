import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Provider from './context/myProvider';

import Login from './page/Login';
import Meals from './page/Meals';
import Drinks from './page/Drinks';
import Profile from './page/Profile';
import DrinksProgress from './page/DrinksProgress';
import MealsProgress from './page/MealsProgress';
import DoneRecipes from './page/DoneRecipes';
import FavoriteRecipes from './page/FavoriteRecipes';
import RecipeDetails from './components/RecipeDetails';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/meals/:id/in-progress" component={ MealsProgress } />
        <Route path="/drinks/:id/in-progress" component={ DrinksProgress } />
        <Route path="/meals/:id" component={ RecipeDetails } />
        <Route path="/drinks/:id" component={ RecipeDetails } />
        <Route path="/meals" component={ Meals } />
        <Route path="/drinks" component={ Drinks } />
        <Route path="/profile" component={ Profile } />
        <Route path="/done-recipes" component={ DoneRecipes } />
        <Route path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </Provider>
  );
}

export default App;
