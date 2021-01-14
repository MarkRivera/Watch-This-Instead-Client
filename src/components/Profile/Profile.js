import React from 'react';
import { connect } from 'react-redux';
import { nanoid } from 'nanoid';

// Material UI:
import { Grid, Typography } from '@material-ui/core';

const userSectionTemplate = (user, title, listTitle, listName) => {
  return user[listTitle].length ? (
    <Grid container item xs={12} key={nanoid()}>
      <Typography variant="h2" component="h2">
        {title}
      </Typography>
      <Grid container item key={nanoid()}>
        {user[listTitle].map(({ movieId }) => {
          return (
            <Grid container item key={nanoid()}>
              {movieId}
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  ) : (
    <Grid container item xs={12} key={nanoid()}>
      <Typography variant="h2" component="h2">
        {title}
      </Typography>
      <Grid
        container
        item
      >{`You currently have 0 movies in your ${listName} list`}</Grid>
    </Grid>
  );
};

const Profile = ({ user }) => {
  // User Data Display
  const userDisplay = (
    <>
      <Grid container item xs={12} sm={1}>
        Email:
      </Grid>
      <Grid container item xs={12} sm={11}>
        {user.email}
      </Grid>
    </>
  );

  // Genres
  const genres = (
    <>
      <Grid container item xs={12}>
        <Typography variant="h2" component="h2">
          Genres
        </Typography>
        <Grid container item>
          {user.genres.map(({ id, genre, totalNumberOfUsers }) => (
            <Grid container item xs={12} sm={4} key={nanoid()} data-id={id}>
              {' '}
              {genre}{' '}
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );

  // Favorites List
  const favorites = userSectionTemplate(
    user,
    'Favorite Movies',
    'favorites',
    'Favorite Movies'
  );

  // Watch List
  const watchlist = userSectionTemplate(
    user,
    'Watch List',
    'watchlist',
    'Watch List'
  );

  // Watched Movies
  const watched = userSectionTemplate(
    user,
    'Watched Movies List',
    'watched',
    'Watched Movies List'
  );

  const components = [userDisplay, genres, favorites, watchlist, watched];
  return (
    <Grid container direction="row" key={nanoid()}>
      <Grid container item xs={12} key={nanoid()}>
        <Typography variant="h1" component="h1">
          Your Profile
        </Typography>
      </Grid>
      {components}
    </Grid>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies,
    genres: state.user.genres,
  };
};

export default connect(mapStateToProps, {})(Profile);
