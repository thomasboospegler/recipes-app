import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('tests the SearchBar component', () => {
  const initialState = {
    searchInfo: {
      radioValue: '',
      inputValue: '',
    },
  };
  const SEARCH_TOP_BTN = 'search-top-btn';
  const SEARCH_INPUT = 'search-input';
  const EXEC_SEARCH_BTN = 'exec-search-btn';

  it('tests the first letter option', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />, initialState);
    history.push('/meals');

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioOption = screen.getByTestId('first-letter-search-radio');
    const buttonSubmit = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(searchInput).toBeInTheDocument();
    expect(radioOption).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();

    userEvent.click(radioOption);
    userEvent.type(searchInput, 'a');
    userEvent.click(buttonSubmit);

    await waitFor(() => {
      const { searchInfo } = store.getState();
      expect(searchInfo.radioValue).toBe('first letter');
      expect(searchInfo.inputValue).toBe('a');
    });
  });

  it('tests the name option', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />, initialState);
    history.push('/meals');

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioOption = screen.getByTestId('name-search-radio');
    const buttonSubmit = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(searchInput).toBeInTheDocument();
    expect(radioOption).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();

    userEvent.click(radioOption);
    userEvent.type(searchInput, 'BeaverTails');
    userEvent.click(buttonSubmit);

    await waitFor(() => {
      const { searchInfo } = store.getState();
      expect(searchInfo.radioValue).toBe('name');
      expect(searchInfo.inputValue).toBe('BeaverTails');
    });
  });

  it('tests the ingredient option', async () => {
    const { history, store } = renderWithRouterAndRedux(<App />, initialState);
    history.push('/meals');

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioOption = screen.getByTestId('ingredient-search-radio');
    const buttonSubmit = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(searchInput).toBeInTheDocument();
    expect(radioOption).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();

    userEvent.click(radioOption);
    userEvent.type(searchInput, 'milk');
    userEvent.click(buttonSubmit);

    await waitFor(() => {
      const { searchInfo } = store.getState();
      expect(searchInfo.radioValue).toBe('ingredient');
      expect(searchInfo.inputValue).toBe('milk');
    });
  });

  it('tests the first letter option', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/meals');

    const searchIcon = screen.getByTestId(SEARCH_TOP_BTN);
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId(SEARCH_INPUT);
    const radioOption = screen.getByTestId('first-letter-search-radio');
    const buttonSubmit = screen.getByTestId(EXEC_SEARCH_BTN);
    expect(searchInput).toBeInTheDocument();
    expect(radioOption).toBeInTheDocument();
    expect(buttonSubmit).toBeInTheDocument();

    userEvent.click(radioOption);
    userEvent.type(searchInput, 'aaa');
    userEvent.click(buttonSubmit);
  });
});
