import React, { useEffect, useState } from 'react';
import { bool, shape, string } from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import InProgressRecipe from './RecipeInProgress';
import fetchApi from '../services/fetchApi';

export default function Drink({ match, isInProgress }) {
  const { params } = match;
  const { id } = params;
  const [recipeInfo, setRecipeInfo] = useState({
    src: '',
    title: '',
    category: '',
    ingredients: [],
    instructions: '',
    video: '',
    id: '',
    isRecipeDone: false,
    isRecipeInProgress: false,
    area: '',
  });

  useEffect(() => {
    const callApi = async () => {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await fetchApi(url);
      const { strDrinkThumb, strDrink, strAlcoholic,
        strInstructions, strArea, strCategory } = data.drinks[0];
      const maxlength = 20;
      const ingredientKeys = [];
      const measureKeys = [];
      for (let index = 1; index <= maxlength; index += 1) {
        ingredientKeys.push(`strIngredient${index}`);
        measureKeys.push(`strMeasure${index}`);
      }
      const ingredientsList = ingredientKeys
        .filter((key) => data.drinks[0][key] !== null
          && data.drinks[0][key] !== undefined)
        .map((ingredientKey, index) => {
          const measureKey = measureKeys[index];
          const measure = data.drinks[0][measureKey];
          const ingredient = data.drinks[0][ingredientKey];
          return `${measure} - ${ingredient}`;
        });
      const getDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
      const isRecipeDone = getDoneRecipes ? getDoneRecipes
        .some((recipe) => +recipe.id === +id) : false;
      const getInProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const isProggresListValid = getInProgressRecipes !== null
        && getInProgressRecipes !== undefined;
      const isProgressKeysValid = isProggresListValid
        ? Object.keys(getInProgressRecipes).length > 0 : false;
      const drinksKey = isProggresListValid
        ? Object.keys(getInProgressRecipes).some((key) => key === 'drinks') : false;
      const keysInProgressList = isProggresListValid && isProgressKeysValid && drinksKey
        ? Object.keys(getInProgressRecipes.drinks) : false;
      const isRecipeInProgress = keysInProgressList.length > 0 ? keysInProgressList
        .some((recipeID) => +recipeID === +id) : false;
      setRecipeInfo({
        src: strDrinkThumb,
        title: strDrink,
        category: strCategory,
        strAlcoholic,
        ingredients: ingredientsList,
        instructions: strInstructions,
        video: '',
        isRecipeDone,
        isRecipeInProgress,
        id,
        area: strArea,
      });
    };
    callApi();
  }, [id]);

  if (isInProgress) {
    return (
      <InProgressRecipe recipe={ recipeInfo } recipeType="Drink" />
    );
  }

  return (
    <div>
      <RecipeDetails recipe={ recipeInfo } recipeType="Drink" />
    </div>
  );
}

Drink.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
  isInProgress: bool.isRequired,
};
