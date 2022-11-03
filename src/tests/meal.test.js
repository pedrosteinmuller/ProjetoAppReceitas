import React from 'react';
import { screen, act, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import CardRecipes from '../components/CardRecipes';
import meals from '../../cypress/mocks/meals';

global.alert = jest.fn();

describe('Testa o componente CardMeals', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => Promise.resolve({
      json: async () => Promise.resolve(meals),
    }));
  });
  test('Se renderiza os cards na tela', async () => {
    await act(async () => renderWithRouter(<App />, { initialEntries: ['/meals'] }));
    const card = await screen.findAllByTestId(/-card-img/i);
    expect(card.length).toBe(12);
  });
  test('Testando o componente Card', () => {
    render(<CardRecipes img="img" tag="nome" index="1" />);

    expect(screen.getByText('nome')).toBeInTheDocument();
  });
  test('Se o alert aparece na tela ao procurar receita indefinida', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const iconSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(iconSearch);
    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);

    expect(global.alert).toHaveBeenCalled();
  });
  test('testa a pagina de drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const iconSearch = await screen.findByRole('img', { name: /search/i });
    userEvent.click(iconSearch);

    const radioFirst = screen.getByText(/first letter/i);
    userEvent.click(radioFirst);

    const inputText = screen.findByRole('textbox');
    userEvent.type(inputText, 'g');

    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);

    const meal = screen.findByText('corba');

    expect(meal).toBeInTheDocument();
  });
  test('Card recipes renderiza na pagina drinks', async () => {
    renderWithRouter(<App />, { initialEntries: ['/drinks'] });
    const iconSearch = await screen.findByRole('img', { name: /search/i });
    userEvent.click(iconSearch);
  });
});
