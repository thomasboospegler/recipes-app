import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import '../styles/Search.css';

export default function Search() {
  const [radioValue, setRadioValue] = useState('');
  const [inputValue, setInputValue] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (radioValue === 'first letter' && inputValue.length > 1) {
      setInputValue('');
      return global.alert('Your search must have only 1 (one) character');
    }
    const saveInfo = {
      radioValue,
      inputValue,
    };
    const dispatchTest = () => dispatch({ type: 'SAVE_FETCH_INFO', saveInfo });
    dispatchTest();
    setInputValue('');
  };

  return (
    <div className="search-container">
      <div>
        <input
          className="search-input"
          data-testid="search-input"
          type="text"
          placeholder="Buscar Receita"
          value={ inputValue }
          onChange={ ({ target }) => setInputValue(target.value) }
        />
      </div>
      <div className="search-second-container">
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
            <span>Ingredient</span>
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
            <span>Name</span>
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
            <span>First letter</span>
          </label>
        </div>
        <div>
          <button
            className="search-button"
            onClick={ handleSubmit }
            data-testid="exec-search-btn"
            type="button"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
