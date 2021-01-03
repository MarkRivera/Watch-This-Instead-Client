import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../../UserContext';
import axios from 'axios';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Redirect } from 'react-router';

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
  circular: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const [query, setQuery] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
  });

  const { user, login } = useContext(UserContext);

  useEffect(() => {
    user.isLoggedIn ? setIsLoggedIn(true) : setIsLoggedIn(false);
  }, [user.isLoggedIn]);

  // Event Handlers
  const handleClick = async () => {
    setQuery({
      ...query,
      isLoading: true,
    });

    try {
      const request = await axios.post(
        'https://watch-this-instead.herokuapp.com/api/users/login',
        userData
      );

      setQuery({
        isLoading: false,
        isSuccess: true,
        isError: false,
        data: request.data,
      });
      login(request.data, request.data.token);
    } catch (error) {
      setQuery({
        isLoading: false,
        isSuccess: false,
        isError: true,
        data: error,
      });
    }
  };

  const handleChange = e => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
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
                autoComplete="off"
                onChange={handleChange}
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
                autoComplete="off"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleClick}
          >
            {query.isLoading ? (
              <div className={classes.circular}>
                <CircularProgress color="inherit" size={24} />{' '}
              </div>
            ) : isLoggedIn ? (
              <Redirect to="/" />
            ) : (
              'Log In'
            )}
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Sign up here!
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
