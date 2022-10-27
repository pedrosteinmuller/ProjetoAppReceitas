import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import mealCategories from '../../cypress/mocks/mealCategories';

beforeEach(() => {
  global.fetch = jest.fn(async () => Promise.resolve({
    json: async () => Promise.resolve(mealCategories),
  }));
});
describe('Testa o componente Recipes', () => {
  test('Se o componente renderiza na tela', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const btnBeef = await screen.findByRole('button', { name: /beef/i });
    expect(btnBeef).toBeInTheDocument();
  });
});
