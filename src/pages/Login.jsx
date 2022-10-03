import React, { useState } from 'react';
import { useHistory } from 'react-router';
import '../styles/Login.css';

function Login() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const validateInpiuts = () => {
    const emailRegex = /[^@]+@[^@]+\.[^@]+/gi;
    const MIN_LENGTH = 6;
    const isEmailValid = emailRegex.test(email);
    const isNameValid = password.length > MIN_LENGTH;
    return !(isNameValid && isEmailValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userInfo = {
      email,
    };
    history.push('/meals');
    localStorage.setItem('user', JSON.stringify(userInfo));
    localStorage.setItem('mealsToken', JSON.stringify(1));
    localStorage.setItem('drinksToken', JSON.stringify(1));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    localStorage.setItem('favoriteRecipes', JSON.stringify([
      { id: '53060',
        type: 'meal',
        nationality: 'Croatian',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Burek',
        image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
        tags: ['Bun', 'Baking', 'Treat'],
      },
      { id: '53060',
        type: 'meal',
        nationality: 'Croatian',
        category: 'Side',
        alcoholicOrNot: '',
        name: 'Burek',
        image: 'https://www.themealdb.com/images/media/meals/tkxquw1628771028.jpg',
        tags: ['Bun', 'Baking', 'Treat'],
      },
    ]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({}));
  };

  return (
    <div className="login-page-container">
      <div className="container" />
      <div className="img-container" />
      <form onSubmit={ handleSubmit }>
        <h1>LOGIN</h1>
        <div>
          <input
            type="text"
            className="form-control form-input"
            data-testid="email-input"
            id="email-input"
            placeholder="Nome"
            name="email"
            value={ email }
            onChange={ ({ target }) => setEmail(target.value) }
          />
        </div>
        <div>
          <input
            type="password"
            className="form-control form-input"
            id="password-input"
            data-testid="password-input"
            placeholder="Senha"
            name="password"
            value={ password }
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn-login"
            data-testid="login-submit-btn"
            disabled={ validateInpiuts() }
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
