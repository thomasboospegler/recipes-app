import React from 'react';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';
import '../styles/Footer.css';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer">
      <button
        type="button"
        onClick={ () => history.push('/drinks') }
        className="btn-footer"
      >
        <img
          src={ drinkIcon }
          data-testid="drinks-bottom-btn"
          alt="Icone de bebida"
        />
      </button>
      <button
        type="button"
        onClick={ () => history.push('/meals') }
        className="btn-footer"
      >
        <img
          src={ mealIcon }
          data-testid="meals-bottom-btn"
          alt="Icone de refeições"
        />
      </button>
    </footer>
  );
}

export default Footer;
