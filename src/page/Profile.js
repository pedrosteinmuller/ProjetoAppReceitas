import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import ProfileComponent from '../components/ProfileComponent';

function Profile() {
  return (
    <div>
      <Header verifyPage />
      <div>
        <header data-testid="page-title">Profile</header>
        <ProfileComponent />
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
