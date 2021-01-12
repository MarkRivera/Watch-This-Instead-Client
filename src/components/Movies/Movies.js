import React, { useEffect } from 'react';
import { nanoid } from 'nanoid';

// Material UI
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { ButtonGroup, Button } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';

// Material Icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import WatchLaterIcon from '@material-ui/icons/WatchLater';
import BookmarkIcon from '@material-ui/icons/Bookmark';

// Redux
import { connect } from 'react-redux';
import { addUserEmail, fetchUserMovies } from '../../state/actions/actions';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    minHeight: 570,
    backgroundImage:
      'linear-gradient(to right, rgba(14.12%, 26.27%, 37.65%, 1.00) 150px, rgba(14.12%, 26.27%, 37.65%, 0.84) 100%)',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    color: '#fff',
  },
  spinner: {
    padding: 70,
    color: '#fff',
  },
  carousel: {
    width: '100%',
  },
  movieContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    minHeight: '570px',
    padding: '30px 40px',
  },
  visualsContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  poster: {
    borderTopLeftRadius: '5px',
    borderTopRightRadius: '5px',
  },
  stream: {
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0d47a1',
    color: '#fff',
    borderBottomLeftRadius: '5px',
    borderBottomRightRadius: '5px',
  },
  detailsContainer: {
    width: 540,
    paddingLeft: 40,
    paddingTop: 80,
  },
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  movieTitle: {
    paddingRight: 10,
    fontWeight: 'bold',
  },
  movieYear: {
    color: '#cdd4da',
  },
  descriptionContainer: {
    paddingTop: 40,
  },
}));

const Movies = ({ movies, genres, user, fetchUserMovies }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchUserMovies(user.token);
  }, [user, fetchUserMovies]);

  // useEffect(() => {
  //   user.isLoggedIn
  //     ? localStorage.setItem('isLoggedIn', `${user.isLoggedIn}`)
  //     : localStorage.removeItem('isLoggedIn');
  // }, [user.isLoggedIn]);

  // Fetch Movie Posters and add them to Movie Objects in State

  return (
    <main className={classes.container}>
      {movies.isLoading ? (
        <CircularProgress className={classes.spinner} size={500} />
      ) : (
        <Carousel
          indicators={false}
          autoPlay={false}
          animation="slide"
          className={classes.carousel}
        >
          {movies.data.map(movie => (
            <section key={nanoid()} className={classes.movieContainer}>
              <section className={classes.visualsContainer}>
                <img
                  src={
                    movie.posterUrl
                      ? movie.posterUrl
                      : 'https://via.placeholder.com/300x450.png'
                  }
                  alt={`Poster of the ${movie.title} movie`}
                  className={classes.poster}
                />
                <Typography variant="h6" className={classes.stream}>
                  Streaming on Netflix!
                </Typography>
              </section>
              <section className={classes.detailsContainer}>
                <section className={classes.titleContainer}>
                  <Typography variant="h5" className={classes.movieTitle}>
                    {`${movie.title}`}
                  </Typography>
                  <Typography variant="subtitle2" className={classes.movieYear}>
                    ({movie.year})
                  </Typography>
                </section>

                {/* Check to see if user logged in, if so, display user buttons */}

                {user.isLoggedIn && (
                  <ButtonGroup
                    variant="contained"
                    color="primary"
                    aria-label="outlined primary button group"
                    className={classes.buttonContainer}
                  >
                    <Button className={classes.favButton}>
                      <FavoriteIcon />
                    </Button>

                    <Button className={classes.watchedButton}>
                      <WatchLaterIcon />
                    </Button>
                    <Button className={classes.watchListButton}>
                      <BookmarkIcon />
                    </Button>
                  </ButtonGroup>
                )}

                <section className={classes.descriptionContainer}>
                  <Typography variant="h6" className={classes.overview}>
                    Overview
                  </Typography>
                  <Typography variant="body2" className={classes.description}>
                    {movie.description ||
                      "There's no description of this movie available"}
                  </Typography>
                </section>
              </section>
            </section>
          ))}
        </Carousel>
      )}
    </main>
  );
};

const mapStateToProps = state => {
  return {
    movies: state.movies,
    genres: state.genres,
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  addUserEmail,
  fetchUserMovies,
})(Movies);
