import React, { Component } from "react";

import { withStyles } from '@material-ui/core/styles';
import RegisterForm from '../forms/RegisterForm';
import Navbar from "./Navbar"

import "./app.css";

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

class Register extends Component {
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
    fetch('http://localhost:5000/api/register', {
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
      <div>
        <Navbar location={this.location}/>
        <RegisterForm location={this.props.location} history={this.props.history}/>
      </div>
    );
  }
}
export default withStyles(styles)(Register)
