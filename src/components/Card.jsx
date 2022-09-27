import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';

export default function Card({ recipe, index, recipeType }) {
  if (recipeType === 'Drink') {
    return (
      <div className="card-container" data-testid={ `${index}-recipe-card` }>
        <div className="img-card-container">
          <img data-testid={ `${index}-card-img` } src={ recipe.strDrinkThumb } alt="" />
        </div>
        <div className="name-container">
          <h3 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h3>
        </div>
      </div>
    );
  }
  return (
    <div className="card-container" data-testid={ `${index}-recipe-card` }>
      <div className="img-card-container">
        <img data-testid={ `${index}-card-img` } src={ recipe.strMealThumb } alt="" />
      </div>
      <div className="name-container">
        <h3 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h3>
      </div>
    </div>
  );
}

Card.propTypes = {
  recipe: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  recipeType: PropTypes.string.isRequired,
};
