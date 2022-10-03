import React, { useEffect, useState } from 'react';
import { bool, shape, string } from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import InProgressRecipe from './RecipeInProgress';
import fetchApi from '../services/fetchApi';

export default function Meal({ match, isInProgress }) {
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
    const maxlength = 20;
    const callApi = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await fetchApi(url);
      const { strMealThumb, strMeal, strCategory,
        strInstructions, strYoutube, strArea } = data.meals[0];
      const ingredientKeys = [];
      const measureKeys = [];
      for (let index = 1; index <= maxlength; index += 1) {
        ingredientKeys.push(`strIngredient${index}`);
        measureKeys.push(`strMeasure${index}`);
      }
      const ingredientsList = ingredientKeys
        .filter((key) => data.meals[0][key] !== '')
        .map((ingredientKey, index) => {
          const measureKey = measureKeys[index];
          const measure = data.meals[0][measureKey];
          const ingredient = data.meals[0][ingredientKey];
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
      const mealsKey = isProggresListValid
        ? Object.keys(getInProgressRecipes).some((key) => key === 'meals') : false;
      const keysInProgressList = isProggresListValid && isProgressKeysValid && mealsKey
        ? Object.keys(getInProgressRecipes.meals) : false;
      const isRecipeInProgress = keysInProgressList.length > 0 ? keysInProgressList
        .some((recipeID) => +recipeID === +id) : false;
      setRecipeInfo({
        src: strMealThumb,
        title: strMeal,
        category: strCategory,
        ingredients: ingredientsList,
        instructions: strInstructions,
        video: strYoutube,
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
      <InProgressRecipe recipe={ recipeInfo } recipeType="Meal" />
    );
  }

  return (
    <div>
      <RecipeDetails recipe={ recipeInfo } recipeType="Meal" />
    </div>
  );
}

Meal.propTypes = {
  match: shape({
    params: shape({
      id: string,
    }),
  }).isRequired,
  isInProgress: bool.isRequired,
};
