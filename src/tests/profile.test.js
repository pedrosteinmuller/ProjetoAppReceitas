import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

const email = 'email@email.com';
const password = '1234567';

describe('Testa o componente Profile', () => {
  test('Possui um titulo Pofile', () => {
    const { history } = renderWithRouter(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByTestId('password-input');
    const btnLogin = screen.getByRole('button', { name: /enter/i });

    userEvent.clear(inputEmail);
    userEvent.type(inputEmail, email);
    userEvent.clear(inputPassword);
    userEvent.type(inputPassword, password);

    userEvent.click(btnLogin);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');

    const btnProfile = screen.getByRole('img', { name: /profile/i });
    userEvent.click(btnProfile);
    const titleProfile = screen.getByText('Profile');
    expect(titleProfile).toBeInTheDocument();

    const btnDone = screen.getByRole('button', { name: /done recipes/i });
    userEvent.click(btnDone);
    const titleDone = screen.getByRole('heading', { name: /done recipes/i });
    expect(titleDone).toBeInTheDocument();
  });
  test('testa se o botao favorite renderiza a pagina correta', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const btnFavorite = screen.getByRole('button', { name: /favorite recipes/i });
    userEvent.click(btnFavorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  test('testa se o botao favorite renderiza a pagina correta', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const btnLogout = screen.getByRole('button', { name: /logout/i });
    userEvent.click(btnLogout);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
