import 'date-fns';
import React from 'react';
import { connect } from "react-redux";
import "./CampLog.css";
import { TextField, Grid, Button } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import AddCommentTwoToneIcon from '@material-ui/icons/AddCommentTwoTone';

const CampLog = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2019-09-11T21:11:54'));
  const [comment, setComment] = React.useState(false);
  const [commentId, setCommentId] = React.useState(0);

  React.useEffect(() => {
    props.dispatch({ type: 'GET_LOG' });
  }, []);

  function handleDateChange(date, event) {
    setSelectedDate(date);
    props.dispatch({ type: 'LOG_DATE', payload: event });
  }

  function handleNewPost(event) {
    props.dispatch({ type: 'CURRENT_LOG', payload: event.target.value });
  }

  function handleSubmit() {
    props.dispatch({ type: 'ADD_LOG', payload: props.state.log.currentLog });
  }

  function handleComment(id) {
    setComment(true);
    setCommentId(id);
  }

  function commentText(event) {
    props.dispatch({ type: 'CURRENT_COMMENT', payload: { id: commentId, text: event.target.value } })
  }

  function submitComment() {
    props.dispatch({ type: 'ADD_COMMENT', payload: props.state.log.currentComment});
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            <TextField
              id="filled-multiline-static"
              label="Add Log"
              multiline
              fullWidth
              rows="4"
              margin="normal"
              variant="filled"
              onChange={handleNewPost}
            />
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Start Date"
              format="MM/dd/yyyy"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            <Button type="submit" variant="contained" color="secondary">Submit Log</Button>
          </Grid>
        </MuiPickersUtilsProvider>
      </form>
      <ul className="logList">
        {props.state.log.logList && props.state.log.logList.map(log =>
          <div key={log.id}>
            <p>{log.post}<span className="logNameDate"> ~{log.name} {log.date}</span></p>
            {comment && commentId === log.id && <div><TextField
              id="filled-multiline-flexible"
              label="Comment"
              multiline
              fullWidth
              rowsMax="2"
              onChange={commentText}
              margin="dense"
              variant="filled"
              value={props.state.log.currentComment.text}
            />
              <AddCommentTwoToneIcon fontsize="small" onClick={submitComment} />
            </div>}
            <Button size="small" variant="outlined" onClick={() => handleComment(log.id)}>Comment</Button>
          </div>
        )}
      </ul>
    </>
  );
}


const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(CampLog);