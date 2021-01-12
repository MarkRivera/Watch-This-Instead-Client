import {
  ADD_USER_EMAIL,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  FETCH_MOVIES_START,
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_ERROR,
  LOGOUT_USER,
} from '../actions/actions';

const initialState = {
  user: {
    email: '',
    token: null,
    data: [],
    isLoggedIn: false,
    isLoading: false,
    isSuccess: false,
    error: '',
  },
  movies: {
    isLoading: false,
    isSuccess: false,
    error: '',
    data: [],
  },
  genres: {
    isLoading: false,
    isSuccess: false,
    error: '',
    data: [],
  },
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_USER_EMAIL:
      return { ...state, user: { ...state.user, email: payload } };

    case LOGIN_START:
      return {
        ...state,
        user: { ...state.user, isLoading: true, error: '', token: null },
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        user: {
          ...state.user,
          token: payload.token,
          isLoggedIn: true,
          isLoading: false,
          isSuccess: true,
          error: '',
        },
      };

    case LOGIN_ERROR:
      return {
        ...state,
        user: {
          ...state.user,
          token: null,
          data: [],
          isLoggedIn: false,
          isLoading: false,
          isSuccess: false,
          error: payload,
        },
      };

    case LOGOUT_USER:
      return {
        ...state,
        user: {
          ...state.user,
          token: null,
          data: [],
          isLoggedIn: false,
        },
      };

    case FETCH_MOVIES_START:
      return {
        ...state,
        movies: {
          ...state.movies,
          isLoading: true,
          isSuccess: false,
          error: '',
        },
      };

    case FETCH_MOVIES_SUCCESS:
      return {
        ...state,
        movies: {
          ...state.movies,
          isLoading: false,
          isSuccess: true,
          error: '',
          data: payload,
        },
      };

    case FETCH_MOVIES_ERROR:
      return {
        ...state,
        movies: {
          ...state.movies,
          isLoading: false,
          isSuccess: false,
          error: payload,
          data: [],
        },
      };

    default:
      return state;
  }
};

export default reducer;
