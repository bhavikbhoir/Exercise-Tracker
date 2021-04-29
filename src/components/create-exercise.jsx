import React, { Component } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
   constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = { //The properties of state will correspond to the fields in the MongoDB document.
        username: '',
        description: '',
        duration: 0,
        date: new Date(),
        users: []
    }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }
  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }
  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    });
  }
  onChangeDate(date) { //for date picker library 
    this.setState({
      date: date
    });
  }
  onSubmit(e) {
    e.preventDefault(); //The e.preventDefault() prevents the default HTML form submit behavior from taking place.
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };
  console.log(exercise);

  axios.post('http://localhost:5000/exercises/add', exercise)
  .then(res => console.log(res.data));

  window.location = '/'; // location is updated so the user is taken back to the home page.
  }

  //The componentDidMount() method is part of the React life cycle and is invoked immediately after a component is mounted.
  componentDidMount() {
    //We will get the list of users from the database to add to the users dropdown menu in the form. 
    axios.get('http://localhost:5000/users/')
    .then(response => {
        if (response.data.length > 0) {
        this.setState({ 
            users: response.data.map(user => user.username),
            username: response.data[0].username
        });
        }
    })
    .catch((error) => {
        console.log(error);
    })
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Username: </label>
            <select ref="userInput"
                required
                className="form-control"
                value={this.state.username}
                onChange={this.onChangeUsername}>
                {
                  this.state.users.map(function(user) {
                    return <option 
                      key={user}
                      value={user}>{user}
                      </option>;
                  })
                }
            </select>
          </div>
          <div className="form-group"> 
            <label>Description: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.description}
                onChange={this.onChangeDescription}
                />
          </div>
          <div className="form-group">
            <label>Duration (in minutes): </label>
            <input 
                type="text" 
                className="form-control"
                value={this.state.duration}
                onChange={this.onChangeDuration}
                />
          </div>
          <div className="form-group">
            <label>Date: </label>
            <div>
              <DatePicker
                selected={this.state.date}
                onChange={this.onChangeDate}
              />
            </div>
          </div>

          <div className="form-group">
            <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}