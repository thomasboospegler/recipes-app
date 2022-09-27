import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import fetchApi from '../services/fetchApi';
import Footer from '../components/Footer';
import '../styles/Meals.css';
import Filters from '../components/Filters';
import Recipes from '../components/Recipes';

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
    default: {
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      callApi(url);
    }
    }
  }, [fetchInfo, history]);
  return (
    <main>
      <Header title="Meals" isSearchIcon />
      <Filters title="Meals" setList={ setMealsList } />
      <Recipes list={ mealsList } recipeType="Meal" />
      <Footer />
    </main>
  );
}

export default Meals;
