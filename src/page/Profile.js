import React from 'react';
import Header from '../components/Header';

function Profile() {
  return (
    <div>
      <Header verifyPage />
      <h1 data-testid="page-title">Profile</h1>
    </div>
  );
}

export default Profile;
