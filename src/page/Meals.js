import React from 'react';
import Header from '../components/Header';

function Meals() {
  return (
    <div>
      <Header verifyPage={ false } />
      <h1 data-testid="page-title">Meals</h1>
    </div>
  );
}

export default Meals;
