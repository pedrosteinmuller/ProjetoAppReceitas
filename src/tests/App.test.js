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

    userEvent.type(emailInput, 'email@provider.com');
    userEvent.type(passwordInput, '1234567');
    expect(button).toBeEnabled();
  });

  test('Se, ao clicar no botão redireciona para o /Comidas', () => {
    const { history } = renderWithRouter(<App />);
    const emailInput = screen.getByTestId(emailText);
    const passwordInput = screen.getByTestId(passwordText);
    const button = screen.getByText('Enter');

    userEvent.type(emailInput, 'email@provider.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(button);

    const { pathname } = history.location;
    expect(pathname).toBe('/meals');
  });
});
