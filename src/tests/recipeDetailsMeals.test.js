import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import meals from '../../cypress/mocks/meals';

const localStorageData = [{
  id: 52977,
  type: 'meal',
  nationality: 'Turkish',
  category: 'Side',
  alcoholicOrNot: '',
  name: 'Corba',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
}];

beforeEach(() => {
  // global.fetch = jest.fn(async () => Promise.resolve({
  //   json: async () => Promise.resolve(meals),
  // }));
  navigator.clipboard = {
    writeText: jest.fn(),
  };
  localStorage.setItem('favoriteRecipes', JSON
    .stringify(localStorageData));
});

afterEach(() => {
  localStorage.clear();
});

describe('Testa o componente RecipesDetails', () => {
  test('Se o componente renderiza na tela', async () => {
    jest.spyOn(global, 'fetch').mockImplementation(async () => ({
      json: async () => meals,
    }));
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const btnCorba = await screen.findByRole('img', { name: /corba/i });
    expect(btnCorba).toBeInTheDocument();

    userEvent.click(btnCorba);

    const whiteHeart = screen.getByAltText('whiteHeartIcon');
    expect(whiteHeart).toBeInTheDocument();

    userEvent.click(whiteHeart);
    const blackHeart = screen.getByAltText('blackHeartIcon');
    expect(blackHeart).toBeInTheDocument();

    userEvent.click(blackHeart);
    expect(whiteHeart).toBeInTheDocument();

    const copyBtn = screen.getByTestId('share-btn');
    expect(copyBtn).toBeInTheDocument();
    userEvent.click(copyBtn);
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals/52977');

    const btnStart = screen.getByRole('button', { name: /continue/i });
    userEvent.click(btnStart);

    expect(pathname).toBe('/meals/52977');
  });
});
