import React, { Component } from 'react';
import { connect } from "react-redux";
// import ImageUpload from "../ImageUpload/ImageUpload";

import { TextField, Button } from "@material-ui/core";
import { Check as CheckIcon, Clear as ClearIcon } from '@material-ui/icons';
import swal from '@sweetalert/with-react';

import "./MyProfile.css";

class MyProfile extends Component {
  state = {
   
  }
  componentDidMount() {
    this.props.dispatch({ type: 'GET_USER_TROPHIES' });
    this.props.dispatch({ type: 'GET_ANIMALS' });
  }

  //set state to text from input field
  textChange = (event, stateKey) => {
    this.setState({ ...this.state, [stateKey]: event.target.value });
  }

  getAnimalName = (id) => {
    for (let animal of this.props.animalList) {
      if (animal.id === id) {
        return animal.name
      }
    }
    return id
  }

  profileSubmit = () => {
    swal(`Are you sure you want to make changes to your profile name/username?`,{buttons: true})
    .then((toAccept) => {
      if(toAccept) {
        if (this.state.username || this.state.name) {
          this.props.dispatch({ type: 'EDIT_USER', payload: this.state });
          swal('Changes accepted', {icon: 'success'})
        } else {
          swal('You have not made any changes to your username or name.');
        }
      } else {
        swal('No changes made.');
      }
    }); 
  }

  render() {
    return (
      <div>
        <header>
          <h1>{this.props.user.name}</h1>
          <p>MeatLocker Hunter</p>
        </header>
        <div className="profileForm" >
          <u>Username:</u> <TextField placeholder={this.props.user.username} fullWidth margin="dense"
            variant="filled" onChange={(event) => { this.textChange(event, 'username') }}
            value={this.state.username} /> <br />
          <u>Name:</u> <TextField placeholder={this.props.user.name} fullWidth margin="dense"
            variant="filled" onChange={(event) => { this.textChange(event, 'name') }}
            value={this.state.name} /> <br /> <br />
          <div className="profileSubmitBtn">
            <Button variant="contained" color="secondary"
              onClick={this.profileSubmit}>Submit Changes</Button>
          </div> <br />
        </div>
        {this.props.trophyList &&
          <div className="profileTable">
            <table>
              <thead>
                <tr>
                  <th>Animal</th>
                  <th>Wolfe Score</th>
                  <th>Points</th>
                  <th>Weight</th>
                  <th>Confirmed?</th>
                </tr>
              </thead>
              <tbody>
                {this.props.trophyList.map(trophy =>
                  <tr key={trophy.id}>
                    <td>{this.getAnimalName(trophy.animals_id)}</td>
                    <td>{trophy.buck_score}</td>
                    <td>{trophy.points}</td>
                    <td>{trophy.weight}</td>
                    <td>{trophy.is_approved ? <CheckIcon /> : <ClearIcon />}</td>
                  </tr>)}
                <tr>
                  <td>Totals</td>
                  <td>{this.props.trophyList[0].totalScore}</td>
                  <td>{this.props.trophyList[0].totalPoints}</td>
                  <td>{this.props.trophyList[0].totalWeight}</td>
                  <td>{this.props.trophyList.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        }
        {/* <ImageUpload /> */}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  trophyList: state.user.trophyData,
  animalList: state.leaderboard.animalList,
  user: state.user,
})

export default connect(mapStateToProps)(MyProfile);