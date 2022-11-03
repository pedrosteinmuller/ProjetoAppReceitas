import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

const favoriteRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
  },
];
beforeEach(() => {
  localStorage.setItem('favoriteRecipes', JSON
    .stringify(favoriteRecipes));
  navigator.clipboard = {
    writeText: jest.fn(),
  };
});

afterEach(() => {
  localStorage.clear();
});

describe('Testa tela os filtros de categoria da página meals', () => {
  test('verifica se ao clicar nos filtros os elementos certos renderizam', async () => {
    renderWithRouter(<App />, { initialEntries: ['/favoriteRecipes'] });

    const blackHeart = await screen.findByAltText('blackHeartIcon');
    expect(blackHeart).toBeInTheDocument();
  });
});
