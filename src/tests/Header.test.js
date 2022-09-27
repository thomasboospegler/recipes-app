import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Test the component Header', () => {
  it('tests the header buttons and icons', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals');

    const headerTitle = screen.getByTestId('page-title');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(headerTitle).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  it('tests if the profile icon redirect to /profile', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals');

    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });

  it('tests the icons of the pages', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    history.push('/meals');
    const mealsIcon = screen.getByTestId('page-icon-Meals');
    expect(mealsIcon).toBeInTheDocument();

    history.push('/drinks');
    const drinksIcon = screen.getByTestId('page-icon-Drinks');
    expect(drinksIcon).toBeInTheDocument();

    history.push('/profile');
    const profileIcon = screen.getByTestId('page-icon-Profile');
    expect(profileIcon).toBeInTheDocument();

    history.push('/done-recipes');
    const doneRecipesIcon = screen.getByTestId('page-icon-Done Recipes');
    expect(doneRecipesIcon).toBeInTheDocument();

    history.push('/favorite-recipes');
    const favoriteRecipesIcon = screen.getByTestId('page-icon-Favorite Recipes');
    expect(favoriteRecipesIcon).toBeInTheDocument();
  });
});
