import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';

global.alert = jest.fn();

describe('Testa tela o Alert', () => {
  beforeEach(() => {
    global.fetch = jest.fn(async () => Promise.resolve({
      json: async () => Promise.resolve(oneMeal),
    }));
  });
  test('Possui um input para email', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const iconSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(iconSearch);
    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);

    expect(global.alert).toHaveBeenCalled();
  });

  test('Muda de rota quando tem apenas um card como retorno', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const iconSearch = screen.getByRole('img', { name: /search/i });
    userEvent.click(iconSearch);
    const name = screen.getByText(/name/i);
    userEvent.click(name);
    const inputText = screen.getByRole('textbox');
    userEvent.type(inputText, 'Spicy Arrabiata Penne');
    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);

    const card = await screen.findByRole('img', { name: /Spicy Arrabiata Penne/i });

    expect(card).toBeInTheDocument();
  });
});
