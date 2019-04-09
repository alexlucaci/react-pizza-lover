import React, { Component } from "react";

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';

import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';

import "../containers/app.css";

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  input: {
    margin: theme.spacing.unit,
  },
  formControl: {
    margin: theme.spacing.unit,
    maxWidth: 500
  },
});

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.classes = props;
    this.location = this.props.location.pathname.split('/')[1]

    this.state = {
      username: "",
      usernameError: false,
      usernameErrorText: "",
      password: "",
      passwordError: false,
      passwordErrorText: "",
      loginError:""
    };
    this.validateValues = {
      usernameFormat: /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      usernameMaxChars: 20,
      usernameErrorText: "Username can't be more than 20 characters and not containing special characters",
      passwordMaxChars: 40,
      passwordErrorText: "Password can't be more than 40 characters"
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
  }


  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0 &&
           !this.state.usernameError && !this.state.passwordError;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value,
      loginError: ""
    });
    if ([event.target.id] == 'username') {
      if (this.validateUsername(event.target.value)) {
          this.setState({
            usernameError: true,
            usernameErrorText: this.validateValues.usernameErrorText
          });
      } else {
        this.setState({
          usernameError: false,
          usernameErrorText: ''
        });
      }
    }
    if ([event.target.id] == 'password') {
      if (this.validatePassword(event.target.value)) {
          this.setState({
            passwordError: true,
            passwordErrorText: this.validateValues.passwordErrorText
          });
      } else {
        this.setState({
          passwordError: false,
          passwordErrorText: ''
        });
      }
    }
  }

  validateUsername(username) {
    return (this.validateValues.usernameFormat.test(username) ||
            username.length > this.validateValues.usernameMaxChars)
  }

  validatePassword(password) {
    return password.length > this.validateValues.passwordMaxChars
  }

  handleSubmit = event => {
    event.preventDefault();
    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(data => {
      return data.json()
    }).then(data => {
      if (data.LoggedIn) {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', this.state.username)
        localStorage.setItem('love_for_pizza_count', data.love_for_pizza_count)
        this.props.history.push('fanclub')
      } else {
        localStorage.setItem('token', '')
        localStorage.setItem('user', '')
        localStorage.setItem('love_for_pizza_count', 0)
        this.setState({
          loginError: 'Invalid combination of username/password!'
        });
      }

    });
  }

  render() {
    return (
        <div className="Forms">
          <form onSubmit={this.handleSubmit}>
            <FormControl className={this.classes.formControl} error={this.state.usernameError} fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                value={this.state.username}
                onChange={this.handleChange}
                aria-describedby="username-error-text"
              />

              <FormHelperText id="username-error-text">
                {this.state.usernameErrorText}
              </FormHelperText>
            </FormControl>
            <br /><br />
            <FormControl className={this.classes.formControl} error={this.state.passwordError} fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                id="password"
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                aria-describedby="password-error-text"
              />
              <FormHelperText id="password-error-text">
                {this.state.passwordErrorText}
              </FormHelperText>
            </FormControl>
            <br />
            <Button
              block="true"
              variant="contained"
              color="primary"
              bssize="large"
              disabled={!this.validateForm()}
              type="submit"
              fullWidth
            >
            Login
            </Button>
            <Typography
            color="secondary"
            align="center"
            id="login-error">
            {this.state.loginError}
            </Typography>
          </form>
        </div>
    );
  }
}

export default withStyles(styles)(LoginForm)
