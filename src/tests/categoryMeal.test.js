import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';

global.alert = jest.fn();
beforeEach(() => {
  global.fetch = jest.fn(async () => Promise.resolve({
    json: async () => Promise.resolve(mealCategories),
  }));
});

describe('Testa tela os filtros de categoria da página meals', () => {
  test('verifica se ao clicar nos filtros os elementos certos renderizam', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const btnCategory = await screen.findByTestId('Beef-category-filter');
    userEvent.click(btnCategory);
    const header = screen.getByRole('heading', { name: /recipes app/i });
    userEvent.click(btnCategory);

    expect(header).toBeInTheDocument();
  });
});
