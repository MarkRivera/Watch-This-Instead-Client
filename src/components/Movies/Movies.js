import React, { useState, useContext } from 'react';
import UserContext from '../../UserContext';
import { nanoid } from 'nanoid';

// Material UI
import Carousel from 'react-material-ui-carousel';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    height: 570,
    backgroundImage:
      'linear-gradient(to right, rgba(14.12%, 26.27%, 37.65%, 1.00) 150px, rgba(14.12%, 26.27%, 37.65%, 0.84) 100%)',
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  carousel: {
    width: '100%',
  },
  movieContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '570px',
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
  },
}));

const Movies = () => {
  const classes = useStyles();
  const { user } = useContext(UserContext);
  const [movies, setMovies] = useState([
    {
      title: 'Movie 1',
      description: 'You remember this right?',
      year: 1991,
      id: 1,
    },
    { title: 'Movie 2', description: 'Hello, World', year: 1952, id: 2 },
    { title: 'Movie 3', description: 'Woop', year: 2001, id: 3 },
  ]);

  return (
    <main className={classes.container}>
      <Carousel
        indicators={false}
        autoPlay={false}
        animation="slide"
        className={classes.carousel}
      >
        {movies.map(movie => (
          <section key={nanoid()} className={classes.movieContainer}>
            <section className={classes.visualsContainer}>
              <img
                src="https://via.placeholder.com/300x450.png"
                alt={`Poster of the ${movie.title} movie`}
                className={classes.poster}
              />
              <Typography variant="h6" className={classes.stream}>
                Streaming on Netflix!
              </Typography>
            </section>
            <section className={classes.detailsContainer}>
              <section className={classes.titleContainer}>
                <h1 className={classes.movieTitle}>{movie.title}</h1>
                <h1 className={classes.movieYear}>{movie.year}</h1>
              </section>

              <section className={classes.buttonContainer}>
                <button className={classes.favButton}>Fav</button>
                <button className={classes.watchedButton}>Watched</button>
                <button className={classes.watchListButton}>Watch List</button>
              </section>

              <section className={classes.caption}>Caption Text</section>

              <section className={classes.descriptionContainer}>
                <h2 className={classes.overview}>Overview</h2>
                <p className={classes.description}>{movie.description}</p>
              </section>
            </section>
          </section>
        ))}
      </Carousel>
    </main>
  );
};

export default Movies;
