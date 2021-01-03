import React, { useState, useEffect } from 'react';
import { Grid, IconButton, Button, Drawer } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import validateToken from '../../util/auth';

// CSS
import './Nav.css';

// Navigation
import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';

const drawerWidth = 500;

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
    height: 48,
    padding: 12,
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

const Nav = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('token') ? true : false
  );
  const [open, setOpen] = useState(false);

  const classes = useStyles();

  // Event Handlers
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="static">
      <Grid container className={classes.root}>
        <Link to="/">
          <div className={classes.logo}>Logo</div>
        </Link>
        <Grid item className={classes.rightSideNav} xs={2}>
          {!isLoggedIn ? (
            <Grid item className={classes.newUser}>
              <Link to="/login">
                <Button className={classes.rightButton}>Login</Button>
              </Link>
              <Link to="/register">
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
        <Button>Profile</Button>
        <Button>Log Out</Button>
      </Drawer>
    </AppBar>
  );
};

export default Nav;
