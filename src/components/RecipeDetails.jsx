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
  const pageUrl = `http://localhost:3000${history.location.pathname}`;
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
    const favObj = {
      id: recipe.id,
      type,
      nationality: recipe.area ? recipe.area : '',
      category: recipe.category ? recipe.category : '',
      alcoholicOrNot: recipeType === 'Drink' ? recipe.strAlcoholic : '',
      name: recipe.title,
      image: recipe.src,
    };
    if (prevFavorites) {
      localStorage.setItem('favoriteRecipes', JSON.stringify([
        ...prevFavorites,
        favObj,
      ]));
      return setIsFavorite(true);
    }
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      favObj,
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
    <div>
      <img
        className="img-title"
        data-testid="recipe-photo"
        src={ recipe.src }
        alt="Recipe img"
      />
      <section className="recipe-details-container">
        <div className="recipe-header">
          <p data-testid="recipe-category">
            { recipeType === 'Meal'
              ? recipe.category : recipe.strAlcoholic }
          </p>
          <button
            type="button"
            className="recipe-top-btns"
            data-testid="share-btn"
            onClick={ () => {
              copy(pageUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), megInterval);
            } }
          >
            <img src={ shareIcon } alt="Share icon" />
          </button>
          { copied && (
            <span>
              { console.log('qualquer coisa') }
              Link copied!
            </span>
          )}
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
        <h1 className="recipe-title" data-testid="recipe-title">{ recipe.title }</h1>
        <div className="content-recipe-container">
          <h2>Ingredients</h2>
          <div className="ul-container">
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
        </div>
        <div className="instructions-container">
          <h2>Intructions</h2>
          <p data-testid="instructions">{ recipe.instructions }</p>
        </div>
        { recipe.video && (
          <div>
            <h2>Video</h2>
            <iframe
              data-testid="video"
              src={ recipe.video.replace('watch?v=', 'embed/') }
              title="video"
            />
          </div>
        )}
        <div className="recomend-container">
          <h2>Recomended</h2>
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
    </div>
  );
}

RecipesDetails.propTypes = {
  recipe: shape({
    strMealThumb: string,
  }).isRequired,
  recipeType: string.isRequired,
};
