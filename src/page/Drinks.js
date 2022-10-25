import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Drinks() {
  return (
    <div>
      <Header verifyPage={ false } />
      <h1 data-testid="page-title">Drinks</h1>
      <Footer />
    </div>
  );
}

export default Drinks;
