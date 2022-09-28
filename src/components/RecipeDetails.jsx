import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import '../styles/RecipeDetails.css';
import { useHistory } from 'react-router-dom';
import copy from 'clipboard-copy';
import fetchApi from '../services/fetchApi';
import Card from './Card';
import shareIcon from '../images/shareIcon.svg';
import yellowHeart from '../images/whiteHeartIcon.svg';
import redHeart from '../images/blackHeartIcon.svg';

export default function RecipesDetails({ recipe, recipeType }) {
  const [recomended, setRecomended] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const history = useHistory();
  const name = recipeType.toLowerCase();
  const path = `/${name}s/${recipe.id}/in-progress`;
  const megInterval = 2000;

  const saveFavaorite = () => {
    const prevFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFav = prevFavorites ? prevFavorites
      .some((favRecipe) => favRecipe.id === recipe.id) : false;
    if (isRecipeFav) {
      const filteredFavList = prevFavorites
        .filter((favRecipe) => favRecipe.id !== recipe.id);
      localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavList));
      return setIsFavorite(false);
    }
    const type = recipeType.toLowerCase();
    if (prevFavorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...prevFavorites,
        {
          id: recipe.id,
          type,
          nationality: recipe.area ? recipe.area : '',
          category: recipe.category ? recipe.category : '',
          alcoholicOrNot: recipeType === 'Drink' ? recipe.strAlcoholic : '',
          name: recipe.title,
          image: recipe.src,
        },
      ]));
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: recipe.id,
        type,
        nationality: recipe.area ? recipe.area : '',
        category: recipe.category ? recipe.category : '',
        alcoholicOrNot: recipeType === 'Drink' ? recipe.strAlcoholic : '',
        name: recipe.title,
        image: recipe.src,
      },
    ]));
    setIsFavorite(true);
  };

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
    const favoritesList = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFav = favoritesList ? favoritesList
      .some((favRecipe) => favRecipe.id === recipe.id) : false;
    if (isRecipeFav) setIsFavorite(true);
  }, [recipeType, recipe.id]);
  return (
    <section className="recipe-details-container">
      <div className="recipe-details-img-container">
        <img data-testid="recipe-photo" src={ recipe.src } alt="Recipe img" />
      </div>
      <div className="recipe-header">
        <p data-testid="recipe-category">
          { recipeType === 'Meal'
            ? recipe.category : recipe.strAlcoholic }
        </p>
        <h1 data-testid="recipe-title">{ recipe.title }</h1>
        <button
          type="button"
          className="recipe-top-btns"
          data-testid="share-btn"
          onClick={ () => {
            copy(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), megInterval);
          } }
        >
          <img src={ shareIcon } alt="Share icon" />
        </button>
        { copied && <span>Link copied!</span>}
        <button
          type="button"
          className="recipe-top-btns"
          onClick={ saveFavaorite }
        >
          <img
            data-testid="favorite-btn"
            src={ isFavorite ? redHeart : yellowHeart }
            alt="Share icon"
          />
        </button>
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
      <div className="recomend-container">
        <h3>Recomended</h3>
        <div className="recomended">
          { recomended.map((recomedRecipe, index) => {
            const maxIndex = 6;

            if (index >= maxIndex) return null;
            return (<Card
              key={ index }
              recipe={ recomedRecipe }
              recomended
              index={ index }
              recipeType={ recipeType === 'Meal' ? 'Drink' : 'Meal' }
            />);
          })}
        </div>
      </div>
      { !recipe.isRecipeDone && (
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ () => history.push(path) }
        >
          {recipe.isRecipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </section>
  );
}

RecipesDetails.propTypes = {
  recipe: shape({
    strMealThumb: string,
  }).isRequired,
  recipeType: string.isRequired,
  // match: shape({
  //   params: shape({
  //     id: string,
  //   }),
  // }).isRequired,
};
