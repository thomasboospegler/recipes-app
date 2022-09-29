import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';
import { fetchResponseIngredient } from './mocks/fetchMealsResponse';

describe('Test the DetailsRecipe Page', () => {
  afterEach(() => jest.clearAllMocks());
  const FAVORITE_BTN = 'favorite-btn';
  const START_RECIPE_BTN = 'start-recipe-btn';

  it('tests the meals DetailsRecipe page', async () => {
    const path = '/meals/52771';
    const initialState = {
      searchInfo: {
        radioValue: '',
        inputValue: '',
      },
    };
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const card = screen.getByTestId('recipe-photo');
      const title = screen.getByTestId('recipe-title');
      const share = screen.getByTestId('share-btn');
      const favorite = screen.getByTestId(FAVORITE_BTN);
      const category = screen.getByTestId('recipe-category');
      const instructions = screen.getByTestId('instructions');
      const video = screen.getByTestId('video');
      const ingredients = screen.getByTestId('0-ingredient-name-and-measure');
      const start = screen.getByTestId(START_RECIPE_BTN);

      expect(card).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(share).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
      expect(category).toBeInTheDocument();
      expect(instructions).toBeInTheDocument();
      expect(video).toBeInTheDocument();
      expect(ingredients).toBeInTheDocument();
      expect(start).toBeInTheDocument();
      expect(start).toHaveTextContent('Start Recipe');

      userEvent.click(favorite);
      userEvent.click(favorite);
      userEvent.click(start);
    });
  });

  it('tests the drinks DetailsRecipe page', async () => {
    const path = '/drinks/17222';
    const initialState = {
      searchInfo: {
        radioValue: '',
        inputValue: '',
      },
    };
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const card = screen.getByTestId('recipe-photo');
      const title = screen.getByTestId('recipe-title');
      const share = screen.getByTestId('share-btn');
      const favorite = screen.getByTestId(FAVORITE_BTN);
      const category = screen.getByTestId('recipe-category');
      const instructions = screen.getByTestId('instructions');
      const ingredients = screen.getByTestId('0-ingredient-name-and-measure');
      const start = screen.getByTestId(START_RECIPE_BTN);

      expect(card).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(share).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
      expect(category).toBeInTheDocument();
      expect(instructions).toBeInTheDocument();
      expect(ingredients).toBeInTheDocument();
      expect(start).toBeInTheDocument();
    });
  });

  it('tests the meals DetailsRecipe page with favorites meals in localStorage', async () => {
    const path = '/meals/52771';
    const initialState = {
      searchInfo: {
        radioValue: '',
        inputValue: '',
      },
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      {
        id: '52771',
        type: '',
        nationality: '',
        category: '',
        alcoholicOrNot: '',
        name: '',
        image: '',
      },
    ]));
    localStorage.setItem('doneRecipes', JSON.stringify([
      {
        id: '52771',
        type: '',
        nationality: '',
        category: '',
        alcoholicOrNot: '',
        name: '',
        image: '',
      },
    ]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        52771: {},
      },
    }));
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const favorite = screen.getByTestId(FAVORITE_BTN);
      const share = screen.getByTestId('share-btn');
      const start = screen.getByTestId(START_RECIPE_BTN);

      expect(favorite).toBeInTheDocument();
      expect(share).toBeInTheDocument();
      expect(start).toBeInTheDocument();
      expect(start).toHaveTextContent('Start Recipe');

      userEvent.click(favorite);
      userEvent.click(favorite);
      userEvent.click(share);
    });

    await waitFor(() => {
      const linkTest = screen.getByText(/link/i);
      expect(linkTest).toBeInTheDocument();
    });
  });

  it('tests the recomended card of the drinks DetailsRecipe', async () => {
    const path = '/drinks/17222';
    const initialState = {
      searchInfo: {
        radioValue: '',
        inputValue: '',
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        52771: {},
      },
    }));
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchResponseIngredient),
    });
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const recomended = screen.getByTestId('1-recommendation-title');
      expect(recomended).toBeInTheDocument();

      const recomendedCard = screen.getByTestId('1-recommendation-card');
      expect(recomendedCard).toBeInTheDocument();
    });
  });

  it('tests the recomended card of the meals DetailsRecipe', async () => {
    const path = '/meals/53049';
    const initialState = {
      searchInfo: {
        radioValue: '',
        inputValue: '',
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        53049: {},
      },
    }));
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchResponseIngredient),
    });
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const recomended = screen.getByTestId('0-recommendation-title');
      expect(recomended).toBeInTheDocument();

      const recomendedCard = screen.getByTestId('0-recommendation-card');
      expect(recomendedCard).toBeInTheDocument();
    });
  });
});
