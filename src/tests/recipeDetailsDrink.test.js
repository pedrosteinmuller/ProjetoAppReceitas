import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';

// const localStorageData = [{
//   id: 53065,
//   type: 'meal',
//   nationality: 'Japanese',
//   category: 'Seafood',
//   alcoholicOrNot: '',
//   name: 'Sushi',
//   image: 'https://www.themealdb.com/images/media/meals/g046bb1663960946.jpg',
// }, {
//   id: 52977,
//   type: 'meal',
//   nationality: 'Turkish',
//   category: 'Side',
//   alcoholicOrNot: '',
//   name: 'Corba',
//   image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
// },
// ];

beforeEach(() => {
  global.fetch = jest.fn(async () => Promise.resolve({
    json: async () => Promise.resolve(drinks),
  }));
  navigator.clipboard = {
    writeText: jest.fn(),
  };
//   localStorage.setItem('favoriteRecipes', JSON
//     .stringify(localStorageData));
});

afterEach(() => {
  localStorage.clear();
});

describe('Testa o componente RecipesDetailsDrinks', () => {
  test('Se o componente renderiza na tela', async () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const btnGG = await screen.findByRole('img', { name: /gg/i });
    expect(btnGG).toBeInTheDocument();

    userEvent.click(btnGG);

    const whiteHeart = screen.getByAltText('whiteHeartIcon');
    expect(whiteHeart).toBeInTheDocument();

    userEvent.click(whiteHeart);
    const blackHeart = screen.getByAltText(/blackHeartIcon/i);
    expect(blackHeart).toBeInTheDocument();

    userEvent.click(blackHeart);
    expect(whiteHeart).toBeInTheDocument();

    const copyBtn = screen.getByTestId('share-btn');
    expect(copyBtn).toBeInTheDocument();
    userEvent.click(copyBtn);

    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);

    const btnStart = screen.getByRole('button', { name: /continue/i });
    userEvent.click(btnStart);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks/15997/in-progress');
  });
});
