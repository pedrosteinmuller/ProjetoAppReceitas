import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

const passwordText = 'password-input';
const emailText = 'email-input';

describe('Testa tela de Login', () => {
  test('Possui um input para email', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  test('Possui um input para senha', () => {
    renderWithRouter(<App />);
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  test('Possui um botão', () => {
    renderWithRouter(<App />);
    const button = screen.getByText('Enter');
    expect(button).toBeInTheDocument();
  });

  test('Se o botao ativa ao preencher os inputs corretamente', () => {
    renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailText);
    const passwordInput = screen.getByTestId(passwordText);
    const button = screen.getByText('Enter');

    userEvent.type(emailInput, 'email@trybe.com');
    userEvent.type(passwordInput, '1234567');
    expect(button).toBeEnabled();
  });

  test('Se, ao clicar no botão redireciona para o /meals', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailText);
    const passwordInput = screen.getByTestId(passwordText);
    const button = screen.getByText('Enter');

    userEvent.type(emailInput, 'email@trybe.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});

describe('Testa o componente Header', () => {
  test('Verifica o botão Profile', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const profileBtn = screen.getByRole('img', { name: /profile/i });
    userEvent.click(profileBtn);
    const image = screen.getByRole('img', { name: /profile/i });

    const { pathname } = history.location;
    expect(pathname).toBe('/profile');

    expect(image).toBeInTheDocument();
  });
  test('Verifica o botão Search', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });

    const searchBtn = screen.getByTestId('search-top-btn');
    const image = screen.getByRole('img', { name: /profile/i });

    userEvent.click(searchBtn);
    userEvent.type(searchBtn, 'teste');
    expect(image).toBeInTheDocument();

    expect(searchBtn).toBeInTheDocument();
  });
  test('Vefifica a pagina profile', () => {
    renderWithRouter(<App />, { initialEntries: ['/profile'] });
    const profileBtn = screen.getByRole('img', { name: /profile/i });
    userEvent.click(profileBtn);
    expect(profileBtn).toBeInTheDocument();
  });
});
