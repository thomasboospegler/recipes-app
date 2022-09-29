import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const [emailStoraged, setEmailStoraged] = useState('');

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user'));
    setEmailStoraged(email.email);
  }, []);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" profile="true" search="false" />
      <h4 data-testid="profile-email">{ emailStoraged }</h4>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => history.push('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => history.push('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ handleLogout }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}
export default Profile;
