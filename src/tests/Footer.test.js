import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Test the component Footer', () => {
  it('test if the footer exists and contains the correct icons', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');

    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
  });

  it('test if redirect to the drinks list when clicking on the drink icon', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksBtn);
    expect(history.location.pathname).toBe('/drinks');
  });

  it('test if redirect to the meals list when clicking on the meals icon', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/drinks');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsBtn);
    expect(history.location.pathname).toBe('/meals');
  });

  it('test if the footer is displayed on the correct pages', () => {
    const UserEmail = {
      email: 'trybe@test.com',
    };
    localStorage.setItem('user', JSON.stringify(UserEmail));
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals');
    const footerMeals = screen.getByTestId('footer');
    expect(footerMeals).toBeInTheDocument();

    history.push('/drinks');
    const footerDrinks = screen.getByTestId('footer');
    expect(footerDrinks).toBeInTheDocument();

    history.push('/profile');
    const footerProfile = screen.getByTestId('footer');
    expect(footerProfile).toBeInTheDocument();
  });
});
