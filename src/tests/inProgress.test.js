import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';

beforeEach(() => {
  global.fetch = jest.fn(async () => Promise.resolve({
    json: async () => Promise.resolve(drinks),
  }));
  navigator.clipboard = {
    writeText: jest.fn(),
  };
});

afterEach(() => {
  localStorage.clear();
});

describe('Testa o componente RecipesDetailsDrinks', () => {
  test('Se o componente renderiza na tela', async () => {
    const { debug } = renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const btnGG = await screen.findByRole('img', { name: /gg/i });
    expect(btnGG).toBeInTheDocument();

    userEvent.click(btnGG);
    const btnContinue = screen.getByRole('button', { name: /continue recipe/i });
    expect(btnContinue).toBeInTheDocument();
    userEvent.click(btnContinue);

    const category = await screen.findByText(/ordinary drink/i);
    expect(category).toBeInTheDocument();

    const checkbox = await screen.findByRole('checkbox', { name: /2 1\/2 shots galliano/i });
    userEvent.click(checkbox);
    expect(checkbox).toBeInTheDocument();
    const galliano = await screen.findByText(/2 1\/2 shots galliano/i);
    expect(galliano).toHaveAttribute('style', 'text-decoration: line-through solid rgb(0, 0, 0);');
    debug();

    userEvent.click(galliano);
    expect(galliano).not.toHaveAttribute('style', null);

    const ginger = await screen.findByTestId(/1-ingredient-step/i);
    expect(ginger).not.toHaveAttribute('style', null);

    const copy = screen.getByRole('button', { name: /share/i });
    userEvent.click(copy);
    expect(navigator.clipboard.writeText).toHaveBeenCalledTimes(1);

    const favClick = screen.getByRole('button', { name: /whitehearticon/i });
    userEvent.click(favClick);

    const blackHeartIcon = screen.getByRole('button', { name: /blackhearticon/i });
    expect(blackHeartIcon).toBeInTheDocument();
    userEvent.click(blackHeartIcon);
  });
});
