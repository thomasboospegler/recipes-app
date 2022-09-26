import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Card from '../components/Card';
import Header from '../components/Header';
import fetchApi from '../services/fetchApi';

function Meals() {
  const fetchInfo = useSelector((state) => state.searchInfo);
  const [mealsList, setMealsList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const callApi = async (url) => {
      const data = await fetchApi(url);
      const alertMsg = 'Sorry, we haven\'t found any recipes for these filters.';
      if (!data.meals) return global.alert(alertMsg);
      if (data.meals.length === 1) {
        const id = data.meals[0].idMeal;
        return history.push(`/meals/${id}`);
      }
      setMealsList(data.meals);
    };

    switch (fetchInfo.radioValue) {
    case 'ingredient': {
      const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${fetchInfo.inputValue}`;
      callApi(url);
      break;
    }
    case 'name': {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${fetchInfo.inputValue}`;
      callApi(url);
      break;
    }
    case 'first letter': {
      const url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${fetchInfo.inputValue}`;
      callApi(url);
      break;
    }
    default: console.log('caso default');
    }
  }, [fetchInfo, history]);
  return (
    <main>
      <Header title="Meals" isSearchIcon />
      { mealsList.map((meal, index) => {
        const maxIndex = 12;

        if (index >= maxIndex) return null;

        return (<Card
          key={ index }
          recipe={ meal }
          index={ index }
          recipeType="Meal"
        />);
      })}
    </main>
  );
}

export default Meals;
