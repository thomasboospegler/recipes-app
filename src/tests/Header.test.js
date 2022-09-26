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
});
