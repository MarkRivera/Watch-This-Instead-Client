import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from '@material-ui/core/styles';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import './App.css';
import Nav from './components/Nav/Nav';
import UserProvider from './components/UserProvider/UserProvider';
import Movies from './components/Movies/Movies';
import Profile from './components/Profile/Profile';

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#0d47a1',
    },
  },
});

theme = responsiveFontSizes(theme);

const App = () => (
  <UserProvider>
    <ThemeProvider theme={theme}>
      <div className="App">
        <CssBaseline />
        <Nav />
        <Switch>
          <Route exact path="/">
            <Movies />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>
    </ThemeProvider>
  </UserProvider>
);

export default App;
