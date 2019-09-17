import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";

class Admin extends Component {
  state = {}

  componentDidMount() {
    this.props.dispatch({ type: 'GET_UNAPPROVED' });
    this.props.dispatch({ type: 'GET_ANIMALS' });
  }

  render() {
    return (
      <div>
        <h2><u>New Users</u></h2>
        <Grid container spacing={6} justify={'space-around'}>
          {this.props.users.map(user =>
            <Grid item md={6}>

              Name: {user.name} <br />
              E-mail: {user.username} <br />
              <Button variant='contained' color='secondary'>Decline</Button> <span> </span>
              <Button variant='contained' color='primary'>Accept</Button>

            </Grid>)}
        </Grid>
        <h2><u>New Trophies</u></h2>
        <Grid container spacing={6} justify={'space-around'}>
          {this.props.trophies.map(trophy =>
            <Grid item md={6}>
              Name: {trophy.animals_id} <br />
              Weight: {trophy.weight} lbs <br />
              Points: {trophy.points} <br />
              Wolfe Score: {trophy.buck_score} <br />
              <Button>Decline</Button> <span> </span>
              <Button>Accept</Button>
            </Grid>)}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.admin.userList,
  trophies: state.admin.trophyList
})

export default connect(mapStateToProps)(Admin);