import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";

import swal from "@sweetalert/with-react";

class Admin extends Component {
  state = {}

  componentDidMount() {
    this.props.dispatch({ type: 'GET_UNAPPROVED' });
    this.props.dispatch({ type: 'GET_ANIMALS' });
    this.props.dispatch({ type: 'GET_USERS' });
  }

  //sends update or delete dispatch for unapproved users
  handleUserApprove = (approve, id, name) => {
    if (!approve) {
      swal({
        text: `Are you sure you want to remove ${name}?`,
        icon: 'warning', buttons: true, dangermode: true
      })
        .then((toDelete) => {
          if (toDelete) {
            this.props.dispatch({ type: 'DISAPPROVE_USER', payload: id })
            swal('User Removed', { icon: 'success' });
          } else {
            swal('User remains undecided.');
          }
        });
    } else {
      swal({
        text: `You are about to accept ${name}.`,
        icon: 'warning', buttons: true, dangermode: true
      })
        .then((toAccept) => {
          if (toAccept) {
            this.props.dispatch({ type: 'APPROVE_USER', payload: id });
            swal(`${name} has been approved!`, { icon: 'success' });
          } else {
            swal('User remains undecided.');
          }
        });
    }
  }

  //sends update or delete dispatch for unapproved trophies
  handleTrophyApprove = (approve, id, animal) => {
    if (!approve) {
      swal({
        text: `Are you sure you want to remove this trophy ${animal}?`,
        icon: 'warning', buttons: true, dangermode: true
      })
        .then((toDelete) => {
          if (toDelete) {
            this.props.dispatch({ type: 'DISAPPROVE_TROPHY', payload: id})
            swal('Trophy Removed', { icon: 'success' });
          } else {
            swal('Trophy remains undecided.');
          }
        });
    } else {
      swal({
        text: `You are about to accept this trophy ${animal}.`,
        icon: 'warning', buttons: true, dangermode: true
      })
        .then((toAccept) => {
          if (toAccept) {
            this.props.dispatch({ type: 'APPROVE_TROPHY', payload: id });
            swal('Trophy added to the Hall of Fame!', { icon: 'success' });
          } else {
            swal('Trophy remains undecided.');
          }
        })
    }
  }

  // fills in animal name for unapproved animals.
  getAnimalName = (id) => {
    for (let animal of this.props.animals) {
      if (animal.id === id) {
        return animal.name
      }
    }
    return id
  }

  // fills in user name for unapproved trophies
  getUserName = (id) => {
    for (let user of this.props.userList) {
      if (user.id === id) {
        return user.name;
      }
    }
  }

  render() {
    return (
      <div>
        <h2><u>New Users</u></h2>
        <Grid container spacing={6} justify={'space-around'}>
          {this.props.users[0] ? this.props.users.map(user =>
            <Grid item md={6} key={user.id}>

              Name: {user.name} <br />
              E-mail: {user.username} <br /> <br />
              <Button variant='contained' color='secondary'
                onClick={() => this.handleUserApprove(false, user.id, user.name)}>
                Decline
              </Button> <span> &nbsp; &nbsp; &nbsp; </span>
              <Button variant='contained' color='primary'
                onClick={() => this.handleUserApprove(true, user.id, user.name)}>
                Accept
                </Button>

            </Grid>)
            :
            <Grid item md={12}>
              No New Users
            </Grid>}
        </Grid>
        <h2><u>New Trophies</u></h2>
        <Grid container spacing={6} justify={'space-around'}>
          {this.props.trophies[0] ? this.props.trophies.map((trophy) => {
            let animalName = this.getAnimalName(trophy.animals_id);
            let userName = this.getUserName(trophy.user_id)
            return (
              <Grid item md={6} key={trophy.id}>
                Hunter: {userName} <br />
                Animal: {animalName} <br />
                Weight: {trophy.weight} lbs <br />
                Points: {trophy.points} <br />
                Wolfe Score: {trophy.buck_score} <br /> <br />
                <Button variant='contained' color='secondary'
                  onClick={() => this.handleTrophyApprove(false, trophy.id, animalName)}>
                  Decline
                </Button> <span> &nbsp; &nbsp; &nbsp; </span>
                <Button variant='contained' color='primary'
                  onClick={() => this.handleTrophyApprove(true, trophy.id, animalName)}>
                  Accept
                </Button>
              </Grid>)
          })
            :
            <Grid item md={12}>
              No New Trophies
        </Grid>}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.admin.userList,
  trophies: state.admin.trophyList,
  animals: state.leaderboard.animalList,
  userList: state.admin.fullUserList,
})

export default connect(mapStateToProps)(Admin);