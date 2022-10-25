import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Meals() {
  return (
    <div>
      <Header verifyPage={ false } />
      <h1 data-testid="page-title">Meals</h1>
      <Footer />
    </div>
  );
}

export default Meals;
