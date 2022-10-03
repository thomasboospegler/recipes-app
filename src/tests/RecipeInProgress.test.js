import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

jest.mock('clipboard-copy');
describe('Test the InProgressRecipe Page', () => {
  afterEach(() => jest.clearAllMocks());
  const FAVORITE_BTN = 'favorite-btn';
  const FINISH_RECIPE_BTN = 'finish-recipe-btn';

  it('tests the meals InProgressPage page', async () => {
    const path = '/meals/52771/in-progress';
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
      const ingredients = screen.getByTestId('0-ingredient-step');
      const finish = screen.getByTestId(FINISH_RECIPE_BTN);
      const checkbox = screen.getAllByRole('checkbox')[0];

      expect(card).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(share).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
      expect(category).toBeInTheDocument();
      expect(instructions).toBeInTheDocument();
      expect(video).toBeInTheDocument();
      expect(ingredients).toBeInTheDocument();
      expect(finish).toBeInTheDocument();
      expect(checkbox).toBeInTheDocument();
      expect(finish).toBeDisabled();

      userEvent.click(favorite);
      userEvent.click(favorite);
      userEvent.click(checkbox);
    });
  });

  it('tests the drinks InProgressPage page', async () => {
    const path = '/drinks/17222/in-progress';
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
      const ingredients = screen.getByTestId('0-ingredient-step');
      const finish = screen.getByTestId(FINISH_RECIPE_BTN);

      expect(card).toBeInTheDocument();
      expect(title).toBeInTheDocument();
      expect(share).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
      expect(category).toBeInTheDocument();
      expect(instructions).toBeInTheDocument();
      expect(ingredients).toBeInTheDocument();
      expect(finish).toBeInTheDocument();
    });
  });

  it('tests the meals DetailsRecipe page with favorites meals in localStorage', async () => {
    copy.mockImplementation(() => {});
    const path = '/meals/52771/in-progress';
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
        id: '',
        type: '',
        nationality: '',
        category: '',
        alcoholicOrNot: '',
        name: '',
        image: '',
      },
    ]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      meals: {
        52771: [true, true, true, true, true, true, true, true],
      },
    }));
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const favorite = screen.getByTestId(FAVORITE_BTN);
      const share = screen.getByTestId('share-btn');
      const start = screen.getByTestId(FINISH_RECIPE_BTN);
      const checkbox = screen.getAllByRole('checkbox');

      expect(favorite).toBeInTheDocument();
      expect(share).toBeInTheDocument();
      expect(start).toBeInTheDocument();

      userEvent.click(favorite);
      userEvent.click(favorite);
      userEvent.click(share);

      const linkTest = screen.getByText(/link/i);
      expect(linkTest).toBeInTheDocument();

      checkbox.forEach((check) => userEvent.click(check));

      const finish = screen.getByTestId(FINISH_RECIPE_BTN);
      expect(finish).toBeInTheDocument();
      expect(finish).toBeEnabled();
      userEvent.click(finish);
      expect(history.location.pathname).toBe('/done-recipes');
    });
  });

  it('tests the meals inProgressRecipe page with favorites meals in localStorage', async () => {
    copy.mockImplementation(() => {});
    const path = '/drinks/17203/in-progress';
    const initialState = {
      searchInfo: {
        radioValue: '',
        inputValue: '',
      },
    };
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const favorite = screen.getByTestId(FAVORITE_BTN);
      const start = screen.getByTestId(FINISH_RECIPE_BTN);

      expect(favorite).toBeInTheDocument();
      expect(start).toBeInTheDocument();

      userEvent.click(favorite);
      userEvent.click(favorite);
    });
  });
});
