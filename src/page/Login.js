import React, { useCallback, useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import myContext from '../context/myContext';
import '../css/Login.css';
import logo from '../css/logoRecipes.png';

function Login({ history }) {
  const [loginBtnDisabled, setLoginBtnDisabled] = useState(true);

  const { email,
    handleEmail,
    password,
    handlePassword,
  } = useContext(myContext);

  const verifyButton = useCallback(() => {
    const regex = /\S+@\S+\.\S+/;
    const verifyEmail = regex.test(email); // true
    const number = 6;
    const verifyPassword = password.length > number; // true
    setLoginBtnDisabled(!(verifyEmail && verifyPassword));
  }, [email, password.length]);

  useEffect(() => {
    verifyButton();
  }, [email, password, verifyButton]);

  const loginSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('user', JSON.stringify({
      email,
    }));
    history.push('/meals');
  };

  return (
    <section>
      <div className="logoRecipes">
        <img src={ logo } alt="logoRecipes" />
      </div>
      <form className="form-container" onSubmit={ loginSubmit }>
        <div>
          {/* <p>teste_teste@gmail.com</p> */}
          <h1>Login</h1>
          <div>
            <input
              data-testid="email-input"
              placeholder="Email"
              type="email"
              name="email"
              value={ email }
              onChange={ handleEmail }
            />
          </div>
          <div>
            <input
              data-testid="password-input"
              placeholder="Password"
              type="password"
              name="password"
              value={ password }
              onChange={ handlePassword }
            />
          </div>
          <div>
            <button
              data-testid="login-submit-btn"
              type="submit"
              disabled={ loginBtnDisabled }
            >
              Enter
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
