import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import all from '../images/all.svg';
import foods from '../images/foods.svg';
import drinks from '../images/drinks.svg';
import shareIcon from '../images/shareIcon.svg';
import redHeart from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
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
    if (filterType === '') {
      return setFilteredFavoriteRecipes(favoriteRecipes);
    }
    const filter = favoriteRecipes.filter(({ type }) => type === filterType);
    setFilteredFavoriteRecipes(filter);
  };

  useEffect(() => {
    const favoriteStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (
      favoriteStorage !== null
      && favoriteStorage !== undefined
      && favoriteStorage.length > 0
    ) {
      setFavoriteRecipes(favoriteStorage);
      return setFilteredFavoriteRecipes(favoriteStorage);
    }
    setFavoriteRecipes([]);
    setFilteredFavoriteRecipes([]);
  }, []);

  return (
    <div>
      <Header title="Favorite Recipes" isSearchIcon={ false } />
      <div className="done-btns-container">
        <button
          type="button"
          value="All"
          data-testid="filter-by-all-btn"
          onClick={ () => filterFavoriteRecipes('') }
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
        >
          <img
            src={ drinks }
            alt="Drinks filter icon"
          />
        </button>
      </div>
      { copied && (
        <button type="button">
          <span>
            Link copied!
          </span>
        </button>
      )}
      <div>
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
            <div key={ id }>
              <Link to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt="share-btn"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div>
                <Link to={ `/${type}s/${id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    {name}
                  </p>
                </Link>
                <span data-testid={ `${index}-horizontal-top-text` }>
                  {`${type === 'meal' ? nationality : alcoholicOrNot} - ${category}`}
                </span>
                <button
                  type="button"
                  onClick={ () => {
                    copy(copyUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), TWO_SECONDS);
                  } }
                >
                  <img
                    src={ shareIcon }
                    alt="Ícone de compartilhar"
                    data-testid={ `${index}-horizontal-share-btn` }
                  />
                </button>
                <button
                  type="button"
                  onClick={ () => disfavorRecipe(recipe) }
                >
                  <img
                    src={ redHeart }
                    alt="Ícone de compartilhar"
                    data-testid={ `${index}-horizontal-favorite-btn` }
                  />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
