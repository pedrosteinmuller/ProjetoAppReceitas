import PropTypes from 'prop-types';
import React, { useState, useMemo } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  const [email, setEmaill] = useState('');
  const [password, setPassword] = useState('');
  const [search, setSearch] = useState('');

  const handleEmail = ({ target }) => {
    setEmaill(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const handleSearch = ({ target: { value } }) => setSearch(value);

  const context = useMemo(() => ({
    handleEmail,
    handleSearch,
    search,
    email,
    setSearch,
    handlePassword,
    password,
  }), [email, password, search]);

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
