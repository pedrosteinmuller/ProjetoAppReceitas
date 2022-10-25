import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import App from '../App';

beforeEach(() => {
  global.fetch = jest.fn(async () => Promise.resolve({
    json: async () => Promise.resolve(chickenMeals),
  }));
});

describe('Testa o componente search', () => {
  test(' Testa se ao selecionar ingredientes a api é chamada no endpoint correto', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const iconShearch = screen.getByRole('img', { name: /search/i });

    expect(iconShearch).toBeInTheDocument();
    userEvent.click(iconShearch);

    const radioIngredient = screen.getByRole('radio', { name: /ingredient/i });
    userEvent.click(radioIngredient);

    const barSearch = screen.getByRole('textbox');
    userEvent.type(barSearch, 'chicken');

    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);

    expect(fetch).toBeCalledWith('https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken');
  });
});
