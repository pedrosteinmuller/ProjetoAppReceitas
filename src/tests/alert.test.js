import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';
import emptyMeals from '../../cypress/mocks/emptyMeals';

global.alert = jest.fn();
beforeEach(() => {
  global.fetch = jest.fn(async () => Promise.resolve({
    json: async () => Promise.resolve(emptyMeals),
  }));
});

describe('Testa tela o Alert', () => {
  test('renderiza o alert ao receber xablau', async () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const iconSearch = await screen.findByRole('img', { name: /search/i });
    userEvent.click(iconSearch);
    const name = await screen.findByRole('radio', { name: /name/i });
    userEvent.click(name);
    const inputText = await screen.findByRole('textbox');
    userEvent.type(inputText, 'xablau');
    const btnSearch = await screen.findByTestId('exec-search-btn');
    userEvent.click(btnSearch);

    expect(global.alert).toHaveBeenCalled();
  });
});
