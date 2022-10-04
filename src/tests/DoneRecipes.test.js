import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import copy from 'clipboard-copy';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

jest.mock('clipboard-copy');
describe('Test the DoneRecipes Page', () => {
  const path = '/done-recipes';
  it('tests the DoneRecipes', async () => {
    const initialState = {
      user: {
        email: '',
        name: '',
      },
    };
    localStorage.setItem('doneRecipes', JSON.stringify([{
      id: '52977',
      type: 'meal',
      area: 'Italian',
      category: 'Vegetarian',
      alcoholicOrNot: '',
      name: 'Spicy Arrabiata Penne',
      image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
      doneDate: '23/06/2020',
      tags: ['Pasta', 'Curry'],
    }]));
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const card = screen.getByTestId('0-horizontal-top-text');
      const name = screen.getByTestId('0-horizontal-name');
      const image = screen.getByTestId('0-horizontal-image');
      const share = screen.getByTestId('0-horizontal-share-btn');

      expect(card).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(image).toBeInTheDocument();
      expect(share).toBeInTheDocument();

      userEvent.click(share);
      const linkTest = screen.getByText(/link/i);
      expect(linkTest).toBeInTheDocument();
      expect(copy).toBeCalled();
      userEvent.click(image);

      expect(history.location.pathname).toBe('/meals/52977');
    });
  });

  it('tests the DoneRecipes filters', async () => {
    const initialState = {
      user: {
        email: '',
        name: '',
      },
    };
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const all = screen.getByTestId('filter-by-all-btn');
      const food = screen.getByTestId('filter-by-meal-btn');

      expect(all).toBeInTheDocument();
      expect(food).toBeInTheDocument();

      userEvent.click(food);
      userEvent.click(all);
    });
  });

  it('tests the DoneRecipes with localStorage', async () => {
    const initialState = {
      user: {
        email: '',
        name: '',
      },
    };
    localStorage.setItem('doneRecipes', JSON.stringify([{
      id: '178319',
      type: 'drink',
      area: '',
      category: 'Ordinary Drink',
      alcoholicOrNot: 'Alcoholic',
      name: 'Aquamarine',
      image: 'https://www.thecocktaildb.com/images/media/drink/qtvvyq1439905311.jpg',
      doneDate: '23/06/2020',
      tags: ['IBA', 'ContemporaryClassic'],
    }]));
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    expect(history.location.pathname).toBe(path);

    await waitFor(() => {
      const card = screen.getByTestId('0-horizontal-top-text');
      const name = screen.getByTestId('0-horizontal-name');
      const image = screen.getByTestId('0-horizontal-image');
      const drink = screen.getByTestId('filter-by-drink-btn');
      const all = screen.getByTestId('filter-by-all-btn');

      expect(card).toBeInTheDocument();
      expect(name).toBeInTheDocument();
      expect(image).toBeInTheDocument();

      userEvent.click(image);
      userEvent.click(drink);
      userEvent.click(all);

      expect(history.location.pathname).toBe('/drinks/178319');
    });
  });
});
