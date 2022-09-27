import React, { useEffect, useState } from 'react';
import { shape, string } from 'prop-types';
import RecipeDetails from '../components/RecipeDetails';
import fetchApi from '../services/fetchApi';

export default function Drink({ match }) {
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
      const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const data = await fetchApi(url);
      console.log(data.drinks);
      const { strDrinkThumb, strDrink, strAlcoholic,
        strInstructions } = data.drinks[0];
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
      setRecipeInfo({
        src: strDrinkThumb,
        title: strDrink,
        category: strAlcoholic,
        ingredients: ingredientsList,
        instructions: strInstructions,
        video: '',
      });
    };
    callApi();
  }, [id]);
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
};
