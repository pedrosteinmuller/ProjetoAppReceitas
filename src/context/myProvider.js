import React, { useState } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  const [email, setEmaill] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = ({ target }) => {
    setEmaill(target.value)
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value)
  };

  const context = useMemo(() => ({
    handleEmail,
    email,
    handlePassword,
    password,
  }), [email,
    password])

  return (
    <MyContext.Provider value={context}>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };

export default Provider;
