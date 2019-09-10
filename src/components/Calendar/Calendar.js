import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from "@material-ui/core";

import "./Calendar.css";

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class Calendar extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'GET_EVENTS'
    })
  }

  deleteEvent = (id) => {
    console.log(id);
    this.props.dispatch({ type: 'REMOVE_EVENT', payload: id });
  }

  render() {
    return (
      <div>
        <header>
          <h1 id="welcome">
            Welcome, {this.props.state.user.name}!
        </h1>
        </header>
        <h2><u>Calendar of Events</u></h2>
        <ul>
          {this.props.state.events.eventList.map(event => <li>{event.title} {event.start_date}-{event.end_date}
            {event.user_id === this.props.state.user.id && <button onClick={() => this.deleteEvent(event.id)}>Delete</button>}
          </li>)}
        </ul>
        <div className='eventBtn'>
        <Button variant='contained' color='secondary'
          onClick={() => this.props.history.push('/EventForm')}>Add Event
        </Button>
        </div>
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
