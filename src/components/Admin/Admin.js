import React, { Component } from 'react';
import { connect } from "react-redux";
import { Grid, Button } from "@material-ui/core";

class Admin extends Component {
  state = {}

  componentDidMount() {
    this.props.dispatch({ type: 'GET_UNAPPROVED' });
    this.props.dispatch({ type: 'GET_ANIMALS' });
  }

  //sends update or delete dispatch for unapproved users
  handleUserApprove = (approve, id, name) => {
    if (!approve) {
      if (window.confirm(`Are you sure you want to remove ${name}?`)) {
        this.props.dispatch({ type: 'DISAPPROVE_USER', payload: id })
      }
    } else {
      if (window.confirm(`You are about to accept ${name}.`)) {
        this.props.dispatch({ type: 'APPROVE_USER', payload: id })
      }
    }
  }

  //sends update or delete dispatch for unapproved trophies
  handleTrophyApprove = (approve, id, animal) => {
    if (!approve) {
      if (window.confirm(`Are you sure you want to remove this trophy ${animal}?`)) {
        this.props.dispatch({ type: 'DISAPPROVE_TROPHY', payload: id })
      }
    } else {
      if (window.confirm(`You are about to accept this trophy ${animal}.`)) {
        this.props.dispatch({ type: 'APPROVE_TROPHY', payload: id })
      }
    }
  }

  // fills in animal name for unapproved animals.
  getAnimalName = (id) => {
    for(let animal of this.props.animals){
      if(animal.id === id) {
        return animal.name
      }
    }
    return id
  }

  render() {
    return (
      <div>
        <h2><u>New Users</u></h2>
        <Grid container spacing={6} justify={'space-around'}>
          {this.props.users.map(user =>
            <Grid item md={6}>

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

            </Grid>)}
        </Grid>
        <h2><u>New Trophies</u></h2>
        <Grid container spacing={6} justify={'space-around'}>
          {this.props.trophies.map((trophy) =>{
            let animalName = this.getAnimalName(trophy.animals_id)
            return (
            <Grid item md={6}>
              Name: {animalName} <br />
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
          </Grid>)})}
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.admin.userList,
  trophies: state.admin.trophyList,
  animals: state.leaderboard.animalList,
})

export default connect(mapStateToProps)(Admin);