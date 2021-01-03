import { createContext } from 'react';
const UserContext = createContext({
  email: '',
  isLoggedIn: false,
  token: undefined,
});

export default UserContext;
