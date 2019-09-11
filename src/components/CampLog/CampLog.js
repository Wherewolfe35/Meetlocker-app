import 'date-fns';
import React from 'react';
import { connect } from "react-redux";
import "./CampLog.css";
import { TextField, Grid, Button } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import { AddCommentTwoTone, Edit as EditIcon, DeleteForeverOutlined } from '@material-ui/icons';

const CampLog = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2019-09-11T21:11:54'));
  const [comment, setComment] = React.useState(false);
  const [commentId, setCommentId] = React.useState(0);

  React.useEffect(() => {
    props.dispatch({ type: 'GET_LOG' });
  }, []); //upon page load, get logs from database

  function handleDateChange(date, event) {
    setSelectedDate(date);
    props.dispatch({ type: 'LOG_DATE', payload: event });
  } // sets Date for new log

  function handleNewPost(event) {
    props.dispatch({ type: 'CURRENT_LOG', payload: event.target.value });
  } //keeps track of text within log text field

  function handleSubmit() {
    props.dispatch({ type: 'ADD_LOG', payload: props.log });
  } //sends message to saga to POST new log

  function handleComment(id) {
    setComment(true);
    setCommentId(id);
  } //opens up comment text field

  function commentText(event) {
    props.dispatch({ type: 'CURRENT_COMMENT', payload: { id: commentId, text: event.target.value } })
  } //keeps track of text in comment text field

  function submitComment() {
    props.dispatch({ type: 'ADD_COMMENT', payload: props.comment });
    setComment(false);
  }//sends message to saga to POST new comment and closes text field

  function displayComments(id) {
    props.dispatch({ type: 'GET_COMMENTS', payload: id });
  } //shows comment list for selected log

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
        {props.logList && props.logList.map(log =>
          <div key={log.id}>
            <p>{log.post}
              <span className="logNameDate"> ~{log.name} {log.date}</span>
              {log.user_id === props.userId && <span>
                <EditIcon size="small" /> &nbsp;
                <DeleteForeverOutlined size="small" />
              </span>
              }
            </p>
            {comment && commentId === log.id &&
              <div><TextField
                id="filled-multiline-flexible"
                label="Comment"
                multiline
                fullWidth
                rowsMax="2"
                onChange={commentText}
                margin="dense"
                variant="filled"
                value={props.comment.text}
              />
                <AddCommentTwoTone fontsize="small" onClick={submitComment} />
              </div>
            }
            <Button size="small" variant="outlined" onClick={() => handleComment(log.id)}>Comment</Button>
            <span><Button size="small" onClick={() => displayComments(log.id)}><u>See Comments</u></Button></span>
            {props.commentList && props.commentList.map((comment) => {
              if (comment.logs_id === log.id) {
                return (
                  <div key={comment.id} className="commentList">
                    <p>{comment.comments_post} <span> ~{comment.name} 
                    {comment.users_id === props.userId &&
                        <DeleteForeverOutlined size="small" />
                    }
                    </span>
                    </p>
                  </div>)
              }
            })
            }
          </div>
        )}
      </ul>
    </>
  );
}


const mapStateToProps = (state) => ({
  logList: state.log.logList,
  comment: state.log.currentComment,
  log: state.log.currentLog,
  commentList: state.log.commentList,
  userId: state.user.id
});

export default connect(mapStateToProps)(CampLog);