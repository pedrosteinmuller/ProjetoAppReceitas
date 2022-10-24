// import React from 'react';
// import { render, screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import Login from '../page/Login';

// const passwordText = 'password-input';
// const emailText = 'email-input';

// describe('Testa tela de Login', () => {
//   test('Possui um input para email', () => {
//     render(<Login />);
//     const emailInput = screen.getByTestId('email-input');
//     expect(emailInput).toBeInTheDocument();
//   });

//   test('Possui um input para senha', () => {
//     render(<Login />);
//     const passwordInput = screen.getByTestId('password-input');
//     expect(passwordInput).toBeInTheDocument();
//   });

//   test('Possui um botão', () => {
//     render(<Login />);
//     const button = screen.getByText('Enter');
//     expect(button).toBeInTheDocument();
//   });

//   test('Se o botao ativa ao preencher os inputs corretamente', () => {
//     render(<Login />);
//     const emailInput = screen.getByTestId(emailText);
//     const passwordInput = screen.getByTestId(passwordText);
//     const button = screen.getByText('Enter');
//     userEvent.type(emailInput, 'email@provider.com');
//     userEvent.type(passwordInput, '123456');
//     expect(button).toBeEnabled();
//   });
// });
