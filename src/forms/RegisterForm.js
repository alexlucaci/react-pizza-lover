import React, { Component } from "react";

import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

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

class RegisterForm extends Component {
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
      repeatPassword: "",
      repeatPasswordError: false,
      repeatPasswordErrorText: "",
      fullname: "",
      fullnameError: false,
      fullnameErrorText: ""
    };
    this.validateValues = {
      usernameFormat: /[ !@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      fullnameFormat: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      usernameMaxChars: 20,
      usernameErrorText: "Username can't be more than 20 characters and not containing special characters",
      passwordMaxChars: 40,
      passwordErrorText: "Password can't be more than 40 characters",
      repeatPasswordErrorText: "Passwords doesn't match",
      fullnameMaxChars: 30,
      fullnameErrorText: "Full name can't be more than 30 characters and not containing special characters",
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.validateUsername = this.validateUsername.bind(this);
    this.validatePassword = this.validatePassword.bind(this);
    this.validateRepeatPassword = this.validateRepeatPassword.bind(this);
    this.validateFullName = this.validateFullName.bind(this);
  }


  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0 &&
           !this.state.usernameError && !this.state.passwordError &&
           !this.state.repeatPasswordError && !this.state.fullnameError;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
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

    if ([event.target.id] == 'fullname') {
      if (this.validateFullName(event.target.value)) {
        this.setState({
          fullnameError: true,
          fullnameErrorText: this.validateValues.fullnameErrorText
        });
      } else {
        this.setState({
          fullnameError: false,
          fullnameErrorText: ''
        });
      }
    }

    if ([event.target.id] == "repeatPassword") {
      if (this.validateRepeatPassword(event.target.value)) {
        this.setState({
          repeatPasswordError: true,
          repeatPasswordErrorText: this.validateValues.repeatPasswordErrorText
        });
      } else {
        this.setState({
          repeatPasswordError: false,
          repeatPasswordErrorText: ''
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

  validateFullName(fullname) {
    return (this.validateValues.fullnameFormat.test(fullname) ||
            fullname.length > this.validateValues.fullnameMaxChars)
  }

  validateRepeatPassword(password) {
    return !(this.state.password == password)
  }

  handleSubmit = event => {
    event.preventDefault();
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    fetch(proxyUrl+'http://localhost:5000/api/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fullname: this.state.fullname,
        username: this.state.username,
        password: this.state.password
      })
    }).then(data => {
      return data.json()
    }).then(data => {
      if (data.Registered) {
        localStorage.setItem('token', data.access_token)
        localStorage.setItem('user', this.state.username)
        localStorage.setItem('love_for_pizza_count', data.love_for_pizza_count)
        this.props.history.push('fanclub')
      } else {
        localStorage.setItem('token', '')
        localStorage.setItem('user', '')
        localStorage.setItem('love_for_pizza_count', 0)
        this.setState({
          usernameError: true,
          usernameErrorText: 'Username is already taken!'
        });
      }

    });
  }

  render() {
    return (
        <div className="Forms">
          <form onSubmit={this.handleSubmit}>
            <FormControl className={this.classes.formControl} error={this.state.fullnameError} fullWidth>
              <InputLabel htmlFor="fullname">Full Name</InputLabel>
              <Input
                id="fullname"
                required
                value={this.state.fullname}
                onChange={this.handleChange}
                aria-describedby="fullname-error-text"
              />
              <FormHelperText id="fullname-error-text">
                {this.state.fullnameErrorText}
              </FormHelperText>
            </FormControl>
            <br /><br />
            <FormControl className={this.classes.formControl} error={this.state.usernameError} fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input
                id="username"
                required
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
                required
                type="password"
                value={this.state.password}
                onChange={this.handleChange}
                aria-describedby="password-error-text"
              />
              <FormHelperText id="password-error-text">
                {this.state.passwordErrorText}
              </FormHelperText>
            </FormControl>
            <br /><br />
            <FormControl className={this.classes.formControl} error={this.state.repeatPasswordError} fullWidth>
              <InputLabel htmlFor="repeatPassword">Repeat password</InputLabel>
              <Input
                id="repeatPassword"
                type="password"
                required
                value={this.state.repeatPassword}
                onChange={this.handleChange}
                aria-describedby="repeat-password-error-text"
              />
              <FormHelperText id="repeat-password-error-text">
                {this.state.repeatPasswordErrorText}
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
            Register
            </Button>
          </form>
        </div>
    );
  }
}
export default withStyles(styles)(RegisterForm)
