import React, { useState } from 'react';
import UserContext from '../../UserContext';
import { validateToken } from '../../util/auth';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    isLoggedIn: false,
    token: undefined,
  });

  const login = async ({ data, token }) => {
    try {
      const valid = token && validateToken(token);
      const decoded = await valid;

      setUser({
        email: decoded.data.token.email,
        isLoggedIn: true,
        token: token,
      });
    } catch (error) {
      console.error(error);
      logout();
    }
  };

  const logout = () =>
    setUser({
      email: '',
      isLoggedIn: false,
      token: undefined,
    });

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
