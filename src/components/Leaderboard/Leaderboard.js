import React, { Component } from 'react';
import { connect } from "react-redux";
import LeaderboardUserRow from "../LeaderboardUserRow/LeaderboardUserRow";
import "./Leaderboard.css";

import { Button } from "@material-ui/core";

class Leaderboard extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'GET_LEADERBOARD_USERS' });
    this.props.dispatch({ type: 'GET_ANIMALS' });
  }

  userKeys = (keyArray) => {
    if (keyArray) {
      return Object.keys(keyArray);
    }
  }

  render() {
    let keys = this.userKeys(this.props.users[0]);
    return (
      <div>
        <h2><u>Totals:</u></h2>
        <div className="leaderboard">
          <table>
            <thead>
              <tr>
                {keys && keys.map((key, i) => {
                  if (key !== 'Bagged') {
                    if (i === 0) {
                      return <th key={key} className="headColumn">{key}</th>
                    } else {
                      return (<th key={key}>{key}</th>)
                    }
                  } else {
                    return false;
                  }
                })
                }
                {this.props.animals.map(animal => <th key={animal.id}>{animal.name}</th>)}
              </tr>
            </thead>
            <tbody>
              {this.props.users.map(user => <LeaderboardUserRow user={user} animals={this.props.animals} />)}
            </tbody>
          </table>
        </div>
        <div className="addAnimalBtn">
          <Button variant="contained" color="secondary" onClick={()=>this.props.history.push('/AddAnimal')}> Add Animal </Button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  animals: state.leaderboard.animalList,
  users: state.leaderboard.userList,
})

export default connect(mapStateToProps)(Leaderboard);