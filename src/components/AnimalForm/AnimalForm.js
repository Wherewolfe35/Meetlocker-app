import React, { Component } from 'react';
import { connect } from "react-redux";

import { FormControl, InputLabel, Select, TextField, Button, InputAdornment } from '@material-ui/core';

class AnimalForm extends Component {
  state = {
    newAnimal: {
      id: '',
      weight: '',
      points: '',
      score: 0
    },
    measurements: {
      leftBaseCirc: '',
      rightBaseCirc: '',
      insideSpread: '',
      leftPoints: '',
      rightPoints: '',
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

  // React.useEffect(function pointInputs() {
  //   for (let i = 0; i < scoreCalculator.leftPoints; i++) {
  //     left = [...left, i]
  //   }
  //   return left;
  // }, [scoreCalculator.leftPoints]);

  handleScoreChange = (event, propertyName) => {
    this.setState({ ...this.state, measurements: { ...this.state.measurements, [propertyName]: event.target.value } });
  }

  handleNameChange = (event, propertyName, name) => {
    let animalList = this.props.state.leaderboard.animalList;
    function findName(id) {
      for (let animal of animalList) {
        if (+(id) === animal.id) {
          return animal.name
        }
      }
    }
    let animalName = findName(event.target.value);
    if(name){
      this.setState({ ...this.state, newAnimal: { ...this.state.newAnimal, [propertyName]: event.target.value }, animalName });
    } else {
      this.setState({ ...this.state, newAnimal: { ...this.state.newAnimal, [propertyName]: event.target.value }});
    }
  }

  animalSubmit = () => {
    if (!this.state.newAnimal.score && this.state.newAnimal.id === '1') {
      alert('Please submit a score for your Buck!');
    } else if (!this.state.newAnimal.id) {
      alert('Please select an animal.');
    } else if(+(this.state.newAnimal.weight) > 600){
      alert(`I think you have mistaken your deer for a horse. \n Weight: ${this.state.newAnimal.weight} lbs`);
    } else if (+(this.state.newAnimal.points) > 39) {
      alert(`I think you have mistaken your deer for a horse. \n Weight: ${this.state.newAnimal.weight} lbs`);
    } else {
      if (window.confirm(`Are you sure all of this data is correct? \n Name: ${this.state.animalName} 
      Weight: ${this.state.newAnimal.weight} lbs 
      Points: ${this.state.newAnimal.points} 
      Score: ${this.state.newAnimal.score}`)) {
        alert('Thank you for your submission, an Admin will review your hunt before officially being accepted to the leaderboard');
        this.props.dispatch({ type: 'ADD_ANIMAL', payload: this.state.newAnimal });
        this.setState({
          newAnimal: { id: this.state.newAnimal.id, weight: '', points: '', score: ''},
          measurements: { leftBaseCirc: 0, rightBaseCirc: 0, insideSpread: 0, leftPoints: 0, rightPoints: 0,},
        })
      }
    }
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
          onChange={(event) => this.handleNameChange(event, 'id', true)}
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
        InputProps={{
          endAdornment: <InputAdornment position="end">Lbs</InputAdornment>,
        }} value={this.state.newAnimal.weight}
        onChange={(event) => this.handleNameChange(event, 'weight')} />
      {this.state.newAnimal.id === '1' && <>
        <TextField variant="filled" margin="dense" label="Points" type="number"
          onChange={(event) => this.handleNameChange(event, 'points')} 
          value={this.state.newAnimal.points} />
        <TextField variant="filled" margin="dense" label="insideSpread" type="number"
          onChange={(event) => this.handleScoreChange(event, 'insideSpread')} 
          value={this.state.measurements.insideSpread} />
        <TextField variant="filled" margin="dense" label="Right Base Circumference" type="number"
          onChange={(event) => this.handleScoreChange(event, 'rightBaseCirc')} 
          value={this.state.measurements.rightBaseCirc} />
        <TextField variant="filled" margin="dense" label="Left Base Circumference" type="number"
          onChange={(event) => this.handleScoreChange(event, 'leftBaseCirc')} 
          value={this.state.measurements.leftBaseCirc} />
        <TextField variant="filled" margin="dense" label="Right Points" type="number"
          onChange={(event) => this.handleScoreChange(event, 'rightPoints')} 
          value={this.state.measurements.rightPoints} />
        {this.state.measurements.rightPoints > 0 && rightMeasurements.map(point => <>{point}</>)}
        <TextField variant="filled" margin="dense" label="Left Points" type="number"
          onChange={(event) => this.handleScoreChange(event, 'leftPoints')} 
          value={this.state.measurements.leftPoints} />
        {this.state.measurements.leftPoints > 0 && leftMeasurements.map(point => <>{point}</>)}
        {this.state.newAnimal.score > 0 && <p>Score: {this.state.newAnimal.score}</p>}
        <Button onClick={this.calcScore} variant="contained" color="secondary">
          Calculate Score
          </Button> <br /> <br />
      </>}
      <Button variant="contained" color="secondary" onClick={this.animalSubmit}>Submit Animal</Button>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps)(AnimalForm);