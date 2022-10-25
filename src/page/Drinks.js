import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <div>
      <Header verifyPage={ false } />
      <h1 data-testid="page-title">Drinks</h1>
      <SearchBar />
    </div>
  );
}

export default Drinks;
