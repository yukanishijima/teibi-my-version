import React, { Component } from 'react';
import API from "../utils/API";
import Button from '@material-ui/core/Button';
import { myTheme } from '../utils/myTheme';

class SignIn extends Component {
  state = {
    username: "",
    password: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    var userData = {
      username: this.state.username,
      password: this.state.password
    };

    API.loginUser(userData)
      .then(res => {
        console.log("successful login");
        console.log(res.data);
        window.top.location.replace("/main/" + this.props.location.search.replace("?", ""));
      })
      .catch(err => {
        console.log(err)
        alert("Please ensure your username and password are valid.");
      });
  };


  render() {
    return (
      <>
        <form>
          <input
            type="text"
            name="username"
            onChange={this.handleInputChange}
            autoComplete="false"
            placeholder="Your Name"
            className="userName"
            style={myTheme.palette.input}
          />
          <input
            type="password"
            name="password"
            onChange={this.handleInputChange}
            autoComplete="false"
            placeholder="Password"
            className="password"
            style={myTheme.palette.input}
          />
          <Button style={myTheme.palette.buttonThree} type="submit" id="submit" onClick={this.handleFormSubmit}>SIGN IN</Button>
        </form>
      </>
    )
  }
}

export default SignIn;