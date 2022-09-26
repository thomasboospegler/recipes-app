import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/Search.css';

export default function Search() {
  const [radioValue, setRadioValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (radioValue === 'first letter' && inputValue.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const saveInfo = {
      radioValue,
      inputValue,
    };
    const dispatchTest = () => dispatch({ type: 'SAVE_FETCH_INFO', saveInfo });
    dispatchTest();
  };

  return (
    <div className="search-container">
      <div>
        <input
          data-testid="search-input"
          type="text"
          placeholder="Buscar Receita"
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
        />
      </div>
      <div className="radio-input-container">
        <label htmlFor="ingredient">
          <input
            data-testid="ingredient-search-radio"
            type="radio"
            id="ingredient"
            name="radio-input"
            value="ingredient"
            onClick={ ({ target }) => setRadioValue(target.value) }
          />
          Ingredient
        </label>
        <label htmlFor="name">
          <input
            data-testid="name-search-radio"
            type="radio"
            id="name"
            name="radio-input"
            value="name"
            onClick={ ({ target }) => setRadioValue(target.value) }
          />
          Name
        </label>
        <label htmlFor="first-letter">
          <input
            data-testid="first-letter-search-radio"
            type="radio"
            id="first-letter"
            name="radio-input"
            value="first letter"
            onClick={ ({ target }) => setRadioValue(target.value) }
          />
          First letter
        </label>
      </div>
      <div>
        <button
          onClick={ handleSubmit }
          data-testid="exec-search-btn"
          type="button"
        >
          Search
        </button>
      </div>
    </div>
  );
}
