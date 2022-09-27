import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import '../styles/RecipeDetails.css';
import fetchApi from '../services/fetchApi';
import Card from './Card';

export default function RecipesDetails({ recipe, recipeType }) {
  const [recomended, setRecomended] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      if (recipeType === 'Meal') {
        const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
        const data = await fetchApi(url);
        setRecomended(data.drinks);
      }
      if (recipeType === 'Drink') {
        const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
        const data = await fetchApi(url);
        setRecomended(data.meals);
      }
    };
    callApi();
  }, [recipeType]);
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
      { recomended.map((recomedRecipe, index) => {
        const maxIndex = 5;

        if (index >= maxIndex) return null;

        return (<Card
          key={ index }
          recipe={ recomedRecipe }
          index={ index }
          recipeType={ recipeType === 'Meal' ? 'Drink' : 'Meal' }
        />);
      })}
    </section>
  );
}

RecipesDetails.propTypes = {
  recipe: shape({
    strMealThumb: string,
  }).isRequired,
  recipeType: string.isRequired,
};
