import React, { Component } from "react";
import Navbar from "./Navbar"
import TopVotersChart from "./TopVotersChart"


export default class Home extends Component {
  constructor(props) {
    super(props);
    this.location = this.props.location.pathname
  }
  render() {
    return(
        <div>
          <Navbar location={this.location} history={this.props.history}/>
          <TopVotersChart />
        </div>
    )
  }
}
