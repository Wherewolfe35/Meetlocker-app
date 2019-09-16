import React from 'react';
import { TextField } from "@material-ui/core";
import { combineReducers } from "redux";

const animalMeasurements = (state = [], action) => {
  switch (action.type) {
    case 'NEW_MEASUREMENT':
      for (let i = 0; i < action.payload; i++) {
        state.push(<TextField
          id="standard-dense"
          label={i}
          key={i}
          placeholder="Base to Left Points"
          margin="dense"
          onChange={(event) => this.handleScoreChange(event, `leftPoint ${i}`)}
        />)
      }
      return state
    default:
      return state;
  }
}

export default combineReducers({
  animalMeasurements,
});