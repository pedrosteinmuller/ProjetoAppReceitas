import React from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Meals() {
  return (
    <div>
      <Header verifyPage={ false } />
      <h1 data-testid="page-title">Meals</h1>
      <SearchBar />
    </div>
  );
}

export default Meals;
