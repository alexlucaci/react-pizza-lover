import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import CanvasJSReact from '../canvas/canvasjs.react';

const CanvasJSChart = CanvasJSReact.CanvasJSChart;


const styles = theme => ({
  head: {
    backgroundColor: "#3F51B5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
  barChart: {
    marginTop: "30%",
  }
});

class TopVoters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas_options: {},
    };
    this.classes = props;

  }
  componentDidMount() {
    fetch('http://localhost:5000/api/topvoters/10')
    .then(results => {
      return results.json();
    }).then(data => {/*
      let top_voters = data.Top_Voters.map((user) => {
        return(
              <TableRow key={user.username}>
                <CustomTableCell component="th" scope="row">
                  {user.username}
                </CustomTableCell>
                <CustomTableCell align="right">{user.love_for_pizza_count}</CustomTableCell>
              </TableRow>
        )
      })*/
      var arr = []
      data.Top_Voters.map((user) => {
        arr.push({
          label: user.username,
          y: user.love_for_pizza_count
        })
      })
      var options = {
  			animationEnabled: true,
  			theme: "dark2",
  			title:{
  				text: "Top Voters"
  			},
  			axisX: {
  				title: "Users",
  				reversed: true,
  			},
  			axisY: {
  				title: "Votes"
  			},
  			data: [{
  				type: "bar",
  				dataPoints: arr
  			}]
  		}
      this.setState({canvas_options: options})
    })
  }


  render() {
    return(
        <div className={this.classes.barChart}>
          <CanvasJSChart options={this.state.canvas_options}/>
        </div>
    )
  }
}
export default withStyles(styles)(TopVoters)
