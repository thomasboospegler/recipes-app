import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Profile tests', () => {
  const path = '/profile';
  const initialState = {
    searchInfo: {
      radioValue: '',
      inputValue: '',
    },
  };

  it('Test logout button', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    const LogoutButton = screen.getByTestId('profile-logout-btn');
    expect(LogoutButton).toBeInTheDocument();
    userEvent.click(LogoutButton);
    expect(history.location.pathname).toBe('/');
  });

  it('Test favorite button', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    const FavoriteButton = screen.getByTestId('profile-favorite-btn');
    expect(FavoriteButton).toBeInTheDocument();
    userEvent.click(FavoriteButton);
    expect(history.location.pathname).toBe('/favorite-recipes');
  });

  it('Test done button', () => {
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    const DoneButton = screen.getByTestId('profile-done-btn');
    expect(DoneButton).toBeInTheDocument();
    userEvent.click(DoneButton);
    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Test email', () => {
    const UserEmail = {
      email: 'trybe@test.com',
    };
    localStorage.setItem('user', JSON.stringify(UserEmail));
    const { history } = renderWithRouterAndRedux(<App />, initialState, path);
    const email = screen.getByTestId('profile-email');
    expect(email).toHaveTextContent('trybe@test.com');
    const logout = screen.getByTestId('profile-logout-btn');
    userEvent.click(logout);
    expect(history.location.pathname).toBe('/');
  });
});
