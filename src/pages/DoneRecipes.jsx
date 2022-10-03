import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';

export default function DoneRecipes() {
  const [doneRecipeStoraged, setRecipeStoraged] = useState([]);
  const [filteredDoneRecipes, setFilteredDoneRecipes] = useState([]);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const getDoneStoraged = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getDoneStoraged !== null && getDoneStoraged.length > 0) {
      setRecipeStoraged(getDoneStoraged);
      return setFilteredDoneRecipes(getDoneStoraged);
    }
    setRecipeStoraged([]);
    setFilteredDoneRecipes([]);
  }, []);

  const filterDoneRecipes = (filterType) => {
    if (filterType === '') {
      return setFilteredDoneRecipes(doneRecipeStoraged);
    }
    const filter = doneRecipeStoraged.filter(({ type }) => type === filterType);
    setFilteredDoneRecipes(filter);
  };

  return (
    <div>
      <Header title="Done Recipes" isSearchIcon={ false } />
      <div>
        <button
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ () => filterDoneRecipes('') }
        >
          All
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ () => filterDoneRecipes('meal') }
        >
          Meals
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ () => filterDoneRecipes('drink') }
        >
          Drinks
        </button>
      </div>

      { filteredDoneRecipes.map(({
        tags,
        id,
        image,
        type,
        name,
        category,
        nationality,
        doneDate,
        alcoholicOrNot,
      }, index) => {
        const isMeal = tags.length > 0 && type === 'meal';
        const isDrink = tags.length > 0 && type === 'drink';
        const MAX_LENGTH = 2;
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
              <div>
                <Link to={ `/${type}s/${id}` }>
                  <p data-testid={ `${index}-horizontal-name` }>
                    { name }
                  </p>
                </Link>
                <p data-testid={ `${index}-horizontal-top-text` }>
                  {`${type === 'meal' ? nationality : alcoholicOrNot} - ${category}`}
                </p>
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
                { copied && (
                  <button type="button">

                    <span>
                      Link copied!
                    </span>
                  </button>
                )}
              </div>
              <p
                data-testid={ `${index}-horizontal-done-date` }
              >
                Feito em:
                { ' ' }
                { doneDate }
              </p>
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
                { isDrink && tags.map((tagName, i) => (
                  <p
                    key={ i }
                    data-testid={ `${index}-${tagName}-horizontal-tag` }
                  >
                    { tagName }
                  </p>
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
