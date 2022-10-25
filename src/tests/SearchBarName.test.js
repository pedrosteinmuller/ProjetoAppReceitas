import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import soupMeals from '../../cypress/mocks/soupMeals';
import App from '../App';

beforeEach(() => {
  global.fetch = jest.fn(async () => Promise.resolve({
    json: async () => Promise.resolve(soupMeals),
  }));
});

describe('Testa o componente search', () => {
  test(' Testa se ao selecionar nome a api é chamada no endpoint correto', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const iconShearch = screen.getByRole('img', { name: /search/i });

    expect(iconShearch).toBeInTheDocument();
    userEvent.click(iconShearch);

    const radioName = screen.getByRole('radio', { name: /Name/i });
    userEvent.click(radioName);

    const barSearch = screen.getByRole('textbox');
    userEvent.type(barSearch, 'soup');

    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);

    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/search.php?s=soup');
  });
});
