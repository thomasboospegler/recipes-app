import React, { useState } from 'react';
import { string, bool } from 'prop-types';
import { useHistory } from 'react-router-dom';
import searchIcon from '../images/IconePesquisar.svg';
import profileIcon from '../images/icone-perfil.svg';
import logo from '../images/icone.svg';
import logo2 from '../images/icone2.svg';
import '../styles/Header.css';

function Header(props) {
  const { title, isSearchIcon } = props;
  const history = useHistory();
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header>
      <div className="header-container">
        <div>
          <img src={ logo } alt="Logo" />
          <img src={ logo2 } alt="Logo2" />
        </div>
        <div>
          { isSearchIcon && (
            <button type="button" onClick={ () => setIsSearchActive(!isSearchActive) }>
              <img
                data-testid="search-top-btn"
                src={ searchIcon }
                alt="Search"
              />
            </button>
          )}
          <button type="button" onClick={ () => history.push('/profile') }>
            <img
              data-testid="profile-top-btn"
              src={ profileIcon }
              alt="Profile"
            />
          </button>
        </div>
      </div>
      <div className="title-container">
        <h1 data-testid="page-title">{title}</h1>
      </div>
      { isSearchActive && (
        <div className="search-container">
          <input
            data-testid="search-input"
            type="text"
            placeholder="Buscar Receita"
          />
        </div>)}
    </header>
  );
}

Header.propTypes = {
  title: string.isRequired,
  isSearchIcon: bool.isRequired,
};

export default Header;
