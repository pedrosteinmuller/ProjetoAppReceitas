import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

describe('Testa o componente Footer', () => {
  test('Possui um titulo Meals', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const title = screen.getByRole('heading', { name: /meals/i });
    expect(title).toBeInTheDocument();
  });
  test('Testa se o botão de Drinks esta na pagina e se ele renderiza a pagina Drinks', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const btnDrink = screen.getByRole('img', { name: /drinkicon/i });
    expect(btnDrink).toBeInTheDocument();
    userEvent.click(btnDrink);
    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
  test('Testa se  o botão que renderiza a tela do Meals está no documento', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const btnMeals = screen.getByRole('img', { name: /mealicon/i });
    expect(btnMeals).toBeInTheDocument();
    userEvent.click(btnMeals);
    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
