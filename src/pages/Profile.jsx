import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import done from '../images/done.svg';
import favorite from '../images/favorite.svg';
import logout from '../images/logout.svg';
import '../styles/Profile.css';

function Profile() {
  const [emailStoraged, setEmailStoraged] = useState('');

  useEffect(() => {
    const email = JSON.parse(localStorage.getItem('user'));
    console.log(email);
    setEmailStoraged(email.email);
  }, []);
  const history = useHistory();

  const handleLogout = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div>
      <Header title="Profile" search="false" />
      <section className="profile-container">
        <h4 data-testid="profile-email">{ emailStoraged }</h4>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          <img src={ done } alt="" />
          Done Recipes
        </button>
        <hr />
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          <img src={ favorite } alt="" />
          Favorite Recipes
        </button>
        <hr />
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleLogout }
        >
          <img src={ logout } alt="" />
          Logout
        </button>
      </section>
      <Footer />
    </div>
  );
}
export default Profile;
