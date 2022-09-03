import React, { useState, useEffect } from 'react';
import { AppBar, TextField, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import memoriesLogo from '../images/memories-Logo.png';

import * as actionType from '../../constants/actionTypes';
import useStyles from './styles';

import { IoCreateOutline } from 'react-icons/io5';

const Navbar = ({ showForm, setShowForm}) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));


  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();

  const logout = () => {
    dispatch({ type: actionType.LOGOUT });

    history.push('/auth');

    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);


  const toggleForm = () => {    
    setShowForm(prevShowForm => prevShowForm = !showForm);
  }

  

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <Link to="/" className={classes.brandContainer}>
        <Typography variant='h2' className={classes.logoName} >GameMatch</Typography>
        <img className={classes.image} src={memoriesLogo} alt="icon" height="40px" />
      </Link>
      <Toolbar className={classes.toolbar}>
          
        {user?.result ? (
          <>
            <div className={classes.profile}>
              <Avatar className={classes.purple} alt={user?.result.name} src={user?.result.imageUrl}>{user?.result.name.charAt(0)}</Avatar>
              <Typography className={classes.userName} variant="h6">{user?.result.name}</Typography>
              
              <Button onClick={toggleForm} className={classes.createButton} variant="contained" color="primary" size="medium" startIcon={<IoCreateOutline />}>Options</Button>
              

              <Button variant="contained" className={classes.logout} color="secondary" onClick={logout}>Logout</Button>
            </div>
            
          </>
        ) : (
          <Button component={Link} to="/auth" variant="contained" color="primary">Sign In</Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;