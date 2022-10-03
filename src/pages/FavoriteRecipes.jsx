import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const storageFavoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(storageFavoriteRecipes);
    setFavoriteRecipes(storageFavoriteRecipes);
  }, []);

  console.log(favoriteRecipes);
  return (
    <div>
      <Header title="Done Recipes" isSearchIcon={ false } />

      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>

      <button
        type="button"
        data-testid="filter-by-meal-btn"
      >
        Meals
      </button>

      <button
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>

      { favoriteRecipes.map((recipe, index) => {
        const { tags, id, image, type } = recipe;
        const isMeal = tags.length > 0 && type === 'meal';
        const MAX_LENGTH = 2;
        return (
          <div key={ id }>
            <img
              src={ image }
              alt="share-btn"
              data-testid={ `${index}-horizontal-image` }
            />
            <p data-testid={ `${index}-horizontal-top-text` }>Categoria da receita</p>
            <p data-testid={ `${index}-horizontal-name` }>Nome da receita</p>
            <p data-testid={ `${index}-horizontal-done-date` }>Data da receita</p>

            <button
              type="button"
              data-testid={ `${index}-horizontal-share-btn` }
            >
              Compartilhar
            </button>

            <div>
              { isMeal && tags.filter(
                (filteredTag, filterIndex) => (filterIndex < MAX_LENGTH
                  ? filteredTag : undefined),
              )
                .map((tagName, i) => (
                  <p
                    key={ i }
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                  >
                    { tagName }
                  </p>
                ))}
            </div>

          </div>
        );
      })}
      <Footer />
    </div>
  );
}
