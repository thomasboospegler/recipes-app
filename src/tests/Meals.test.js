import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { fetchResponseIngredient, fetchResponseName,
  fetchResponseFirstLetter } from './mocks/fetchMealsResponse';
import App from '../App';

describe('Test the Meals Page', () => {
  afterEach(() => jest.clearAllMocks());
  const path = '/meals';

  it('tests the meals page with ingredient search', async () => {
    const initialState = {
      searchInfo: {
        radioValue: 'ingredient',
        inputValue: 'milk',
      },
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchResponseIngredient),
    });
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const card = screen.getByTestId('1-recipe-card');
      expect(card).toBeInTheDocument();
    });
  });

  it('tests the meals page with name search', async () => {
    const initialState = {
      searchInfo: {
        radioValue: 'name',
        inputValue: 'BeaverTails',
      },
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchResponseName),
    });
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      expect(history.location.pathname).toBe('/meals/52928');
    });
  });

  it('tests the meals page with first letter search', async () => {
    const initialState = {
      searchInfo: {
        radioValue: 'first letter',
        inputValue: 'a',
      },
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchResponseFirstLetter),
    });
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const card = screen.getByTestId('0-recipe-card');
      expect(card).toBeInTheDocument();
    });
  });

  it('testes the filters', async () => {
    const initialState = {
      searchInfo: {
        radioValue: '',
        inputValue: '',
      },
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        meals: [
          {
            strCategory: 'Beef',
          },
          {
            strCategory: 'Breakfast',
          },
          {
            strCategory: 'Chicken',
          },
          {
            strCategory: 'Dessert',
          },
          {
            strCategory: 'Goat',
          },
        ],
      }),
    });
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    const allFiltersButton = screen.getByTestId('All-category-filter');
    expect(allFiltersButton).toBeInTheDocument();

    userEvent.click(allFiltersButton);

    await waitFor(() => {
      const beefFilterButton = screen.getByTestId('Beef-category-filter');
      expect(beefFilterButton).toBeInTheDocument();

      const breakfastFilterButton = screen.getByTestId('Breakfast-category-filter');
      expect(breakfastFilterButton).toBeInTheDocument();

      userEvent.click(beefFilterButton);
    });
  });
});
