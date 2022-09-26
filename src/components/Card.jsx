import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ recipe, index, recipeType }) {
  if (recipeType === 'Drink') {
    return (
      <div data-testid={ `${index}-recipe-card` }>
        <img data-testid={ `${index}-card-img` } src={ recipe.strDrinkThumb } alt="" />
        <h3 data-testid={ `${index}-card-name` }>{ recipe.strDrink }</h3>
      </div>
    );
  }
  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ recipe.strMealThumb } alt="" />
      <h3 data-testid={ `${index}-card-name` }>{ recipe.strMeal }</h3>
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
