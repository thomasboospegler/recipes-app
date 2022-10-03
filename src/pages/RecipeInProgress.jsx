import React, { useState, useEffect } from 'react';
import { shape, string } from 'prop-types';
import { useHistory } from 'react-router-dom';
import '../styles/RecipeInProgress.css';
import copy from 'clipboard-copy';
import shareIcon from '../images/shareIcon.svg';
import yellowHeart from '../images/whiteHeartIcon.svg';
import redHeart from '../images/blackHeartIcon.svg';

export default function InProgressRecipe({ recipe, recipeType }) {
  const [checkboxValues, setCheckboxValues] = useState([]);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState([]);
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const history = useHistory();
  const megInterval = 2000;
  const pathName = history.location.pathname.split('/');
  const pageUrl = `http://localhost:3000/${pathName[1]}/${pathName[2]}`;
  const recipetypeName = `${recipeType.toLowerCase()}s`;

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

  const handleCheckbox = (e) => {
    const { checked, name } = e.target;
    const newCheckboxValues = [...checkboxValues];
    newCheckboxValues[name] = !newCheckboxValues[name];
    setCheckboxValues(newCheckboxValues);
    const newIsCheckboxChecked = [...isCheckboxChecked];
    newIsCheckboxChecked[name] = checked;
    setIsCheckboxChecked(newIsCheckboxChecked);
    const prevInProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (prevInProgress) {
      return localStorage.setItem('inProgressRecipes', JSON.stringify({
        ...prevInProgress,
        [recipetypeName]: {
          ...prevInProgress[recipetypeName],
          [recipe.id]: newCheckboxValues,
        },
      }));
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      [recipetypeName]: {
        [recipe.id]: newCheckboxValues,
      },
    }));
  };

  useEffect(() => {
    const prevFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const isRecipeFav = prevFavorites ? prevFavorites
      .some((favRecipe) => favRecipe.id === recipe.id) : false;
    setIsFavorite(isRecipeFav);
    const valuesCheckbox = recipe.ingredients
      .filter((key) => key !== ' - null' && key !== ' - ')
      .map(() => false);
    const prevProgress = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (prevProgress) {
      const prevProgressRecipe = prevProgress[recipetypeName];
      if (prevProgressRecipe) {
        const prevProgressRecipeId = prevProgressRecipe[recipe.id];
        if (prevProgressRecipeId) {
          setIsCheckboxChecked(prevProgressRecipeId);
          return setCheckboxValues(prevProgressRecipeId);
        }
      }
    }
    setCheckboxValues(valuesCheckbox);
    setIsCheckboxChecked(valuesCheckbox);
  }, [recipe, recipetypeName]);

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
            { recipe.ingredients
              .filter((key) => key !== ' - null' && key !== ' - ')
              .map((ingredient, index) => (
                <label
                  htmlFor={ index }
                  key={ index }
                  className={ checkboxValues[index]
                    ? 'checked ingredient' : 'ingredient' }
                  data-testid={ `${index}-ingredient-step` }
                >
                  <input
                    type="checkbox"
                    id={ index }
                    name={ index }
                    value={ ingredient }
                    checked={ isCheckboxChecked.length > 0
                      ? isCheckboxChecked[index] : true }
                    onChange={ handleCheckbox }
                  />
                  { ingredient }
                </label>
              ))}
          </div>
        </div>
        <div className="instructions-container">
          <h2>Intructions</h2>
          <p data-testid="instructions">{ recipe.instructions }</p>
        </div>
        { recipe.video && (
          <div className="video-container">
            <h2>Video</h2>
            <iframe
              data-testid="video"
              src={ recipe.video.replace('watch?v=', 'embed/') }
              title="video"
            />
          </div>
        )}
        <button
          className="start-recipe-btn"
          type="button"
          data-testid="finish-recipe-btn"
          onClick={ () => history.push('/done-recipes') }
          disabled={ checkboxValues.some((value) => value === false) }
        >
          Finish Recipe
        </button>
      </section>
    </div>
  );
}

InProgressRecipe.propTypes = {
  recipe: shape({
    strMealThumb: string,
  }).isRequired,
  recipeType: string.isRequired,
};
