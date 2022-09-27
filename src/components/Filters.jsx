import React, { useEffect, useState } from 'react';
import { string, func } from 'prop-types';
import fetchApi from '../services/fetchApi';
import mealIcon from '../images/allMeals.svg';
import drinkIcon from '../images/allDrinks.svg';
import Beef from '../images/beef.svg';
import Breakfast from '../images/breakfast.svg';
import Chicken from '../images/chicken.svg';
import Dessert from '../images/dessert.svg';
import Lamb from '../images/lamb.svg';
import Ordinary from '../images/drink.svg';
import Cocktail from '../images/cocktail.svg';
import Shake from '../images/shake.svg';
import Other from '../images/other.svg';
import Cocoa from '../images/cocoa.svg';
import '../styles/Filters.css';

export default function Filters({ title, setList }) {
  const [filtersList, setFiltersList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('');
  const mealsFiltersIcons = [Beef, Breakfast, Chicken, Dessert, Lamb];
  const drinksFiltersIcons = [Ordinary, Cocktail, Shake, Other, Cocoa];

  useEffect(() => {
    const callApi = async (url, name) => {
      const data = await fetchApi(url);
      setFiltersList(data[name]);
    };

    switch (title) {
    case 'Meals': {
      const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
      callApi(url, 'meals');
      break;
    }
    default: {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
      callApi(url, 'drinks');
    }
    }
  }, [title]);

  const fetchApiByCategory = (value) => {
    const name = title.toLowerCase();
    setSelectedFilter(value);
    let API = '';
    if (name === 'meals') API = 'themealdb';
    if (name === 'drinks') API = 'thecocktaildb';
    if (value === 'All' || selectedFilter === value) {
      const url = `https://www.${API}.com/api/json/v1/1/search.php?s=`;
      setSelectedFilter('');
      return fetchApi(url).then((data) => setList(data[name]));
    }
    const url = `https://www.${API}.com/api/json/v1/1/filter.php?c=${value}`;
    fetchApi(url).then((data) => setList(data[name]));
  };

  const returnFilterIcon = (index) => {
    if (title === 'Meals') return mealsFiltersIcons[index];
    if (title === 'Drinks') return drinksFiltersIcons[index];
  };

  return (
    <div className="filters-container">
      <button
        type="button"
        data-testid="All-category-filter"
        value="All"
        onClick={ () => fetchApiByCategory('All') }
      >
        <img src={ title === 'Meals' ? mealIcon : drinkIcon } alt="All" />
      </button>
      { filtersList.map((filter, index) => {
        const maxIndex = 5;

        if (index >= maxIndex) return null;
        return (
          <button
            type="button"
            key={ index }
            value={ filter.strCategory }
            data-testid={ `${filter.strCategory}-category-filter` }
            onClick={ () => fetchApiByCategory(filter.strCategory) }
          >
            <img src={ returnFilterIcon(index) } alt={ filter.strCategory } />
          </button>
        );
      })}
    </div>
  );
}

Filters.propTypes = {
  title: string.isRequired,
  setList: func.isRequired,
};
