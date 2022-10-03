import React from 'react';
import { Route, Switch } from 'react-router-dom';
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
        <Route
          exact
          path="/meals/:id"
          render={ (props) => <Meal { ...props } isInProgress={ false } /> }
        />
        <Route
          exact
          path="/drinks/:id"
          render={ (props) => <Drink { ...props } isInProgress={ false } /> }
        />
        <Route
          exact
          path="/meals/:id/in-progress"
          render={ (props) => <Meal { ...props } isInProgress props={ props } /> }
        />
        <Route
          exact
          path="/drinks/:id/in-progress"
          render={ (props) => <Drink { ...props } isInProgress props={ props } /> }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route component={ NotFound } />
      </Switch>
    </div>
  );
}

export default App;
