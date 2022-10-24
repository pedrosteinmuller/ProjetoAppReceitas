import React, { useState } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  const [email, setEmaill] = useState('');

  return (
    <MyContext.Provider value={ email }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = { children: PropTypes.node.isRequired };

export default Provider;
