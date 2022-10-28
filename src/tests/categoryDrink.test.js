import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import drinkCategories from '../../cypress/mocks/drinkCategories';

global.alert = jest.fn();
beforeEach(() => {
  global.fetch = jest.fn(async () => Promise.resolve({
    json: async () => Promise.resolve(drinkCategories),
  }));
});

describe('Testa tela os filtros de categoria da página meals', () => {
  test('verifica se ao clicar nos filtros os elementos certos renderizam', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });

    const btnCategory = await screen.findByRole('button', { name: /ordinary drink/i });
    userEvent.click(btnCategory);
    const header = screen.getByRole('heading', { name: /recipes app/i });

    expect(header).toBeInTheDocument();
  });
});
