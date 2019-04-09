import React from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = function (theme) { return {
    button: {
      margin: theme.spacing.unit,
    },
    homeButton: {
      marginLeft: '80%'
    },
    grow: {
    flexGrow: 1,
    },
    navButtons: {
      float: 'none',
      marginLeft: 'auto',
      marginRight: 'auto'
    }
  };
}

const NavBar = (props) => {
  const {classes} = props
  function isFocused(button) {
    return button === props.location ? 'contained':'outlined'
  }
  function isAuth() {
    var token = localStorage.getItem('token')
    if (token) {
      return true
    }
    return false
  }
  function handleLogout() {
    var token = localStorage.getItem('token')
    if (token) {
      localStorage.setItem('token', '')
      localStorage.setItem('user', '')
      fetch('http://localhost:5000/api/logout', {
        method: 'POST',
        headers: {
          Authorization: "Bearer " + token
        }
      }).then(data => {
        return data.json()
      }).then(data => {
        if (data.Logout) {
          props.history.push('/')
        }
      });
    }
    props.history.push('/')
  }
  function returnToolbarButton() {
    if (isAuth()) {
      return <Toolbar>
                <Button variant={isFocused("/")} href="/" color="primary" className={classes.button}>Home</Button>
                <Button variant={isFocused('fanclub')} href='/fanclub' color='primary' className={classes.button}>Pizza FanClub</Button>
                <Typography variant="subtitle1" color="primary" className={classes.grow}>
                  Logged in as {localStorage.getItem('user')}
                </Typography>
                <Button variant="outlined" color='secondary' onClick={handleLogout}className={classes.button}>Logout</Button>
             </Toolbar>
    }
    return <Toolbar>
            <Button variant={isFocused("/")} href="/" color="primary" className={classes.button}>Home</Button>
            <Button variant={isFocused("login")} href ="/login" color="primary" className={classes.button}>Login</Button>
            <Button variant={isFocused("register")} href="/register" color="primary" className={classes.button}>Sign Up</Button>
          </Toolbar>
  }
    return(
        <div>
          <AppBar position="static" color="default">
          {returnToolbarButton()}
          </AppBar>
        </div>
    )
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(NavBar);
