import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from "@material-ui/core";

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class Calendar extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_EVENTS'
    })
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, {this.props.state.user.name}!
    </h1>
        <h2><u>Calendar of Events</u></h2>
        <ul>
          {this.props.state.events.eventList.map(event => <li>{event.title} {event.date}</li>)}
        </ul>
        <Button variant='contained' color="inherit" onClick={()=>this.props.history.push('/EventForm')}>Add Event</Button>
      </div>
    );
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  state
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(Calendar);
