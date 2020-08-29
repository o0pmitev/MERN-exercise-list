import React, { Component } from 'react'
import axios from 'axios'
import Exercise from './exercise.component'


class ExercisesList extends Component {
  constructor(props) {
    super(props)
    this.state = {exercises: []}
  }


  componentDidMount() {
    axios.get('http://localhost:4000/exercises')
      .then( response => {
        this.setState({ exercises: response.data })
      })
      .catch( err => console.log(err))
  }

  deleteExercise = (id) => {
    axios.delete(`http://localhost:4000/exercises/${id}`)
      .then(res => console.log(res.data));

    this.setState({
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }


  exerciseList = () => {
    return this.state.exercises.map(currentExercise => (
      <Exercise 
        exercise={currentExercise} 
        deleteExercise={this.deleteExercise}
        key={currentExercise._id}
      />
    ))
  }
  render() {
    return(
      <div>
        <h3> Tutorials </h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() }
          </tbody>
        </table>
      </div>
    )
  }
}

export default ExercisesList