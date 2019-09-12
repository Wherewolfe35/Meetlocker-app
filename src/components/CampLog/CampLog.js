import 'date-fns';
import React from 'react';
import { connect } from "react-redux";
import "./CampLog.css";
import { TextField, Grid, Button } from "@material-ui/core";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, } from '@material-ui/pickers';
import { AddCommentTwoTone, Edit as EditIcon, DeleteForeverOutlined, Block as BlockIcon } from '@material-ui/icons';

const CampLog = (props) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date('2019-09-11T21:11:54'));
  const [comment, setComment] = React.useState(false);
  const [commentId, setCommentId] = React.useState(0);
  const [editMode, setEditMode] = React.useState(false);
  const [editId, setEditId] = React.useState(0);

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
    if (editMode) {
      props.dispatch({ type: 'EDIT_LOG', payload: { id: editId, text: props.log.text } });
      setEditMode(false);
    } else {
      if (!props.log.text || !props.log.date) {
        return false;
      }
      props.dispatch({ type: 'ADD_LOG', payload: props.log });
    }
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
  } //sends message to saga to POST new comment and closes text field

  function displayComments(id) {
    props.dispatch({ type: 'GET_COMMENTS', payload: id });
  } //shows comment list for selected log

  function logDelete(id, userId) {
    if (window.confirm('Would you like to delete this from the log book?')) {
      props.dispatch({ type: 'REMOVE_LOG', payload: { id, userId } })
    }
  } // deletes selected log

  function commentDelete(id, userId) {
    if (window.confirm('Would you like to delete this comment?')) {
      props.dispatch({ type: 'REMOVE_COMMENT', payload: { id, userId } })
    }
  } // deletes selected comment

  function onEdit(text, id) {
    props.dispatch({ type: 'CURRENT_LOG', payload: text });
    setEditMode(true);
    setEditId(id);
  }//turns on edit mode

  function offEdit() {
    props.dispatch({ type: 'CLEAR_LOG' });
    setEditMode(false);
  }//turns off edit mode

  return (
    <>
      <form onSubmit={handleSubmit}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container justify="space-around">
            {!editMode ? <> <TextField
              id="filled-multiline-static"
              label="Add Log"
              multiline
              fullWidth
              rows="4"
              margin="normal"
              variant="filled"
              value={props.log.text}
              onChange={handleNewPost}
            />
              <KeyboardDatePicker
                margin="normal"
                id="date-picker-dialog"
                label="Log Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
              <Button type="submit" variant="contained" color="secondary">Submit Log</Button> </>
              :
              <><TextField
                id="filled-multiline-static"
                label="Edit Log"
                multiline
                fullWidth
                rows="4"
                margin="normal"
                variant="filled"
                value={props.log.text}
                onChange={handleNewPost}
              />
                <Button type="submit" variant="contained" color="secondary">Submit Edit</Button>
                <BlockIcon onClick={offEdit} /></>
            }
          </Grid>
        </MuiPickersUtilsProvider>
      </form>
      <ul className="logList">
        {props.logList && props.logList.map(log =>
          <div key={log.id}>
            <p>{log.post}
              <span className="logNameDate">
                ~{log.name} {log.date}
              </span>
              {log.user_id === props.userId &&
                <span>
                  <EditIcon size="small" onClick={() => onEdit(log.post, log.id)} /> &nbsp;
                  <DeleteForeverOutlined size="small" onClick={() => { logDelete(log.id, log.user_id) }} />
                </span>
              }&nbsp;
                {props.admin && log.user_id !== props.userId &&
                <span>
                  <DeleteForeverOutlined size="small" onClick={() => { logDelete(log.id, log.user_id) }} />
                </span>}
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
            <span>
              <Button size="small" onClick={() => displayComments(log.id)}><u>See Comments</u></Button>
            </span>
            {props.commentList && props.commentList.map((comment) => {
              if (comment.logs_id === log.id) {
                return (
                  <div key={comment.id} className="commentList">
                    <p>
                      {comment.comments_post}
                      <span>
                        ~{comment.name}
                        {comment.users_id === props.userId &&
                          <DeleteForeverOutlined size="small" onClick={() => { commentDelete(comment.id, comment.users_id) }} />
                        }
                        {props.admin && comment.users_id !== props.userId &&
                          <span>
                            <DeleteForeverOutlined size="small" onClick={() => { commentDelete(comment.id, comment.users_id) }} />
                          </span>
                        }
                      </span>
                    </p>
                  </div>)
              }
            })}
          </div>
        )}
      </ul>
    </>
  );
}


const mapStateToProps = (state) => ({
  logList: state.log.logList,
  comment: state.comment.currentComment,
  log: state.log.currentLog,
  commentList: state.comment.commentList,
  userId: state.user.id,
  admin: state.user.isAdmin
});

export default connect(mapStateToProps)(CampLog);