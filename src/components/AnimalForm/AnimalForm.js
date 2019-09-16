import React, { Component } from 'react';
import { connect } from "react-redux";

import { FormControl, InputLabel, Select, TextField, Button } from '@material-ui/core';

class AnimalForm extends Component {
  state = {
    newAnimal: {
      id: '',
      weight: '',
      points: '',
      score: ''
    },
    measurements: {
      leftBaseCirc: 0,
      rightBaseCirc: 0,
      insideSpread: 0,
      leftPoints: 0,
      rightPoints: 0,
    },
  }

  componentDidMount() {
    this.props.dispatch({ type: 'GET_ANIMALS' });
  }

  pointLoop = (side) => {
    let pointArray = [];
    if (side === 'left') {
      for (let i = 1; i <= this.state.measurements.leftPoints; i++) {
        pointArray.push(<TextField
          className="pointMeasurements"
          label={i}
          key={i}
          placeholder="Base to Left Points"
          margin="dense"
          onChange={(event) => this.handleScoreChange(event, `leftPoint${i}`)}
        />)
      }
    } else if (side === 'right') {
      for (let i = 1; i <= this.state.measurements.rightPoints; i++) {
        pointArray.push(<TextField
          className="pointMeasurements"
          label={i}
          key={i}
          placeholder="Base to Right Points"
          margin="dense"
          onChange={(event) => this.handleScoreChange(event, `rightPoint${i}`)}
        />)
      }
    }
    return pointArray;
  }

  handleScoreChange = (event, propertyName) => {
    this.setState({ ...this.state, measurements: { ...this.state.measurements, [propertyName]: event.target.value } })
  }

  // React.useEffect(function pointInputs() {
  //   for (let i = 0; i < scoreCalculator.leftPoints; i++) {
  //     left = [...left, i]
  //   }
  //   return left;
  // }, [scoreCalculator.leftPoints]);

  handleNameChange = (event, propertyName) => {
    this.setState({ ...this.state, newAnimal: { ...this.state.newAnimal, [propertyName]: event.target.value } })
  }

  calcScore = () => {
    let meas = this.state.measurements;
    function rMeas() {
      let rightMeas = 0
      for (let i = 1; i <= meas.rightPoints; i++) {
        rightMeas += (+(meas.rightBaseCirc) * meas[`rightPoint${i}`])
      }
      return rightMeas
    }
    function lMeas() {
      let leftMeas = 0
      for (let i = 1; i <= meas.rightPoints; i++) {
        leftMeas += (+(meas.leftBaseCirc) * meas[`leftPoint${i}`])
      }
      return leftMeas
    }
    let rightMeas = rMeas();
    let leftMeas = lMeas();
    console.log(rightMeas, leftMeas);
    let wolfeScore = +(this.state.newAnimal.points) + +(meas.insideSpread) + +(rightMeas.toFixed(4)) + +(leftMeas.toFixed(4));
    this.setState({ ...this.state, newAnimal: { ...this.state.newAnimal, score: wolfeScore } })
  }

  render() {
    let rightMeasurements = this.pointLoop('right');
    let leftMeasurements = this.pointLoop('left');


    return (<div>
      {JSON.stringify(this.state)}
      <FormControl required>
        <InputLabel htmlFor="age-native-simple">Animal</InputLabel>
        <Select
          native
          onChange={(event) => this.handleNameChange(event, 'id')}
          inputProps={{
            name: 'Animal',
            id: 'age-native-simple',
          }}
        >
          <option value="" />
          {this.props.state.leaderboard.animalList.map(animal => <option value={animal.id}>{animal.name}</option>)}
        </Select>
      </FormControl>
      <TextField variant="filled" margin="dense" label="Weight" type="number"
        onChange={(event) => this.handleNameChange(event, 'weight')} />
      {this.state.newAnimal.id === '1' && <>
        <TextField variant="filled" margin="dense" label="Points" type="number"
          onChange={(event) => this.handleNameChange(event, 'points')} />
        <TextField variant="filled" margin="dense" label="insideSpread" type="number"
          onChange={(event) => this.handleScoreChange(event, 'insideSpread')} />
        <TextField variant="filled" margin="dense" label="Right Base Circumference" type="number"
          onChange={(event) => this.handleScoreChange(event, 'rightBaseCirc')} />
        <TextField variant="filled" margin="dense" label="Left Base Circumference" type="number"
          onChange={(event) => this.handleScoreChange(event, 'leftBaseCirc')} />
        <TextField variant="filled" margin="dense" label="Right Points" type="number"
          onChange={(event) => this.handleScoreChange(event, 'rightPoints')} />
        {this.state.measurements.rightPoints > 0 && rightMeasurements.map(point => <>{point}</>)}
        <TextField variant="filled" margin="dense" label="Left Points" type="number"
          onChange={(event) => this.handleScoreChange(event, 'leftPoints')} />
        {this.state.measurements.leftPoints > 0 && leftMeasurements.map(point => <>{point}</>)}
        {this.state.newAnimal.score && <p>Score: {this.state.newAnimal.score}</p>}
        <Button onClick={this.calcScore} variant="contained" color="secondary">
          Calculate Score
          </Button>
      </>}
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps)(AnimalForm);