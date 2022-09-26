import React, { useState } from 'react';
import { string, bool } from 'prop-types';
import { useHistory } from 'react-router-dom';

function Header(props) {
  const { title, isSearchIcon } = props;
  const history = useHistory();
  const [isSearchActive, setIsSearchActive] = useState(false);

  return (
    <header>
      <div>
        <img src="../images/icone.svg" alt="Logo" />
        <img src="../images/icone2.svg" alt="Logo2" />
        { isSearchIcon && (
          <button type="button" onClick={ () => setIsSearchActive(!isSearchActive) }>
            <img
              data-testid="search-top-btn"
              src="../images/searchIcon.svg"
              alt="Search Icon"
            />
          </button>
        )}
        <button type="button" onClick={ () => history.push('/profile') }>
          <img
            data-testid="profile-top-btn"
            src="../images/profileIcon.svg"
            alt="Profile Icon"
          />
        </button>
      </div>
      <div>
        <h1 data-testid="page-title">{title}</h1>
      </div>
      { isSearchActive && (
        <div>
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
