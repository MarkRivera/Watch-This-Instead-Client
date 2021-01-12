import axios from 'axios';

// LOGIN
export const LOGIN_START = 'LOGIN_START';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

// LOGOUT
export const LOGOUT_USER = 'LOGOUT_USER';

// MOVIES
export const FETCH_MOVIES_START = 'FETCH_MOVIES_START';
export const FETCH_MOVIES_ERROR = 'FETCH_MOVIES_ERROR';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const REMOVE_MOVIES = 'REMOVE_MOVIES';

// USER
export const ADD_USER_EMAIL = 'ADD_USER_EMAIL';
export const REMOVE_USER_EMAIL = 'REMOVE_USER_EMAIL';

export const ADD_GENRES = 'ADD_GENRES';
export const REMOVE_GENRES = 'REMOVE_GENRES';

export function addUserEmail(email) {
  return {
    type: ADD_USER_EMAIL,
    payload: email,
  };
}

export function addUserToken(token) {
  return {
    type: ADD_USER_EMAIL,
    payload: token,
  };
}

export const fetchUserMovies = token => async dispatch => {
  dispatch({ type: FETCH_MOVIES_START });

  const axiosAuth = axios.create({
    headers: {
      authorization: token,
    },
  });

  try {
    const response = await axiosAuth.get(
      'https://watch-this-instead.herokuapp.com/api/movies'
    );
    dispatch({ type: FETCH_MOVIES_SUCCESS, payload: response.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: FETCH_MOVIES_ERROR, payload: error });
  }
};

export function addUserGenres(genres) {
  return {
    type: ADD_USER_EMAIL,
    payload: genres,
  };
}

export const login = credentials => async dispatch => {
  dispatch({ type: LOGIN_START });

  try {
    const request = await axios.post(
      `https://watch-this-instead.herokuapp.com/api/users/login`,
      credentials
    );
    console.log(request);
    // On Success:
    dispatch({ type: LOGIN_SUCCESS, payload: request.data });
  } catch (error) {
    console.error(error);
    dispatch({ type: LOGIN_ERROR, payload: error });
  }
};

export function removeUserEmail() {
  return {
    type: REMOVE_USER_EMAIL,
  };
}

export function removeUserMovies() {
  return {
    type: REMOVE_MOVIES,
  };
}

export function removeUserGenres() {
  return {
    type: REMOVE_GENRES,
  };
}

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT_USER });
};
