import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './pages/Login';
import Meals from './pages/Meals';
import NotFound from './pages/NotFound';
import 'bootstrap/dist/css/bootstrap.min.css';
import Drinks from './pages/Drinks';
import Profile from './pages/Profile';
import DoneRecipes from './pages/DoneRecipes';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Meal from './pages/Meal';
import Drink from './pages/Drink';

function App() {
  return (
    <div className="meals">
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/meals" component={ Meals } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/meals/:id" component={ Meal } />
        <Route exact path="/drinks/:id" component={ Drink } />
        {/* <Route exact path="/meals/:id/in-progress" component={ MealInProgress } /> */}
        {/* <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } /> */}
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
