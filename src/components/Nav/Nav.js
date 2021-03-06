import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

// Material UI
import {
  Grid,
  IconButton,
  Button,
  Drawer,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Link from '@material-ui/core/Link';

// CSS
import './Nav.css';

// Navigation
import AppBar from '@material-ui/core/AppBar';
import { Link as RouterLink } from 'react-router-dom';

// Redux
import { connect } from 'react-redux';
import { logout } from '../../state/actions/actions';

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(13,71,161, .3)',
    color: 'white',
    height: 48,
  },
  rightSideNav: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  rightButton: {
    height: '48px',
    padding: 12,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  newUser: {
    display: 'flex',
  },
  icon: {
    height: 48,
    padding: 12,
  },
  logo: {
    color: '#fff',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const Nav = ({ user, logout }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const history = useHistory();

  // Event Handlers
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    handleDrawerClose();
    logout();
    history.push('/login');
  };

  return (
    <AppBar position="static">
      <Grid container className={classes.root}>
        <Link component={RouterLink} to="/">
          <Typography variant="h6" className={classes.logo}>
            WT
          </Typography>
        </Link>
        <Grid item className={classes.rightSideNav} xs={2}>
          {!user.isLoggedIn ? (
            <Grid item className={classes.newUser}>
              <Link component={RouterLink} to="/login">
                <Button className={classes.rightButton}>Login</Button>
              </Link>
              <Link component={RouterLink} to="/register">
                <Button className={classes.rightButton}>Register</Button>
              </Link>
            </Grid>
          ) : (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className={classes.icon}
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Grid>
      </Grid>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Button>
          <Link component={RouterLink} to="/profile">
            Profile
          </Link>
        </Button>
        <Button onClick={handleLogout}>Log Out</Button>
      </Drawer>
    </AppBar>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, {
  logout,
})(Nav);
