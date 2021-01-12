import React from 'react';
import { connect } from 'react-redux';

const Profile = ({ user }) => {
  // User Data Display
  const userDisplay = (
    <div>
      <span>email:</span>
      <span>{user.email}</span>
    </div>
  );
  // Genres
  // Watch List
  // Favorites List
  // Watch Later

  return <section>{userDisplay}</section>;
};

const mapStateToProps = state => {
  return {
    user: state.user,
    movies: state.movies,
    genres: state.genres,
  };
};

export default connect(mapStateToProps, {})(Profile);
