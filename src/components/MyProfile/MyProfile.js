import React, { Component } from 'react';
import { connect } from "react-redux";

import { TextField } from "@material-ui/core";

class MyProfile extends Component {
  state = {
    username: '',
    name: ''
  }
  componentDidMount() {
    this.props.dispatch({ type: 'GET_USER_TROPHIES' });
  }

  //set state to text from input field
  textChange = (event, stateKey) => {
    this.setState({ ...this.state, [stateKey]: event.target.value });
  }

  state = {}
  render() {
    return (
      <div>
        <h1>{this.props.state.user.name}</h1>
        <p>MeatLocker Hunter</p>
        <form>
          Username: <TextField value={this.props.state.user.username}
            onChange={() => { this.textChange('username') }}
          />
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps)(MyProfile);