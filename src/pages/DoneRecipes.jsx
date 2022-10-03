import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/DoneRecipes.css';
import copy from 'clipboard-copy';
import Header from '../components/Header';
import shareIcon from '../images/shareIcon.svg';
import all from '../images/all.svg';
import foods from '../images/foods.svg';
import drinks from '../images/drinks.svg';

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
    <main>
      <Header title="Done Recipes" isSearchIcon={ false } />
      <div className="done-btns-container">
        <button
          type="button"
          data-testid="filter-by-all-btn"
          className="recipe-top-btns"
          onClick={ () => filterDoneRecipes('') }
        >
          <img
            src={ all }
            alt="Drinks"
          />
        </button>
        <button
          type="button"
          data-testid="filter-by-meal-btn"
          className="recipe-top-btns"
          onClick={ () => filterDoneRecipes('meal') }
        >
          <img
            src={ foods }
            alt="Drinks"
          />
        </button>
        <button
          type="button"
          data-testid="filter-by-drink-btn"
          className="recipe-top-btns"
          onClick={ () => filterDoneRecipes('drink') }
        >
          <img
            src={ drinks }
            alt="Drinks"
          />
        </button>
      </div>
      <div className="done-recipes-container">
        { filteredDoneRecipes.map(({ tags, id, image, type, name, category,
          nationality, doneDate, alcoholicOrNot }, index) => {
          const isMeal = tags.length > 0 && type === 'meal';
          const isDrink = tags.length > 0 && type === 'drink';
          const MAX_LENGTH = 2;
          const TWO_SECONDS = 2000;
          const copyUrl = `http://localhost:3000/${type}s/${id}`;
          return (
            <div className="done-recipe" key={ id }>
              <Link to={ `/${type}s/${id}` }>
                <img
                  src={ image }
                  alt="share-btn"
                  data-testid={ `${index}-horizontal-image` }
                />
              </Link>
              <div className="info-done-container">
                <div className="done-title-container">
                  <Link to={ `/${type}s/${id}` }>
                    <p data-testid={ `${index}-horizontal-name` }>
                      { name }
                    </p>
                    <span data-testid={ `${index}-horizontal-top-text` }>
                      {`${type === 'meal' ? nationality : alcoholicOrNot} - ${category}`}
                    </span>
                  </Link>
                  <button
                    type="button"
                    className="recipe-top-btns"
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
                </div>
                { copied && (
                  <button type="button">
                    <span>
                      Link copied!
                    </span>
                  </button>
                )}
                <p
                  data-testid={ `${index}-horizontal-done-date` }
                  className="done-date"
                >
                  Done in:
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
    </main>
  );
}
