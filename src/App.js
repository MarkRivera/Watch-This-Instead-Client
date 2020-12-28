import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Login from './components/Login/Login';
import Register from './components/Register/Register';

import './App.css';

import Nav from './components/Nav/Nav';
const queryClient = new QueryClient();

const App = () => (
  <>
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
  </>
);

export default App;
