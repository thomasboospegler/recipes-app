import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import all from '../images/all.svg';
import foods from '../images/foods.svg';
import drinks from '../images/drinks.svg';
import shareIcon from '../images/shareIcon.svg';
import redHeart from '../images/blackHeartIcon.svg';
import '../styles/FavoriteRecipes.css';

export default function FavoriteRecipes() {
  const [filteredFavoriteRecipes, setFilteredFavoriteRecipes] = useState([]);
  const [copied, setCopied] = useState(false);

  const disfavorRecipe = ({ id }) => {
    const prevFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));

    const filteredFavList = prevFavorites
      .filter((favRecipe) => favRecipe.id !== id);
    localStorage.setItem('favoriteRecipes', JSON.stringify(filteredFavList));
    setFilteredFavoriteRecipes(filteredFavList);
  };

  const filterFavoriteRecipes = (filterType) => {
    const prevFavorites = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (filterType === '') {
      return setFilteredFavoriteRecipes(prevFavorites);
    }
    const filter = prevFavorites.filter(({ type }) => type === filterType);
    setFilteredFavoriteRecipes(filter);
  };

  useEffect(() => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (
      favoriteStorage !== null
      && favoriteStorage !== undefined
      && favoriteStorage.length > 0
    ) {
      return setFilteredFavoriteRecipes(favoriteStorage);
    }
    setFilteredFavoriteRecipes([]);
  }, []);

  return (
    <div>
      { copied && (
        <button
          className="copied-btn"
          type="button"
        >
          Link copied!
        </button>
      )}
      <Header title="Favorite Recipes" isSearchIcon={ false } />
      <div className="favorite-btns-container">
        <button
          type="button"
          value="All"
          data-testid="filter-by-all-btn"
          onClick={ () => filterFavoriteRecipes('') }
          className="filter-buttons"
        >
          <img
            src={ all }
            alt="Filter all"
          />
        </button>
        <button
          type="button"
          value="Meal"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterFavoriteRecipes('meal') }
          className="filter-buttons"
        >
          <img
            src={ foods }
            alt="Meals filter icon"
          />
        </button>
        <button
          type="button"
          value="Drink"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterFavoriteRecipes('drink') }
          className="filter-buttons"
        >
          <img
            src={ drinks }
            alt="Drinks filter icon"
          />
        </button>
      </div>
      <div className="recipes-container">
        { filteredFavoriteRecipes.map((recipe, index) => {
          const {
            id,
            image,
            type,
            name,
            category,
            nationality,
            alcoholicOrNot,
          } = recipe;

          const TWO_SECONDS = 2000;
          const copyUrl = `http://localhost:3000/${type}s/${id}`;
          return (
            <div className="recipe-container" key={ id }>
              <Link className="recipe-link" to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt={ `${name} img` }
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div className="recipe-description-container">
                <Link className="recipe-name" to={ `/${type}s/${id}` }>
                  <span data-testid={ `${index}-horizontal-name` }>
                    {name}
                  </span>
                </Link>
                <p className="recipe-info" data-testid={ `${index}-horizontal-top-text` }>
                  {`${type === 'meal' ? nationality : alcoholicOrNot} - ${category}`}
                </p>
                <div className="btn-container">
                  <button
                    type="button"
                    className="share-and-favorite-btn"
                    onClick={ () => {
                      copy(copyUrl);
                      setCopied(true);
                      setTimeout(() => setCopied(false), TWO_SECONDS);
                    } }
                  >
                    <img
                      src={ shareIcon }
                      alt="Icone de compartilhar"
                      data-testid={ `${index}-horizontal-share-btn` }
                    />
                  </button>
                  <button
                    type="button"
                    data-testid={ `${index}-favorite-btn` }
                    className="share-and-favorite-btn"
                    onClick={ () => disfavorRecipe(recipe) }
                  >
                    <img
                      src={ redHeart }
                      alt="Icone de favorito"
                      data-testid={ `${index}-horizontal-favorite-btn` }
                    />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
