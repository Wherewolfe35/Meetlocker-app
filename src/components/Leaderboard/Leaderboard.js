import React, { Component } from 'react';
import { connect } from "react-redux";
import LeaderboardUserRow from "../LeaderboardUserRow/LeaderboardUserRow";

class Leaderboard extends Component {

  componentDidMount() {
    this.props.dispatch({ type: 'GET_LEADERBOARD_USERS' });
    this.props.dispatch({ type: 'GET_ANIMALS' });
  }

  userKeys = (blah) => {
    if (blah) {
      return Object.keys(blah);
    }
  }

  render() {
    let keys = this.userKeys(this.props.users[0]);
    return (
      <div>
        <table className="leaderboard">
          <thead>
            <tr>
              {keys && keys.map((key) => {
                if (key !== 'bagged') {
                  return (<th key={key}>{key}</th>)
                }
              })
              }
              {this.props.animals.map(animal => <th key={animal.id}>{animal.name}</th>)}
            </tr>
          </thead>
          <tbody>
            {this.props.users.map(user => <LeaderboardUserRow user={user} animals={this.props.animals}/>)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  animals: state.leaderboard.animalList,
  users: state.leaderboard.userList,
})

export default connect(mapStateToProps)(Leaderboard);