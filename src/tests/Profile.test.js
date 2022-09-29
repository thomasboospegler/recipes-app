import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile'
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';

describe('Profile tests', () => {
    it('1-Test logout button', () => {
        const { history } = renderWithRouterAndRedux(<Profile />, undefined, '/profile');
        const LogoutButton = screen.getByTestId('profile-logout-btn');
        expect(LogoutButton).toBeInTheDocument();
        userEvent.click(LogoutButton);
        expect(history.location.pathname).toBe('/');
    });
    it('2- Test favorite button', () => {
        const { history } = renderWithRouterAndRedux(<Profile />, undefined, '/profile');
        const FavoriteButton = screen.getByTestId('profile-favorite-btn');
        expect(FavoriteButton).toBeInTheDocument();
        userEvent.click(FavoriteButton);
        expect(history.location.pathname).toBe('/favorite-recipes');
    });

    it('3- Test done button', () => {
        const { history } = renderWithRouterAndRedux(<Profile />, undefined, '/profile');
        const DoneButton = screen.getByTestId('profile-done-btn');
        expect(DoneButton).toBeInTheDocument();
        userEvent.click(DoneButton);
        expect(history.location.pathname).toBe('/done-recipes');
    });

    it('4- Test email', () => {
        const UserEmail = {
            email: 'trybe@test.com',
        };
        localStorage.setItem('user', JSON.stringify(UserEmail));
        const { history } = renderWithRouterAndRedux(<Profile />, undefined, '/profile');
        const email = screen.getByTestId('profile-email');
        expect(email).toHaveTextContent('trybe@test.com');
        const logout = screen.getByTestId('profile-logout-btn');
        userEvent.click(logout);
        expect(history.location.pathname).toBe('/');
    });
});