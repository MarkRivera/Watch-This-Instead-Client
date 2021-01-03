import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import './App.css';
import Nav from './components/Nav/Nav';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0d47a1',
    },
    secondary: {
      main: '#0d47a1',
    },
  },
});

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider theme={theme}>
    <div className="App">
      <CssBaseline />
      <Nav />
      <Switch>
        <Route exact path="/"></Route>

        <Route path="/login">
          <Login />
        </Route>

        <Route path="/Register">
          <Register />
        </Route>
      </Switch>
    </div>
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
