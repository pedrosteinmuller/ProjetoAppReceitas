import React from 'react';
import Header from '../components/Header';

function Drinks() {
  return (
    <div>
      <Header verifyPage={ false } />
      <h1 data-testid="page-title">Drinks</h1>
    </div>
  );
}

export default Drinks;
