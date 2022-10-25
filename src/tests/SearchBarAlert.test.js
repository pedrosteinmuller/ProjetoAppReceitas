import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWith';
import App from '../App';

global.alert = jest.fn();

describe('Testa o componente search', () => {
  test(' Testa se o alert é chamado ao pesquisar sem digitar na barra', () => {
    renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const iconShearch = screen.getByRole('img', { name: /search/i });

    expect(iconShearch).toBeInTheDocument();
    userEvent.click(iconShearch);

    const btnSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(btnSearch);

    expect(global.alert).toHaveBeenCalledTimes(1);
  });
  test('Testa se o path name contem meals', () => {
    const { history } = renderWithRouter(<App />, { initialEntries: ['/meals'] });
    const { pathname } = history.location;

    expect(pathname).toBe('/meals');
  });
});
