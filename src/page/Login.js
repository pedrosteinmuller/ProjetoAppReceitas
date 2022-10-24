import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from '../context/myContext';

function Login({ history }) {
  const [loginBtnDisabled, setLoginBtnDisabled] = useState(true);

  const { email,
    handleEmail,
    password,
    handlePassword,
  } = useContext(myContext);

  const verifyButton = () => {
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email); // true
    const number = 6;
    const verifyPassword = password.length > number; // true
    setLoginBtnDisabled(!(verifyEmail && verifyPassword));
  };

  useEffect(() => {
    verifyButton();
  }, [email, password]);

  const loginSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({
      email,
    }));
    history.push('/meals');
  };

  return (
    <>
      <p>teste_teste@gmail.com</p>
      <div>Login</div>
      <form onSubmit={loginSubmit}>
        <input
          data-testid="email-input"
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
        <input
          data-testid="password-input"
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
        <button
          data-testid="login-submit-btn"
          type="submit"
          disabled={loginBtnDisabled}
        >
          Enter
        </button>
      </form>
    </>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
