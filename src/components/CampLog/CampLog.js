import React, { Component } from 'react';
import { connect } from "react-redux";
import "./CampLog.css";
import { TextField, Grid, Button } from "@material-ui/core";

class CampLog extends Component {
  state = {}

  componentDidMount(){
    this.props.dispatch({type: 'GET_LOG'});
  }

  handleNewPost = (event) => {
    this.props.dispatch({type: 'CURRENT_LOG', payload: event.target.value});
  }
  render() {
    return (
      <>
        <Grid container justify="space-around">
          <TextField
            id="filled-multiline-static"
            label="Add Log"
            multiline
            fullWidth
            rows="4"
            margin="normal"
            variant="filled"
            onChange={this.handleNewPost}
          />
          <Button type="submit" variant="contained" color="secondary">Submit Log</Button>
        </Grid>
        <ul>
          {this.props.state.log.logList && this.props.state.log.logList.map(log => 
          <div key={log.id}>
            <p>{log.post}<span className="logNameDate"> ~{log.name} {log.date}</span></p>
          </div>
          )}
        </ul>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  state,
});

export default connect(mapStateToProps)(CampLog);