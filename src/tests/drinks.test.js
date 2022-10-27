import React from 'react';
import { screen, act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import drinks from '../../cypress/mocks/drinks';
import CardRecipes from '../components/CardRecipes';

global.alert = jest.fn();

describe('Testa o componente CardMeals', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => Promise.resolve({
      json: async () => Promise.resolve(drinks),
    }));
  });
  test('Se renderiza os cards na tela', async () => {
    await act(async () => renderWithRouter(<App />, { initialEntries: ['/drinks'] }));
    const card = await screen.findAllByTestId(/-card-img/i);
    expect(card.length).toBe(12);
  });
  test('Testando o componente Card', () => {
    render(<CardRecipes img="img" tag="nome" index="1" />);

    expect(screen.getByText('nome')).toBeInTheDocument();
  });
  test('Se o alert aparece na tela ao procurar receita indefinida', () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const iconSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(iconSearch);
    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);

    expect(global.alert).toHaveBeenCalled();
  });
  test('testa a pagina de drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const iconSearch = await screen.findByRole('img', { name: /search/i });
    userEvent.click(iconSearch);

    const radioFirst = screen.getByText(/first letter/i);
    userEvent.click(radioFirst);

    const inputText = screen.findByRole('textbox');
    userEvent.type(inputText, 'g');

    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);

    const drink = screen.findByText('gg');

    expect(drink).toBeInTheDocument();
  });
});
