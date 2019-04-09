import React, { Component } from "react";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import pizza from '../images/pizza.png';
import Navbar from "./Navbar"

import "./app.css";

const styles = theme => ({
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  }
});

class FanClub extends Component {
  constructor(props) {
    super(props);
    this.classes = props;
    this.state = {
      token: localStorage.getItem('token'),
      love_for_pizza_count: localStorage.getItem('love_for_pizza_count'),
      username: localStorage.getItem('user')
    }
    this.location = this.props.location.pathname.split('/')[1]
    this.handleChange = this.handleChange.bind(this);
    this.returnLoveForPizzaCount = this.returnLoveForPizzaCount.bind(this)
  }

  returnLoveForPizzaCount() {
    return this.state.love_for_pizza_count
  }

  handleChange = event => {
    event.preventDefault();
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    fetch(proxyUrl+'http://localhost:5000/api/lovespizza', {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: "Bearer " + this.state.token
      },
      body: JSON.stringify({
        username: this.state.username
      })
    }).then(data => {
      return data.json()
    }).then(data => {
      if (data.LovesPizza) {
        localStorage.setItem('love_for_pizza_count', data.Loves_pizza_count)
        this.setState({
          love_for_pizza_count: data.Loves_pizza_count
        });
      }
    });
  }

  componentDidMount() {
    if (!localStorage.getItem('token')) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div>
        <Navbar location={this.location} history={this.props.history} />
        <div className="FanClub">
          <Avatar alt="pizza" src={pizza} className={this.classes.bigAvatar} />
          <Badge color="primary" badgeContent={this.returnLoveForPizzaCount()}>
            <Button variant="contained" color="secondary" onClick={this.handleChange} size="large">
            I Love it
            </Button>
          </Badge>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(FanClub)
