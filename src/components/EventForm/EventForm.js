import 'date-fns';
import React from 'react';
import { connect } from "react-redux";
import Grid from '@material-ui/core/Grid';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

const EventForm = (props) => {
  const [selectedStartDate, setSelectedStartDate] = React.useState(new Date('2019-09-10T21:11:54'));
  const [selectedEndDate, setSelectedEndDate] = React.useState(new Date('2019-09-11T21:11:54'));

  function handleDateChange(date, event) {
    setSelectedStartDate(date);
    props.dispatch({type: 'START_EVENT', payload: event});
  }

  function handleEndDateChange(date, event) {
    setSelectedEndDate(date);
    props.dispatch({type: 'END_EVENT', payload: event});
  }

  function handleTitleChange(event){
    props.dispatch({type: 'EVENT_TITLE', payload: event.target.value})
  }

  function handleSubmit(event){
    event.preventDefault();
    props.dispatch({type: 'ADD_EVENT', payload: props.state.events.currentEvent})
    .then(() => {
      alert('Thank you for your submission!');
    });
  }
  return (
    <div>
      <form onSubmit={()=>handleSubmit()}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <input placeholder="title" value={props.state.events.currentEvent.title} onChange={handleTitleChange}></input>

            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Start Date"
              format="MM/dd/yyyy"
              value={selectedStartDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="End Date"
              format="MM/dd/yyyy"
              value={selectedEndDate}
              onChange={handleEndDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <button type="submit">Submit Event</button>
          </Grid>
        </MuiPickersUtilsProvider>
      </form>
      <button onClick={() => props.history.push('/Calendar')}>Back</button>
      {JSON.stringify(props)}
    </div>
  )
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps)(EventForm);