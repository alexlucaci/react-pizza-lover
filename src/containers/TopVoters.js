import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: "#3F51B5",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 15,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '25%',
    marginTop: theme.spacing.unit*10,
    overflowX: 'auto',
    marginLeft: "35%"
  },
  table: {
    minWidth: 15,

  }
});


class TopVoters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      top_voters: [],
    };
    this.classes = props;

  }
  componentDidMount() {
    fetch('http://localhost:5000/api/topvoters/10')
    .then(results => {
      return results.json();
    }).then(data => {
      let top_voters = data.Top_Voters.map((user) => {
        return(
              <TableRow key={user.username}>
                <CustomTableCell component="th" scope="row">
                  {user.username}
                </CustomTableCell>
                <CustomTableCell align="right">{user.love_for_pizza_count}</CustomTableCell>
              </TableRow>
        )
      })
      this.setState({top_voters: top_voters});
    })
  }
  render() {
    return(
        <div>
          <Paper className={this.props.classes.root}>
            <Table className={this.props.classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Username</CustomTableCell>
                  <CustomTableCell align="right">Votes</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.top_voters}
              </TableBody>
            </Table>
          </Paper>
        </div>
    )
  }
}
export default withStyles(styles)(TopVoters)
