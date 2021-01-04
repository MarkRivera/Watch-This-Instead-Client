import React, { useState } from 'react';
import GenreInputForm from './GenreInputForm';

import { Redirect } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  genreContainer: {
    textAlign: 'center',
    marginTop: 50,
    padding: 25,
  },
  genreButton: {
    height: 48,
    borderRadius: 0,
    width: '100%',
  },
  selected: {
    borderColor: '#21d07a',
  },
}));

const EmailInputForm = ({
  state,
  classes,
  handleChange,
  userData,
  setState,
}) => {
  const handleClick = () => {
    setState({ ...state, current: 'genres' });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                value={userData.email}
                onChange={handleChange}
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={userData.password}
                onChange={handleChange}
                autoComplete="off"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            Continue
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default function Register() {
  const classes = useStyles();
  const [state, setState] = useState({
    current: 'email',
  });

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [query, setQuery] = useState({
    isLoading: false,
    isError: false,
    isSuccess: false,
    data: [],
  });

  // Event Handlers
  const handleChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  if (state.current === 'email') {
    return (
      <EmailInputForm
        classes={classes}
        setState={setState}
        userData={userData}
        handleChange={handleChange}
        state={state}
      />
    );
  } else if (state.current === 'genres') {
    return (
      <GenreInputForm
        classes={classes}
        setState={setState}
        state={state}
        userData={userData}
        registerQuery={query}
        setRegisterQuery={setQuery}
      />
    );
  } else if (state.current === 'Loading') {
    return <div>Loading data...</div>;
  } else if (state.current === 'Success') {
    return <Redirect to="/login" />;
  } else {
    return <div>Error</div>;
  }
}
