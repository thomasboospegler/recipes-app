import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import fetchApi from '../services/fetchApi';

export default function Meal({ match }) {
  const { params } = match;
  const { id } = params;
  const [recipeInfo, setRecipeInfo] = useState({
    src: '',
    title: '',
    category: '',
    ingredients: [],
    instructions: '',
    video: '',
  });

  useEffect(() => {
    const callApi = async () => {
      const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await fetchApi(url);
      console.log(data.meals);
      const { strMealThumb, strMeal, strCategory,
        strInstructions, strYoutube } = data.meals[0];
      const maxlength = 20;
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
      setRecipeInfo({
        src: strMealThumb,
        title: strMeal,
        category: strCategory,
        ingredients: ingredientsList,
        instructions: strInstructions,
        video: strYoutube,
      });
    };
    callApi();
  }, [id]);
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
};
