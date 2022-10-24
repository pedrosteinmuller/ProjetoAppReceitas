import React, { useContext } from 'react';
import myContext from '../context/myContext';

function Login() {

  // verifyButton = () => {
  //   const { email, password } = this.state;
  //   const regex = /\S+@\S+\.\S+/;
  //   const verifyEmail = regex.test(email);
  //   const number = 6;
  //   const verifyPassword = password.length >= number;
  //   this.setState({
  //     isButtonDisable: !(verifyEmail && verifyPassword),
  //   });
  // };
  const { email,
    handleEmail,
    password,
    handlePassword,
  } = useContext(myContext);

  return (
    <>
      <div>Login</div>
      <form
        onSubmit={(event) => loginButton(event)}
      >
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
          disabled={isButtonDisable}
        >
          Enter
        </button>
      </form>
    </>
  );
}

export default Login;
