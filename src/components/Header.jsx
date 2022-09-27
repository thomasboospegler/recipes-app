import React, { useState } from 'react';
import { string, bool } from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/searchIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import logo from '../images/icone.svg';
import logo2 from '../images/icone2.svg';
import '../styles/Header.css';
import SearchBar from './SearchBar';
import mealIcon from '../images/mealIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import profile from '../images/Perfil.svg';
import doneIcon from '../images/DoneIcon.svg';
import favoriteIcon from '../images/favoriteIcon.svg';

function Header(props) {
  const { title, isSearchIcon } = props;
  const history = useHistory();
  const [isSearchActive, setIsSearchActive] = useState(false);

  const getPageIcon = () => {
    switch (title) {
    case 'Meals':
      return mealIcon;
    case 'Drinks':
      return drinkIcon;
    case 'Profile':
      return profile;
    case 'Done Recipes':
      return doneIcon;
    default:
      return favoriteIcon;
    }
  };

  return (
    <header>
      <div className="header-container">
        <div>
          <img src={ logo } alt="Logo" />
          <img src={ logo2 } alt="Logo2" />
        </div>
        <div>
          { isSearchIcon && (
            <button
              className="button-header"
              type="button"
              onClick={ () => setIsSearchActive(!isSearchActive) }
            >
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Search"
              />
            </button>
          )}
          <button
            className="button-header"
            type="button"
            onClick={ () => history.push('/profile') }
          >
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile"
            />
          </button>
        </div>
      </div>
      <div className="title-container">
        <img
          className="page-icon"
          src={ getPageIcon() }
          data-testid={ `page-icon-${title}` }
          alt="Page Icon"
        />
        <h1 data-testid="page-title">{title}</h1>
      </div>
      { isSearchActive && <SearchBar /> }
    </header>
  );
}

Header.propTypes = {
  title: string.isRequired,
  isSearchIcon: bool.isRequired,
};

export default Header;
