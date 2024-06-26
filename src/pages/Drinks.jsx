import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import Header from '../components/Header';
import fetchApi from '../services/fetchApi';
import Footer from '../components/Footer';
import Filters from '../components/Filters';
import Recipes from '../components/Recipes';

export default function Drinks() {
  const fetchInfo = useSelector((state) => state.searchInfo);
  const [drinksList, setDrinksList] = useState([]);
  const history = useHistory();

  useEffect(() => {
    const callApi = async (url) => {
      const data = await fetchApi(url);
      const alertMsg = 'Sorry, we haven\'t found any recipes for these filters.';
      if (!data.drinks) return global.alert(alertMsg);
      if (data.drinks.length === 1) {
        const id = data.drinks[0].idDrink;
        return history.push(`/drinks/${id}`);
      }
      setDrinksList(data.drinks);
    };

    switch (fetchInfo.radioValue) {
    case 'ingredient': {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${fetchInfo.inputValue}`;
      callApi(url);
      break;
    }
    case 'name': {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${fetchInfo.inputValue}`;
      callApi(url);
      break;
    }
    case 'first letter': {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${fetchInfo.inputValue}`;
      callApi(url);
      break;
    }
    default: {
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      callApi(url);
    }
    }
  }, [fetchInfo, history]);
  return (
    <main>
      <Header title="Drinks" isSearchIcon />
      <Filters title="Drinks" setList={ setDrinksList } />
      <Recipes list={ drinksList } recipeType="Drink" />
      <Footer />
    </main>
  );
}
