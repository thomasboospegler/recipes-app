import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function DoneRecipes() {
  const [doneRecipeStoraged, setRecipeStoraged] = useState([]);

  useEffect(() => {
    const addDoneStoraged = JSON.parse(localStorage.getItem('doneRecipes'));
    setRecipeStoraged(addDoneStoraged);
  }, []);

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
      { doneRecipeStoraged.map((recipe, index) => {
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
