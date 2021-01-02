import React, { useState, useEffect, useCallback, useRef } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { nanoid } from 'nanoid';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
}));

const GenreInputForm = ({ classes, setState }) => {
  const [selectedGenres, setSelectedGenres] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [query, setQuery] = useState({
    isLoading: false,
    isSuccess: false,
    isError: false,
    data: [],
  });
  const [elements, setElements] = useState([]);
  let updated = useRef(selectedGenres);

  // Event Handlers
  const handleClick = item => {
    if (!updated.current[item.genre]) {
      if (Object.keys(updated.current).length === 3) {
        return;
      }
      setSelectedGenres(prev => {
        updated.current = { ...prev, [item.genre]: { ...item } };
        return { ...prev, [item.genre]: { ...item } };
      });
    } else {
      setSelectedGenres(prev => {
        delete prev[item.genre];
        updated.current = { ...prev };
        return { ...prev };
      });
    }
  };

  useEffect(() => {
    Object.keys(selectedGenres).length === 3
      ? setDisabled(false)
      : setDisabled(true);
  }, [selectedGenres]);

  useEffect(() => {
    setQuery({ ...query, isLoading: true });
    axios
      .get('https://watch-this-instead.herokuapp.com/api/genres')
      .then(res => {
        setQuery({
          ...query,
          isLoading: false,
          isSuccess: true,
          data: [...res.data],
        });
      })
      .catch(err =>
        setQuery({ ...query, isLoading: false, isError: true, data: [err] })
      );
  }, []);

  useEffect(() => {
    if (!query.isLoading && query.isError) {
      setElements([]);
    }

    if (!query.isLoading && query.isSuccess) {
      let oldArr = [...query.data];
      var maxVal = 4;
      var delta = Math.floor(oldArr.length / maxVal);

      for (let i = 0; i < oldArr.length; i = i + delta) {
        const items = [];
        for (let j = 0; j < 4; j++) {
          oldArr[i + j] && items.push(oldArr[i + j]);
        }
        const containerItems = items.map(item => {
          return (
            <Grid
              item
              xs={12}
              sm={3}
              key={nanoid()}
              onClick={() => handleClick(item)}
            >
              <Button
                color="primary"
                variant="contained"
                className={classes.genreButton}
              >
                {item.genre}
              </Button>
            </Grid>
          );
        });

        const container = (
          <Grid container spacing={2} key={nanoid()}>
            {containerItems}
          </Grid>
        );
        setElements(prev => {
          return [...prev, container];
        });
      }
    }
  }, [
    query.data,
    query.isLoading,
    query.isSuccess,
    query.isError,
    setSelectedGenres,
  ]);

  return (
    <>
      {query.isLoading ? (
        <div> Loading... </div>
      ) : query.isError ? (
        <div> Hmm... seems like something went wrong </div>
      ) : (
        <>
          <Container
            component="main"
            disableGutters
            maxWidth="xl"
            className={classes.genreContainer}
          >
            {elements.length > 0 && elements}
            <GenreToSendButton
              disabled={disabled}
              setState={setState}
              data={selectedGenres}
            />
          </Container>
        </>
      )}
    </>
  );
};

const GenreToSendButton = ({ disabled, setState, data }) => {
  const handleClick = () => {
    console.log(data);
  };

  return (
    <Button disabled={disabled} onClick={handleClick}>
      Register
    </Button>
  );
};

const EmailInputForm = ({ classes }) => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  // Event Handlers
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
            {/* <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type=""
                id="password"
                autoComplete="current-password"
              />
            </Grid> */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
};

export default function Register() {
  const classes = useStyles();
  const [state, setState] = useState({
    current: 'email',
    states: ['email', 'genres', 'submitted'],
  });

  if (state.current === 'email') {
    return <EmailInputForm classes={classes} setState={setState} />;
  } else if (state.current === 'genres') {
    return <GenreInputForm classes={classes} setState={setState} />;
  } else {
    // Success or Failure
  }
}
