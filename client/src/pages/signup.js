import React, { Component } from "react";
import API from "../utils/API";
import Button from '@material-ui/core/Button';
import { myTheme } from '../utils/myTheme';

var bcrypt = require("bcryptjs");


class SignUp extends Component {
  state = {
    username: "",
    email: "",
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
      email: this.state.email,
      password: bcrypt.hashSync(this.state.password, bcrypt.genSaltSync(10), null)
    };

    var loginData = {
      username: this.state.username,
      password: this.state.password
    }

    API.saveUser(userData)
      .then(res => {
        console.log("user saved");
        // window.location.replace("/signin");
        // window.top.location.replace("/main/" + this.props.location.search.replace("?", ""));
        alert("Successful sign up!");

        API.loginUser(loginData)
          .then(res => {
            console.log("successful login");
            console.log(res.data);
            // window.location.replace("/");
            window.top.location.replace("/main/" + this.props.location.search.replace("?", ""));
            // console.log(res.data.username);

          })
          .catch(err => {
            console.log(err)
          });
      })
      .catch(err => {
        console.log(err)
      });
  };

  handleLogOut = () => {
    API.checkLogin().then(res => {
      console.log(res.data.loggedIn);

      if (res.data.loggedIn) {
        API.logoutUser().then(res => {
          alert("You have successfully logged out.");
          window.location.replace("/");
        });
      } else {
        alert("You're not logged in.");
      };
    });
  };

  render() {
    return (
      <>
        <p>{this.state.username}</p>
        <p>{this.state.email}</p>
        <p>{this.state.password}</p>

        <form>
          <input
            type="text"
            // id="username-input"
            name="username"
            onChange={this.handleInputChange}
            autoComplete="false"
            placeholder="Your Name"
            className="userName"
            style={myTheme.palette.input}
          />

          <input
            type="text"
            // id="email-input"
            name="email"
            onChange={this.handleInputChange}
            autoComplete="false"
            placeholder="Email"
            className="email"
            style={myTheme.palette.input}
          />

          <input
            type="password"
            // id="password-input"
            name="password"
            onChange={this.handleInputChange}
            autoComplete="false"
            placeholder="Password"
            className="password"
            style={myTheme.palette.input}
          />

          <Button style={myTheme.palette.buttonThree} type="submit" id="submit" onClick={this.handleFormSubmit}>SUBMIT</Button>

          <Button variant="outlined" style={myTheme.palette.buttonTwo} onClick={this.handleLogOut} id="logout">Log Out</Button>

        </form>
      </>
    )
  }
}

export default SignUp;