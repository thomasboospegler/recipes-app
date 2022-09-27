import React from 'react';
import { shape, string } from 'prop-types';
import '../styles/RecipeDetails.css';

export default function RecipesDetails({ recipe }) {
  return (
    <section className="recipe-details-container">
      <div className="recipe-details-img-container">
        <img data-testid="recipe-photo" src={ recipe.src } alt="Recipe img" />
      </div>
      <div className="recipe-header">
        <p data-testid="recipe-category">{ recipe.category }</p>
        <h1 data-testid="recipe-title">{ recipe.title }</h1>
      </div>
      <h3>Ingredients</h3>
      <div>
        <ul>
          { recipe.ingredients.map((ingredient, index) => (
            <li
              key={ index }
              data-testid={ `${index}-ingredient-name-and-measure` }
            >
              { ingredient }
            </li>
          ))}
        </ul>
      </div>
      <h3>Intructions</h3>
      <div>
        <p data-testid="instructions">{ recipe.instructions }</p>
      </div>
      { recipe.video && (
        <div>
          <h3>Video</h3>
          <iframe
            data-testid="video"
            src={ recipe.video.replace('watch?v=', 'embed/') }
            title="video"
          />
        </div>
      )}
    </section>
  );
}

RecipesDetails.propTypes = {
  recipe: shape({
    strMealThumb: string,
  }).isRequired,
  // recipeType: string.isRequired,
};
