import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Card.css';
import { Link } from 'react-router-dom';

export default function Card({ recipe, index, recipeType, recomended }) {
  if (recipeType === 'Drink') {
    return (
      <Link to={ `/drinks/${recipe.idDrink}` } className="link">
        <div
          className="card-container"
          data-testid={ recomended ? `${index}-recommendation-card`
            : `${index}-recipe-card` }
        >
          <div className="img-card-container">
            <img
              data-testid={ `${index}-card-img` }
              src={ recipe.strDrinkThumb }
              alt="Recipe img"
            />
          </div>
          <div className="name-container">
            <h3
              data-testid={ recomended ? `${index}-recommendation-title`
                : `${index}-card-name` }
            >
              { recipe.strDrink }

            </h3>
          </div>
        </div>
      </Link>
    );
  }
  return (
    <Link to={ `/meals/${recipe.idMeal}` } className="link">
      <div
        className="card-container"
        data-testid={ recomended ? `${index}-recommendation-card`
          : `${index}-recipe-card` }
      >
        <div className="img-card-container">
          <img
            data-testid={ `${index}-card-img` }
            src={ recipe.strMealThumb }
            alt="Recipe img"
          />
        </div>
        <div className="name-container">
          <h3
            data-testid={ recomended ? `${index}-recommendation-title`
              : `${index}-card-name` }
          >
            { recipe.strMeal }

          </h3>
        </div>
      </div>
    </Link>
  );
}

Card.propTypes = {
  recipe: PropTypes.shape({
    strDrinkThumb: PropTypes.string,
    strDrink: PropTypes.string,
    strMealThumb: PropTypes.string,
    strMeal: PropTypes.string,
    idMeal: PropTypes.string,
    idDrink: PropTypes.string,
  }).isRequired,
  index: PropTypes.number.isRequired,
  recipeType: PropTypes.string.isRequired,
  recomended: PropTypes.bool.isRequired,
};
