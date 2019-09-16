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
    
  }

  render() {
    let rightMeasurements = this.pointLoop('right');
    let leftMeasurements = this.pointLoop('left');


    return (<div>
      {JSON.stringify(this.state)}
      <FormControl >
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
      
      <TextField variant="filled" margin="dense" label="Weight" type="number"
        onChange={(event) => this.handleNameChange(event, 'weight')} />
      {this.state.newAnimal.id === '1' && <>
        <TextField variant="filled" margin="dense" label="Points" type="number"
          onChange={(event) => this.handleNameChange(event, 'points')} />
        <TextField variant="filled" margin="dense" label="Right Points" type="number"
          onChange={(event) => this.handleScoreChange(event, 'rightPoints')} />
        {this.state.measurements.rightPoints > 0 && rightMeasurements.map(point => <>{point}</>)}
        <TextField variant="filled" margin="dense" label="Left Points" type="number"
          onChange={(event) => this.handleScoreChange(event, 'leftPoints')} />
        {this.state.measurements.leftPoints > 0 && leftMeasurements.map(point => <>{point}</>)}
        <TextField variant="filled" margin="dense" label="Right Base Circumference" type="number"
          onChange={(event) => this.handleScoreChange(event, 'rightBaseCirc')} />
        <TextField variant="filled" margin="dense" label="Left Base Circumference" type="number"
          onChange={(event) => this.handleScoreChange(event, 'leftBaseCirc')} />
        <Button onClick={this.calcScore}>Calculate Score</Button>
      </>}
      </FormControl>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps)(AnimalForm);