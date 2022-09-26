import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import { fetchResponseIngredient, fetchResponseName,
  fetchResponseFirstLetter } from './mocks/fetchDrinksResponse';
import App from '../App';

describe('Test the Drinks Page', () => {
  afterEach(() => jest.clearAllMocks());
  const path = '/drinks';

  it('tests the Drinks page with ingredient search', async () => {
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

  it('tests the drinks page with name search', async () => {
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
      expect(history.location.pathname).toBe('/drinks/12768');
    });
  });

  it('tests the drinks page with first letter search', async () => {
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

  it('tests the drinks page with no results on search', async () => {
    const initialState = {
      searchInfo: {
        radioValue: 'name',
        inputValue: 'aaaa',
      },
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue([]),
    });
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const card = screen.queryByTestId('0-recipe-card');
      expect(card).not.toBeInTheDocument();
    });
  });
});
