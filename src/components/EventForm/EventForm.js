import React from 'react';
import { connect } from "react-redux";

const EventForm = (props) => {

  return (
    <div>
      <form>
        <input placeholder="title"></input>
        <input type="date"></input>
        <button>Submit Event</button>
      </form>
      <button onClick={()=> props.history.push('/Calendar')}>Back</button>
    </div>
  )
}

export default connect()(EventForm);