import React, { useState } from 'react';
import { useHistory } from 'react-router';

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
    console.log(userInfo);
    history.push('/meals');
  };

  return (
    <div>
      <form onSubmit={ handleSubmit }>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Nome"
          name="email"
          value={ email }
          onChange={ ({ target }) => setEmail(target.value) }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Nome"
          name="password"
          value={ password }
          onChange={ ({ target }) => setPassword(target.value) }
        />
        <button
          type="submit"
          data-testid="login-submit-btn"
          disabled={ validateInpiuts() }
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default Login;
